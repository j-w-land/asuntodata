import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Table from "./Table.js";
import Header from "./components/Header";
import Home from "./components/home/Home";
import ZipView from "./components/views/ZipView";
import CityView from "./components/views/CityView";
import DistrictView from "./components/views/DistrictView";

function App() {
  fetch("53850.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((response) => response.json());

  return (
    <Router basename="/">
      <div className="App">
        <Header />

        <Switch>
          <Route path="/postinumero/:zip">
            <ZipView />
          </Route>
          <Route path="/kaupunki/:city">
            <CityView />
          </Route>
          <Route path="/kaupunginosa/:district">
            <DistrictView />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Table />
      </div>
    </Router>
  );
}

export default App;
