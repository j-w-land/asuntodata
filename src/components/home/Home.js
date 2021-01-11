import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import data_all_transactions from "../../assets/data/data_all_transactions.json";
import zipCodeStructure from "../../assets/data/zipCodeStructure.json";
import getData from "../../setUp/dataSetUp";

export default function Home() {
  const cityList = getData("cityList");
  const zipsByCity = getData("zipsByCity");
  const [transactionsByRegion, setTransactionsByRegion] = useState([]);

  useEffect(() => {
    setTransactionsByRegion(getData("transactionsByRegion"));
  }, []);

  console.log("transactionsByRegion");
  console.log(transactionsByRegion);

  return (
    <div>
      <h1 style={{ paddingTop: "50px" }}>Kauppahinnat.fi</h1>
      <h3 style={{ paddingBottom: "50px" }}>Dataa asuntojen hinnoista</h3>

      <ul>
        {transactionsByRegion.map((e) => (
          <li key={e.place}>
            {e.place}: {e.data.length} kpl
          </li>
        ))}
      </ul>

      {/* <div>
        <h3>Linkit näkymiin:</h3>
        <div>
          Postinumero <Link to="/postinumero/53850">53850</Link>
        </div>
        <div>
          Kaupunki <Link to="/kaupunki/Lappeenranta">Lappeenranta</Link>{" "}
        </div>
        <div>
          Kaupunginosa <Link to="/kaupunginosa/Skinnarila">Skinnarila</Link>{" "}
        </div>
      </div> */}
    </div>
  );
}
