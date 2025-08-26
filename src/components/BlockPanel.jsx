import React from "react";
import blocks from "../data/blocks.json";

export default function BlockPanel() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside style={{ width: 200, padding: 10, borderLeft: "1px solid #ddd" }}>
      <h3>Blocks</h3>
      {blocks.map((block) => (
        <div
          key={block.id}
          onDragStart={(event) => onDragStart(event, block.type)}
          draggable
          style={{
            border: "1px solid #333",
            padding: "10px",
            marginBottom: "8px",
            cursor: "grab",
            background: "#fafafa"
          }}
        >
          {block.label}
        </div>
      ))}
    </aside>
  );
}
