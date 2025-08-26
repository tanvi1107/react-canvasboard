import { Undo, Redo, Trash2 } from "lucide-react";

export default function Toolbar({ undo, redo, deleteSelected }) {
  return (
    <div className="absolute top-4 left-4 flex gap-3 bg-white/90 p-2 rounded-xl shadow-lg backdrop-blur-sm">
      <button
        onClick={undo}
        title="Undo (Ctrl+Z)"
        className="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Undo size={18} />
      </button>
      <button
        onClick={redo}
        title="Redo (Ctrl+Y)"
        className="p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <Redo size={18} />
      </button>
      <button
        onClick={deleteSelected}
        title="Delete (Del)"
        className="p-2 rounded-lg hover:bg-red-100 text-red-500 transition"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
