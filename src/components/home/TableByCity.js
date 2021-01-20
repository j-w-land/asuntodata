import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TableByCity({ area, data, onClickHandler }) {
  const headers = ["", "Yksiöt", "Kaksiot", "Kolmiot", "4h+", "kaikki"];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    let areaData = data.filter((d) => d.place === area);

    if (areaData.length === 0) {
      return null;
    }
    let tableData = areaData[0].data;

    let rowNames = [];
    Object.keys(tableData["kaikki"]).map(function (item) {
      rowNames.push(item);
    });

    let rows = [];

    for (const rowName in rowNames) {
      rows.push([rowNames[rowName]]);
      Object.keys(tableData).map(function (item) {
        rows[rowName].push(tableData[item][rowNames[rowName]]);
      });
    }

    setRows(rows);
  }, [area]);

  return (
    <div style={{ maxHeight: "280px", overflowY: "scroll" }}>
      {data.map((e) => (
        <div onClick={onClickHandler} key={e.place}>
          <Link to={`kaupunki/${e.place}`}> {e.place}: </Link> {e.data.length}
        </div>
      ))}
    </div>
  );
}
