import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import ZipView from "./components/views/ZipView";
import CityView from "./components/views/CityView";
import DistrictView from "./components/views/DistrictView";
import getData from "./setUp/dataSetUp";

function App() {
  const [transactionsByCity, setTransactionsByCity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData("transactionsByCity").then((transactions) => {
      setTransactionsByCity(transactions);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return "Ladataan tietoja...";
  }

  return (
    <div className="App">
      <Router basename="/">
        <Header />
        <div className="site-container">
          <Switch>
            <Route path="/postinumero/:zip">
              <ZipView />
            </Route>
            <Route path="/kaupunki/:city">
              <CityView cityData={transactionsByCity} />
            </Route>
            <Route path="/kaupunginosa/:district">
              <DistrictView />
            </Route>

            <Route path="/">
              <Home transactionsByCity={transactionsByCity} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
