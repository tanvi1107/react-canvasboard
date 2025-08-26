<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# react-canvasboard
"Interactive React Flow canvas with drag-to-connect, undo/redo, and node/edge management."

# 📝 React Flow Canvas

An interactive **React Flow-based canvas** that allows users to create, connect, delete, and manage nodes with **undo/redo functionality**.  
Built with **React + Vite + React Flow**, this project demonstrates how to make a modern, visual graph editor with a smooth user experience.

---

## 🚀 Features
- ➕ Add new nodes dynamically  
- 🔗 **Drag-to-connect** nodes with a visual edge preview  
- ❌ Delete nodes or connections (via keyboard or UI)  
- ⏪ Undo (Ctrl+Z) & 🔁 Redo (Ctrl+Shift+Z) actions  
- 🖱️ Drag-and-drop node positioning  
- 🎨 Simple & responsive UI with toolbar actions  

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tanvi1107/react-canvasboard.git
   cd react-canvasboard
2. Installing dependencies:
   ```bash
     npm install
3. Running the app:
   ```bash
   npm run dev

Open your browser at 👉 http://localhost:5180

📖 Summary

This app is a graph editor built with React Flow.
It gives users a visual canvas where they can:

Add and arrange nodes

Connect them by dragging from one node to another

Delete nodes/edges when no longer needed

Navigate through changes using Undo/Redo

🎨 Design Decisions

React Flow chosen for node/edge rendering and graph management

Custom toolbar added for Undo/Redo/Delete, improving usability

Keyboard shortcuts implemented for power users

History stack tracks meaningful state changes to support undo/redo cleanly
    
   

>>>>>>> 28b18ae36dee96c0349dcf1a71b386356ff20347
