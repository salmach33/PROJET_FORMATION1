import React, { useEffect, useState } from "react";

function App() {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/formations")
      .then(res => res.json())
      .then(data => setFormations(data));
  }, []);

  return (
    <div>
      <h1>Liste des formations test 2</h1>
      <ul>
        {formations.map((f, index) => (
          <li key={index}>{f.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;