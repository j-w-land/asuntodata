import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";
import Button from "react-bootstrap/Button";

export default function TableByCity({
  area,
  data,
  summaryData,
  onClickHandler,
}) {
  const [barData, setBarData] = useState([]);
  const [barDataOthers, setBarDataOthers] = useState([]);
  const [showOthers, setShowOthers] = useState(false);
  const [noTransactionsList, setNoTransactionsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const showOthersButtonHandler = (e) => {
    setShowOthers((state) => !state);
  };

  useEffect(() => {
    setShowOthers(false);
  }, [area]);

  useEffect(() => {
    if (area === "Suomi") return null;
    let barDataArr = [];
    let noTransactionsListArray = [];
    let othersArray = [];

    let totalTransactions = 0;

    try {
      let regiondData = summaryData.filter((e) => e.place == area)[0];
      totalTransactions = regiondData.data.kaikki.tapahtumatYht;

      totalTransactions = parseInt(totalTransactions.replace(/\s/g, ""));
    } catch (error) {}

    let objectOthers = {
      place: "muut",
      yksiö: 0,
      kaksio: 0,
      kolmio: 0,
      neliö: 0,
    };

    data.map((d) => {
      if (parseInt(d.data["kaikki"].tapahtumatYht.replace(/\s/g, "")) < 1) {
        noTransactionsListArray.push(d.place);
      } else if (
        parseInt(d.data["kaikki"].tapahtumatYht.replace(/\s/g, "")) >
        0.02 * totalTransactions
      ) {
        barDataArr.push({
          place: d.place,
          yksiö: parseInt(d.data[1].tapahtumatYht.replace(/\s/g, "")),
          kaksio: parseInt(d.data[2].tapahtumatYht.replace(/\s/g, "")),
          kolmio: parseInt(d.data[3].tapahtumatYht.replace(/\s/g, "")),
          neliö: parseInt(d.data[4].tapahtumatYht.replace(/\s/g, "")),
        });
      } else {
        othersArray.push({
          place: d.place,
          yksiö: parseInt(d.data[1].tapahtumatYht.replace(/\s/g, "")),
          kaksio: parseInt(d.data[2].tapahtumatYht.replace(/\s/g, "")),
          kolmio: parseInt(d.data[3].tapahtumatYht.replace(/\s/g, "")),
          neliö: parseInt(d.data[4].tapahtumatYht.replace(/\s/g, "")),
        });
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

    if (othersArray.length > 0) barDataArr.push(objectOthers);

    setBarData(barDataArr);
    setBarDataOthers(othersArray);
    setNoTransactionsList(noTransactionsListArray);

    setLoading(false);
  }, [area, summaryData, data]);

  if (area === "Suomi") {
    return <div style={{ height: "500px" }}>Valitse maakunta</div>;
  }
  if (loading === true) {
    return (
      <div style={{ height: "500px" }}>Vain hetki, ladataan lisää tietoa..</div>
    );
  }

  return (
    <div style={{ height: "500px" }}>
      {barDataOthers.length > 0 && (
        <div style={{ height: "50px", textAlign: "left", paddingLeft: "10%" }}>
          <Button variant="info" onClick={showOthersButtonHandler}>
            {" "}
            {showOthers === false ? "Näytä muut" : "Palaa takaisin"}{" "}
          </Button>
        </div>
      )}
      <div style={{ height: "350px" }}>
        <ResponsiveBar
          data={showOthers === false ? barData : barDataOthers}
          keys={["yksiö", "kaksio", "kolmio", "neliö"]}
          indexBy="place"
          onClick={(node) => {
            if (node.indexValue === "muut") return null;
            onClickHandler(node);
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
      {noTransactionsList.length > 0 && (
        <div>
          Kaupungit, joissa ei raportoituja kauppoja:{" "}
          {noTransactionsList.map((e, index) => {
            if (index === noTransactionsList.length - 1) {
              return e + ".";
            } else {
              return e + ", ";
            }
          })}
        </div>
      )}
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
