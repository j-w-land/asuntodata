import { useEffect, useState } from "react";

import pxwebGetData from "../../setUp/PXWeb/getData";
import { ResponsiveLine } from "@nivo/line";

import getData from "../../setUp/dataSetUp";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";

export default function RegionHistoryGraph() {
  console.log("RegionBarLine__");
  const [regionData, setRegionData] = useState([]);

  const [regionDataActive, setRegionDataActive] = useState([]);
  const [regiondDataHidden, setRegionDataHidden] = useState([]);
  const [provinces, setProvinces] = useState({ Suomi: true });

  useEffect(() => {
    const fetchData = async () => {
      let provincesObj = provinces;
      let provincesRes = await getData("provinceList");

      for (const item in provincesRes) {
        provincesObj[provincesRes[item]] = false;
      }

      setProvinces(provincesObj);

      let res = await pxwebGetData("summaryByRegion");
      console.log(res);
      console.log("pxwebGetData_summaryByRegion");

      let data = [];
      let dataObject = {};
      for (const region in res[0]["data"]) {
        dataObject[res[0]["data"][region].place] = { data: [] };
      }

      for (const year in res) {
        let yearValue = res[year]["year"];
        for (const region in res[year]["data"]) {
          try {
            dataObject[res[year]["data"][region].place].data.push({
              x: yearValue,
              y:
                res[year]["data"][region]["data"]["Talotyypit yhteensä"][
                  "Rakennusvuodet yhteensä"
                ][yearValue]["avg_Neliöhinta (EUR/m2)"],
            });
          } catch (error) {
            console.log("ERROR_NOT_FOUND---  " + error);
          }
        }
      }
      console.log(dataObject);
      console.log("dataObject__RES__");
      let keys = Object.keys(dataObject);
      for (const key in keys) {
        if (dataObject[keys[key]].data.length > 0) {
          console.log(dataObject[keys[key]]);
          console.log(keys[key]);
          console.log("KEY__TEST_____");
          data.push({
            id: keys[key],
            data: dataObject[keys[key]].data,
            dataActual: dataObject[keys[key]].data,
          });
        }
      }
      console.log(data);
      console.log("DATA_RES");
      data.sort(
        (a, b) =>
          a["data"][a["data"].length - 1].y - b["data"][b["data"].length - 1].y
      );

      setRegionData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // let newData = regionData.filter((e) e.)

    const fetchData = async () => {
      let activeProvince = Object.keys(provinces).find(
        (key) => provinces[key] === true
      );
      console.log(activeProvince);
      console.log("activeProvince__");
      if (activeProvince === "Suomi") {
        setRegionDataActive(regionData);
        return;
      }
      let regionsByProvince = await getData("regionsByProvince");
      console.log(regionsByProvince);
      console.log("provinces____");

      let regions = regionsByProvince[activeProvince];
      console.log(regions);
      console.log("regions___-__");
      let regionsActive = [];

      for (const region in regions) {
        let match = regionData.filter((e) => e.id === regions[region]);
        regionsActive.push(match[0]);
      }
      console.log(regionsActive);
      console.log("regionsActive");

      setRegionDataActive(regionsActive);
    };
    fetchData();
  }, [provinces, regionData]);

  const legendOnClick = (d) => {
    console.log("legendOnClick");
    console.log(d);
    let split = d.id.split("pois]");
    let data = [...regionData];

    if (split[0] === "[") {
      console.log(split[1]);
      console.log("split[1]");
      let index = data.findIndex((obj) => obj.id === d.id);
      console.log(data);
      console.log(index);

      data[index].data = data[index].dataActual;
      data[index].id = split[1];
    } else {
      let index = data.findIndex((obj) => obj.id === d.id);
      data[index].data = [];
      data[index].id = "[pois]" + data[index].id;
    }

    setRegionData(data);
  };

  const legendFormater = (d) => {
    console.log(d);
    console.log("xx");
    console.log("legendFormater");
  };

  const provinceFilterClick = (e) => {
    console.log("provinceFilterClick  ");
    console.log(e.target.id);

    let newObj = { ...provinces };
    let keys = Object.keys(newObj);
    for (const key in keys) {
      if (keys[key] === e.target.id) {
        newObj[keys[key]] = true;
      } else {
        newObj[keys[key]] = false;
      }
    }
    setProvinces(newObj);
  };

  return (
    <div>
      <div style={{ height: "450px", marginBottom: "100px" }}>
        {/*    <div>RegionBarLine</div> */}
        <h5>Neliöhinnat maakunnittain 2010-2020</h5>

        <DropdownButton
          as={ButtonGroup}
          key="Filter-provinces"
          id="Filter-provinces"
          title="Alue"
        >
          {console.log(Object.keys(provinces))}
          {console.log("provinces___")}
          {Object.keys(provinces).map((variant) =>
            provinces[variant] === true ? (
              <Dropdown.Item
                key={variant}
                eventKey={variant}
                active
                id={variant}
              >
                {variant}
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                key={variant}
                eventKey={variant}
                id={variant}
                onClick={provinceFilterClick}
              >
                {variant}
              </Dropdown.Item>
            )
          )}
        </DropdownButton>

        <ResponsiveLine
          data={regionDataActive}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          onClick={(node) => {
            console.log(node);
            console.log("CLICKEd");
          }}
          tooltip={({ point }) => {
            console.log(point);
            console.log("TOOLTIP");
            return (
              <div
                style={{
                  background: "white",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                  fontSize: "0.85rem",
                }}
              >
                <div style={{}}>
                  <div
                    style={{
                      color: point.serieColor,
                      padding: "3px 0",
                      display: "inline-block",
                    }}
                  >
                    <span
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: point.serieColor,
                        borderRadius: "50%",
                        display: "inline-block",
                        marginRight: "5px",
                      }}
                    ></span>
                    <strong>{point.serieId}</strong>
                  </div>
                  <div style={{ display: "inline-block" }}>
                    {"  "}[{point.data.xFormatted}]
                  </div>
                </div>
                <div> {point.data.yFormatted} €/m2 </div>
              </div>
            );
            return (
              <div>
                <p>
                  {point.serieId} ({point.data.xFormatted})
                </p>
                <p>{point.data.yFormatted} €/m2</p>
              </div>
            );
          }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "year",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "€/m2",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legendFormat={legendFormater}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              //onClick: legendOnClick,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
      <div style={{ textAlign: "left" }}>
        <span>Lähde: tilastokeskus</span>
      </div>
    </div>
  );
}
