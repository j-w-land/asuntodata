import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";

export default function TableByCity({
  area,
  data,
  summaryData,
  onClickHandler,
}) {
  let barData = [];

  console.log("summaryData");
  console.log(summaryData);
  let totalTransactions = 0;
  console.log(area);

  try {
    let regiondData = summaryData.filter((e) => e.place == area)[0];
    totalTransactions = regiondData.data.kaikki.tapahtumatYht;

    totalTransactions = parseInt(totalTransactions.replace(/\s/g, ""));
  } catch (error) {
    console.log(error);
  }

  console.log(totalTransactions);

  console.log("totalTransactions");

  let objectOthers = {
    place: "muut",
    yksiö: 0,
    kaksio: 0,
    kolmio: 0,
    neliö: 0,
  };
  data.map((d) => {
    if (
      parseInt(d.data["kaikki"].tapahtumatYht.replace(/\s/g, "")) >
      0.02 * totalTransactions
    ) {
      barData.push({
        place: d.place,
        yksiö: parseInt(d.data[1].tapahtumatYht.replace(/\s/g, "")),
        kaksio: parseInt(d.data[2].tapahtumatYht.replace(/\s/g, "")),
        kolmio: parseInt(d.data[3].tapahtumatYht.replace(/\s/g, "")),
        neliö: parseInt(d.data[4].tapahtumatYht.replace(/\s/g, "")),
      });
    } else {
      objectOthers["yksiö"] =
        objectOthers["yksiö"] +
        parseInt(d.data[1].tapahtumatYht.replace(/\s/g, ""));
      objectOthers["kaksio"] =
        objectOthers["kaksio"] +
        parseInt(d.data[2].tapahtumatYht.replace(/\s/g, ""));
      objectOthers["kolmio"] =
        objectOthers["kolmio"] +
        parseInt(d.data[3].tapahtumatYht.replace(/\s/g, ""));
      objectOthers["neliö"] =
        objectOthers["neliö"] +
        parseInt(d.data[4].tapahtumatYht.replace(/\s/g, ""));
    }
  });
  barData.push(objectOthers);

  console.log(barData);
  console.log("barData");

  return (
    <div style={{ height: "300px" }}>
      <ResponsiveBar
        data={barData}
        keys={["yksiö", "kaksio", "kolmio", "neliö"]}
        indexBy="place"
        onClick={(node) => {
          console.log(node);
        }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "kaupunki",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "kpl",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
}

{
  /* <div style={{ maxHeight: "280px", overflowY: "scroll" }}>
      {data.map((e) => (
        <div onClick={onClickHandler} key={e.place}>
          <Link to={`kaupunki/${e.place}`}> {e.place}: </Link> {e.data.length}
        </div>
      ))}
    </div> */
}
