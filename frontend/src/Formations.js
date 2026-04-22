import React, { useEffect, useState } from "react";

function Formations() {
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
    fetch("http://localhost:5000/formations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    }).then(() => {
      setTitle("");
      fetchData();
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📚 Formations</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ajouter formation"
      />
      <button onClick={addFormation}>Ajouter</button>

      <ul>
        {formations.map((f) => (
          <li key={f._id}>{f.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Formations;