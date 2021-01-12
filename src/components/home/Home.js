import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import data_all_transactions from "../../assets/data/data_all_transactions.json";
import zipCodeStructure from "../../assets/data/zipCodeStructure.json";
import getData from "../../setUp/dataSetUp";

export default function Home() {
  const cityList = getData("cityList");
  const zipsByCity = getData("zipsByCity");
  const [transactionsByRegion, setTransactionsByRegion] = useState([]);
  const [transactionsByCity, setTransactionsByCity] = useState([]);

  const onClickHandler = (e) => {
    console.log(e);
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("DATAFETCHED_START");
      let res = await getData("transactionsByCity");
      setTransactionsByCity(res);
      let res2 = await getData("transactionsByRegion");
      setTransactionsByRegion(res2);

      setLoading(false);
      console.log("DATAFETCHED___RES");
    };
    setLoading(true);
    fetchData();

    console.log("DATAFETCHED");
  }, []);

  console.log("transactionsByRegion");
  console.log(transactionsByRegion);

  console.log("RETURN_START");
  return (
    <div>
      <h1 style={{ paddingTop: "50px" }}>Kauppahinnat.fi</h1>
      <h3 style={{ paddingBottom: "50px" }}>Dataa asuntojen hinnoista</h3>

      {console.log("loading: " + loading)}
      {loading == false ? (
        <div>
          {transactionsByRegion.map((e) => (
            <div key={e.place}>
              {e.place}: {e.data.length} kpl
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            height: "400px",
            alignContent: "center",
            verticalAlign: "center",
          }}
        >
          {" "}
          ladataan...{" "}
        </div>
      )}

      <div style={{ height: "300px", margin: "30px" }}>
        <div style={{ maxHeight: "300px", width: "33%" }}>
          <h6>Kauppamäärät kaupungeittain</h6>
          <div style={{ maxHeight: "280px", overflowY: "scroll" }}>
            {transactionsByCity.map((e) => (
              <div onClick={onClickHandler} key={e.place}>
                <Link to={`kaupunki/${e.place}`}> {e.place}: </Link>{" "}
                {e.data.length}
              </div>
            ))}
          </div>
        </div>
      </div>

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
