import { useState, useEffect } from "react";

import getData from "../../setUp/dataSetUp";
import Grid from "./Grid";
import InfoView from "./InfoView";
import TableByCity from "./TableByCity";

export default function Home({ transactionsByCity }) {
  const [summaryData, setsummaryData] = useState([]);

  const [regionInfoActive, setRegionInfoActive] = useState("Suomi");
  const [loading, setLoading] = useState(true);
  const [initLoad, setInitLoad] = useState(false);

  const onClickHandler = (e) => {
    setRegionInfoActive(e.target.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      let res_summaryByAreaCountry = await getData("summaryByArea", {
        type: "country",
      });

      setsummaryData(res_summaryByAreaCountry);
      setLoading(false);
      setInitLoad(true);
    };
    setLoading(true);

    fetchData();
  }, []);

  useEffect(() => {
    if (initLoad === false) return null;
    if (initLoad === "complete") return null;
    const fetchData = async () => {
      let res_summaryByAreaRegion = await getData("summaryByArea", {
        type: "region",
      });

      setsummaryData([...summaryData, ...res_summaryByAreaRegion]);
      setInitLoad("complete");
      setLoading(false);
    };
    setLoading(true);
    fetchData();
  }, [initLoad]);

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

          {loading === false ? (
            <div>
              <Grid data={summaryData} width="100%" onClick={onClickHandler} />

              {initLoad !== "complete" ? (
                <div style={{ paddingTop: "100px", fontSize: "2em" }}>
                  Hetki, ladataan lisää tietoa..
                </div>
              ) : null}
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
          {loading === false ? (
            <InfoView data={summaryData} area={regionInfoActive} width="100%" />
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
        <div style={{ maxHeight: "500", width: "50%" }}>
          <h6>{regionInfoActive} - kaupat kaupingittain</h6>
          {/* <div style={{ maxHeight: "280px", overflowY: "scroll" }}>
            {transactionsByCity.map((e) => (
              <div onClick={onClickHandler} key={e.place}>
                <Link to={`kaupunki/${e.place}`}> {e.place}: </Link>{" "}
                {e.data.length}
              </div>
            ))}
          </div> */}
          <TableByCity
            area={regionInfoActive}
            data={transactionsByCity}
            onClickHandler={onClickHandler}
          />
        </div>
      </div>
    </div>
  );
}
