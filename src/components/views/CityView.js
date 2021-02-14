import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Grid from "../home/Grid";
import "bootstrap/dist/css/bootstrap.min.css";
import getData from "./../../setUp/dataSetUp";
import Table from "./Table";
import Line from "../graphs/nivo/Line";
import pxwebGetData from "../../setUp/PXWeb/getData";

export default function CitytView(props) {
  let { city } = useParams();

  let Sales = [];
  try {
    Sales = findCityData(props.cityData, city).data;
  } catch (error) {}

  const [lineData, setLineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const years = [
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020,
      ];

      let zipListByCity = await getData("zipsByCity", city);
      console.log(zipListByCity);
      console.log("zipsByCity__");

      let zips = [];
      for (const item in zipListByCity) {
        zips.push(zipListByCity[item].postinumero);
      }
      console.log(zips);

      let params = { zips: zips, years: years };

      let res = await pxwebGetData("byZip", params);
      console.log(res);
      console.log("pxwebGetData_summaryByZip");

      let data = [];

      let zipItems = Object.keys(res);
      for (const key in zipItems) {
        let dataObject = { id: zipItems[key] };
        let objData = [];

        console.log(zipItems[key]);
        console.log("DATALEMENT__");
        let dataElement =
          res[zipItems[key]]["Talotyypit yhteensä"]["Rakennusvuodet yhteensä"];
        let elementKeys = Object.keys(dataElement);

        if (zipItems[key] === "total") {
          dataObject["id"] = city;
          for (const year in elementKeys) {
            objData.push({
              x: elementKeys[year],
              y:
                res[zipItems[key]]["Talotyypit yhteensä"][
                  "Rakennusvuodet yhteensä"
                ][elementKeys[year]]["avg_Neliöhinta (EUR/m2)"],
            });
          }
        } else {
          for (const year in elementKeys) {
            if (
              res[zipItems[key]]["Talotyypit yhteensä"][
                "Rakennusvuodet yhteensä"
              ][elementKeys[year]]["Neliöhinta (EUR/m2)"] === "NULL"
            ) {
              objData = "SKIP";
              break;
            } else {
              objData.push({
                x: elementKeys[year],
                y:
                  res[zipItems[key]]["Talotyypit yhteensä"][
                    "Rakennusvuodet yhteensä"
                  ][elementKeys[year]]["Neliöhinta (EUR/m2)"],
              });
            }
          }
        }

        //dataObject["id"] = zip;
        if (objData === "SKIP") {
        } else {
          dataObject["data"] = objData;
          data.push(dataObject);
        }

        //break;
      }

      data.sort(
        (a, b) =>
          a["data"][a["data"].length - 1].y - b["data"][b["data"].length - 1].y
      );

      console.log(data);
      console.log("DATA_RES_zip");
      let cityObject = data.filter((obj) => {
        return obj.id === city;
      });
      //setLineData(data);
      setLineData(cityObject);
    };

    fetchData();
  }, []);

  const [summaryByRooms, setsummaryByRooms] = useState([]);
  const [apartmentInfoActive, setApartmentInfoActive] = useState("Kaikki");

  const onClickHandler = (e) => {
    setApartmentInfoActive(e.target.id);
  };

  useEffect(() => {
    getData("summaryByRooms", { sales: Sales }).then((summaries) => {
      setsummaryByRooms(summaries);
    });
  }, []);

  // Haetaan listalta oikean kaupungin tiedot
  function findCityData(array, value) {
    return array.find((element) => {
      return element.place === value;
    });
  }

  return (
    <div>
      <h1 style={{ padding: "50px" }}>{city}</h1>

      <div>
        <h2> Neliöhinnat 2010-2020 postinumeroittain</h2>
        <div style={{ height: "450px", marginBottom: "100px" }}>
          <Line data={lineData} />
        </div>
      </div>

      <div className="flex-container">
        <div style={{ width: "100%" }}>
          <h5>Tilastoja huonekohtaisesti</h5>
          <Grid data={summaryByRooms} width="100%" onClick={onClickHandler} />
          <div
            style={{
              height: "50px",
              alignContent: "center",
              verticalAlign: "center",
            }}
          ></div>

          <div style={{ width: "100%" }}>
            <h5>{apartmentInfoActive}</h5>
            <Table sales={Sales} room={apartmentInfoActive} />
          </div>
          <div
            style={{
              height: "100px",
              alignContent: "center",
              verticalAlign: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
