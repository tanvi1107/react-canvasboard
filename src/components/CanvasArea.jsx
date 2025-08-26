import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import ContextMenu from "./ContextMenu";

let id = 0;
const getId = () => `node_${id++}`;

export default function CanvasArea() {
  // rename hook handlers to avoid confusion
  const [nodes, setNodes, handleNodesChange] = useNodesState([]);
  const [edges, setEdges, handleEdgesChange] = useEdgesState([]);
  const [contextMenu, setContextMenu] = useState(null);

  const wrapperRef = useRef(null);

  // history stored in refs to avoid stale-closure issues
  const historyRef = useRef([]);
  const redoRef = useRef([]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // focus wrapper so keyboard works
  useEffect(() => {
    if (wrapperRef.current) wrapperRef.current.focus();
  }, []);

  // helper clones
  const cloneNodes = (nds) =>
    nds.map((n) => ({ ...n, data: n.data ? { ...n.data } : {} }));
  const cloneEdges = (eds) => eds.map((e) => ({ ...e }));

  // initialize history with initial state once
  useEffect(() => {
    historyRef.current = [{ nodes: cloneNodes(nodes), edges: cloneEdges(edges) }];
    setCanUndo(false);
    setCanRedo(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once on mount

  // push a snapshot to history (avoid consecutive duplicates)
  const pushHistory = (curNodes = nodes, curEdges = edges) => {
    const snapshot = { nodes: cloneNodes(curNodes), edges: cloneEdges(curEdges) };
    const last = historyRef.current[historyRef.current.length - 1];
    // avoid pushing identical snapshots
    if (last && JSON.stringify(last) === JSON.stringify(snapshot)) return;
    historyRef.current.push(snapshot);
    redoRef.current = [];
    setCanUndo(historyRef.current.length > 1);
    setCanRedo(false);
  };

  const undo = () => {
    if (historyRef.current.length <= 1) return;
    // pop the current snapshot
    historyRef.current.pop();
    // push current state to redo stack
    redoRef.current.push({ nodes: cloneNodes(nodes), edges: cloneEdges(edges) });
    // restore previous
    const prev = historyRef.current[historyRef.current.length - 1];
    setNodes(prev.nodes);
    setEdges(prev.edges);
    setCanUndo(historyRef.current.length > 1);
    setCanRedo(redoRef.current.length > 0);
  };

  const redo = () => {
    if (redoRef.current.length === 0) return;
    const next = redoRef.current.pop();
    // push current to history (so it becomes undoable)
    pushHistory(nodes, edges);
    setNodes(next.nodes);
    setEdges(next.edges);
    setCanUndo(historyRef.current.length > 1);
    setCanRedo(redoRef.current.length > 0);
  };

  // connect validation
  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      if (sourceNode?.type === "blockA" && targetNode?.type === "blockB") {
        pushHistory(nodes, edges);
        setEdges((eds) => addEdge({ ...params, animated: true }, eds));
      } else {
        alert("Invalid connection! Only Block A → Block B allowed.");
      }
    },
    // include dependencies used inside
    [nodes, edges, setEdges]
  );

  // drop new node
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = { x: event.clientX - 250, y: event.clientY - 50 };
      const newNode = {
        id: getId(),
        type,
        position,
        connectable: true,
        data: { label: type === "blockA" ? "Block A" : "Block B" },
      };

      pushHistory(nodes, edges);
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, edges, setNodes]
  );

  // context menu for node
  const onContextMenu = (event, node) => {
    event.preventDefault();
    setContextMenu({ x: event.clientX, y: event.clientY, node });
  };

  // Key handling (Delete, Ctrl+Z, Ctrl+Y)
  const onKeyDown = (event) => {
    // Delete selected
    if (event.key === "Delete" || event.key === "Backspace") {
      pushHistory(nodes, edges);
      setNodes((nds) => nds.filter((n) => !n.selected));
      setEdges((eds) => eds.filter((e) => !e.selected));
      return;
    }

    // Undo (Ctrl/Cmd + Z)
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z") {
      event.preventDefault();
      undo();
      return;
    }

    // Redo (Ctrl/Cmd + Y) - common on Windows; users on mac may expect Cmd+Shift+Z
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y") {
      event.preventDefault();
      redo();
      return;
    }
  };

  return (
    <div
      ref={wrapperRef}
      style={{ flex: 1, background: "#f0f0f0", outline: "none" }}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          // push history for meaningful node changes only (avoid spamming history on selection)
          onNodesChange={(changes) => {
            const meaningful = changes.some((c) =>
              ["position", "add", "remove"].includes(c.type)
            );
            if (meaningful) pushHistory(nodes, edges);
            handleNodesChange(changes);
          }}
          onEdgesChange={(changes) => {
            const meaningful = changes.some((c) =>
              ["add", "remove"].includes(c.type)
            );
            if (meaningful) pushHistory(nodes, edges);
            handleEdgesChange(changes);
          }}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onNodeContextMenu={onContextMenu}
          fitView
        >
          <Controls />
        </ReactFlow>

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}

        {/* Undo / Redo Buttons */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            display: "flex",
            gap: "10px",
            background: "rgba(255,255,255,0.95)",
            padding: "6px 10px",
            borderRadius: "6px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            zIndex: 10,
          }}
        >
          <button onClick={undo} disabled={!canUndo}>
            ⬅ Undo
          </button>
          <button onClick={redo} disabled={!canRedo}>
            Redo ➡
          </button>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
