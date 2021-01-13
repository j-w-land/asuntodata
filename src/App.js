import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/home/Home";
import ZipView from "./components/views/ZipView";
import CityView from "./components/views/CityView";
import DistrictView from "./components/views/DistrictView";
import getData from "./setUp/dataSetUp";

function App() {
  const [transactionsByCity, setTransactionsByCity] = useState([]);
  const [summaryByRegion, setsummaryByRegion] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData("transactionsByCity")
      .then((loadedPosts) => {
        setTransactionsByCity(loadedPosts);
      })
      .then(
        getData("summaryByArea", { type: "region" }).then((loadedPosts) => {
          setsummaryByRegion(loadedPosts);
          setLoading(false);
        })
      );
  }, []);

  if (loading) {
    return "Ladataan tietoja...";
  }

  return (
    <div className="App">
      <Router basename="/">
        <Header />

        <Switch>
          <Route path="/postinumero/:zip">
            <ZipView />
          </Route>
          <Route path="/kaupunki/:city">
            {/****** Todo: vaihda kovakoodattu parametri dynaamiseen  ******/}
            <CityView cityData={transactionsByCity} />
          </Route>
          <Route path="/kaupunginosa/:district">
            <DistrictView />
          </Route>

          <Route path="/">
            <Home
              transactionsByCity={transactionsByCity}
              summaryByRegion={summaryByRegion}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
