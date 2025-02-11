import React from "react"; // Ensure React is imported
import ChatInterface from "./components/ChatInterface.tsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MediGyaan AI</h1>
        <p>Your AI assistant for medical knowledge</p>
      </header>
      <main>
        <ChatInterface />
      </main>
      <footer>
        <p>© 2023 MediGyaan AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
