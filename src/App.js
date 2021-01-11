import React from "react";
import "./App.css";
import Table from "./Table.js";

function App() {
  fetch("53850.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());

  return (
    <div className="App">
      <ul id="Navbar">
        <li>
          <h3>Kauppahinnat.fi</h3>
        </li>
      </ul>

      <br />
      <Table />
    </div>
  );
}

export default App;
