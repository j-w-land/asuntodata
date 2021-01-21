import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ResponsiveBar } from "@nivo/bar";
import Button from "react-bootstrap/Button";

export default function TableByCitySide({
  area,
  data,
  summaryData,
  onClickHandler,
}) {
  const [barData, setBarData] = useState([]);
  const [barDataOthers, setBarDataOthers] = useState([]);
  const [showOthers, setShowOthers] = useState(false);
  const [noTransactionsList, setNoTransactionsList] = useState([]);

  const showOthersButtonHandler = (e) => {
    setShowOthers((state) => !state);
  };

  useEffect(() => {}, [area, summaryData, data]);

  console.log(barData);
  console.log(barDataOthers);
  console.log("barData_____________________-");
  console.log(area);

  let dataObj = {};
  let itemsArr = [];

  try {
    dataObj = data.filter((e) => e.place === area)[0].data.kaikki;
    console.log(dataObj);
    console.log("dataObj__________--");

    Object.keys(dataObj).map((key) => {
      if (dataObj[key].avg !== undefined) {
        itemsArr.push(key + ": " + dataObj[key].avg);
      } else {
        itemsArr.push(key + ": " + dataObj[key]);
      }
    });
    console.log(itemsArr);
  } catch (error) {
    return null;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h6 style={{ paddingTop: "15px" }}>kaupungin keskiarvot:</h6>
      {itemsArr.map((e) => (
        <p>{e}</p>
      ))}
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
