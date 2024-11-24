// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./components/RoutesComponent";

function App() {
  return (
    <div className="h-screen w-screen overflow-x-hidden bg-[#F3F3F3]">
      <Router>
        <RoutesComponent />
      </Router>
    </div>
  );
}

export default App;