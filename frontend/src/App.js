import React, { useEffect, useState } from "react";

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
    fetch("http://localhost:5000/formations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    <div style={{ padding: 20 }}>
      <h1>📚 Gestion des formations</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nouvelle formation"
      />
      <button onClick={addFormation}>Ajouter</button>

      <ul>
        {formations.map((f) => (
          <li key={f._id}>
            {f.title}
            <button onClick={() => deleteFormation(f._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;