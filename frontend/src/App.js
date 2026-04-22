import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Formations from "./Formations";

function App() {
  return (
    <Router>
      <nav style={{ padding: 10, background: "#333" }}>
        <Link to="/" style={{ color: "white", marginRight: 10 }}>Accueil</Link>
        <Link to="/formations" style={{ color: "white" }}>Formations</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formations" element={<Formations />} />
      </Routes>
    </Router>
  );
}

export default App;