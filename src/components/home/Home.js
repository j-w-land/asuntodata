import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import getData from "../../setUp/dataSetUp";
import Grid from "./Grid";
import InfoView from "./InfoView";

export default function Home({ transactionsByCity, summaryByRegion }) {
  // TODO: Siirrä datan haku App.js:ään ja tuo propseissa mitä tarvii tällä sivulla
  // Tällä hetkellä osa datasta haetaan Sekä App.js:ssä että täällä, joten datan haussa kestää hetki
  //const cityList = getData("cityList");
  //const zipsByCity = getData("zipsByCity");
  const [transactionsByRegion, setTransactionsByRegion] = useState([]);
  /* const [transactionsByCity, setTransactionsByCity] = useState([]);
  const [summaryByRegion, setsummaryByRegion] = useState([]); */
  const [regionInfoActive, setRegionInfoActive] = useState("Alue");
  const [loading, setLoading] = useState(true);

  const onClickHandler = (e) => {
    setRegionInfoActive(e.target.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      let res2 = await getData("transactionsByRegion");
      setTransactionsByRegion(res2);

      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, []);

  console.log("summaryByRegion____");
  console.log(summaryByRegion);

  return (
    <div>
      <h1 style={{ paddingTop: "50px" }}>Kauppahinnat.fi</h1>
      <h3 style={{ paddingBottom: "50px" }}>Dataa asuntojen hinnoista</h3>

      <div className="flex-container">
        <div style={{ width: "50%" }}>
          <h5
            style={
              {
                /* width: "50%" */
              }
            }
          >
            Tilastoja maakunnittain
          </h5>
          {loading == false ? (
            <Grid
              data={summaryByRegion}
              width="100%"
              onClick={onClickHandler}
            />
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
        </div>

        <div style={{ width: "50%" }}>
          <h5
            style={
              {
                /* width: "50%"  */
              }
            }
          >
            {regionInfoActive}
          </h5>
          {loading == false ? (
            <InfoView
              data={summaryByRegion}
              name={regionInfoActive}
              width="100%"
            />
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
        </div>
      </div>

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
