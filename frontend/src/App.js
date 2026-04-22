import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [formations, setFormations] = useState([]);
  const [title, setTitle] = useState("");

  const fetchData = () => {
    fetch("http://localhost:5000/formations")
      .then(res => res.json())
      .then(data => setFormations(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addFormation = () => {
    if (!title) return;
    fetch("http://localhost:5000/formations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).then(() => {
      setTitle("");
      fetchData();
    });
  };

  const deleteFormation = (id) => {
    fetch(`http://localhost:5000/formations/${id}`, {
      method: "DELETE",
    }).then(() => fetchData());
  };

  return (
    <div className="container">
      <h1>📚 Formation Manager</h1>

      <div className="form-box">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ajouter une formation..."
        />
        <button onClick={addFormation}>Ajouter</button>
      </div>

      <div className="cards">
        {formations.map((f) => (
          <div className="card" key={f._id}>
            <span>{f.title}</span>
            <button onClick={() => deleteFormation(f._id)}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;