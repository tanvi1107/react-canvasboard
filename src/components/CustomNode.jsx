import React from "react";
import { Handle, Position } from "reactflow";

export default function CustomNode({ data }) {
  return (
    <div className="custom-node">
      <div>{data.label || "Custom Node"}</div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
