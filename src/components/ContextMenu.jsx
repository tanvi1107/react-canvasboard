import React from "react";

export default function ContextMenu({ x, y, onClose }) {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        background: "white",
        border: "1px solid #ccc",
        padding: "8px",
        zIndex: 1000
      }}
      onClick={onClose}
    >
      Hello World
    </div>
  );
}
