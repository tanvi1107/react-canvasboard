import React from "react";
import CanvasArea from "./components/CanvasArea";
import BlockPanel from "./components/BlockPanel";


export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <CanvasArea />
      <BlockPanel />
    </div>
  );
}