import { useState } from "react";

export default function useHistory(nodes, edges, setNodes, setEdges) {
  const [history, setHistory] = useState([{ nodes, edges }]);
  const [redoStack, setRedoStack] = useState([]);

  const pushHistory = (newNodes, newEdges) => {
    setHistory((h) => [...h, { nodes: newNodes, edges: newEdges }]);
    setRedoStack([]);
  };

  const undo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      const last = newHistory.pop();
      setRedoStack((r) => [...r, last]);
      const prev = newHistory[newHistory.length - 1];
      setNodes(prev.nodes);
      setEdges(prev.edges);
      setHistory(newHistory);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const newRedo = [...redoStack];
      const next = newRedo.pop();
      setNodes(next.nodes);
      setEdges(next.edges);
      setHistory((h) => [...h, next]);
      setRedoStack(newRedo);
    }
  };

  return { pushHistory, undo, redo };
}
