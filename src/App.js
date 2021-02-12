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
  const [transactionsByZip, setTransactionsByZip] = useState([]);
  const [loading, setLoading] = useState(false);

  /*   useEffect(() => {
    getData("transactionsByCity").then((transactions) => {
      setTransactionsByCity(transactions);
      setLoading(false);
    });
  }, []); */

  /*  useEffect(() => {
    getData("transactionsByZip").then((transactions) => {
      setTransactionsByZip(transactions);
      setLoading(false);
    });
  }, []); */

  /*   if (loading) {
    return "Ladataan tietoja...";
  } */

  return (
    <div className="App">
      <Router basename="/">
        <Header />
        <div className="site-container">
          <Switch>
            <Route path="/postinumero/:zip">
              <ZipView zipData={transactionsByZip} />
            </Route>
            <Route path="/kaupunki/:city">
              <CityView cityData={transactionsByCity} />
            </Route>
            <Route path="/kaupunginosa/:district">
              <DistrictView cityData={transactionsByCity} />
            </Route>

            <Route path="/">
              <Home transactionsByCity={transactionsByCity} />
            </Route>
          </Switch>
        </div>
        <div className="footer">
          <p>Data haettu 9.1.2021 @ asuntojen.hintatiedot.fi</p>
          <p>Team KooHoo</p>
        </div>
      </Router>
    </div>
  );
}

export default App;
