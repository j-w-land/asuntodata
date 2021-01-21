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

  useEffect(() => {
    setShowOthers(false);
  }, [area]);

  useEffect(() => {}, [area, summaryData, data]);

  console.log(barData);
  console.log(barDataOthers);
  console.log("barData_____________________-");
  console.log(area);

  if (area === "Suomi") {
    return <div style={{}}>Valitse maakunta</div>;
  }

  return <div style={{}}>{area}</div>;
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
