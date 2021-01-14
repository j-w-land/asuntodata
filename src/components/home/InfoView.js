import { useState, useEffect } from "react";

export default function InfoView({ area, data, width }) {
  console.log("InfoView___");
  console.log(data);
  console.log(area);

  const headers = ["Data", "Yksiöt", "Kaksiot", "Kolmiot", "4h+", "kaikki"];

  const [dataActiveRegion, setdataActiveRegion] = useState({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let areaData = data.filter((d) => d.place == area);

    console.log("areaData");
    console.log(areaData);

    if (areaData.length == 0) {
      setdataActiveRegion({});
      return null;
    }
    let tableData = areaData[0].data;
    console.log("tableData");
    console.log(tableData);

    let rowNames = [];
    Object.keys(tableData["kaikki"]).map(function (item) {
      rowNames.push(item);
    });

    console.log(rowNames);
    console.log("rowNames");
    let rows = [];

    for (const rowName in rowNames) {
      rows.push([rowNames[rowName]]);
      Object.keys(tableData).map(function (item) {
        rows[rowName].push(tableData[item][rowNames[rowName]]);
      });
    }

    console.log(rows);
    console.log("rows__________________");
    setRows(rows);
  }, [area]);

  return (
    <div style={{ width: width }}>
      <br />
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={"regionInfoViewHeader" + header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            console.log(row);
            return (
              <tr>
                {row.map((r) => (
                  <td>{r.avg != undefined ? r.avg : r}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

{
  /* <ul className="flex-container">
        {data.map((e) => (
          <div className="flex-item-home" key={e.place}>
            <span className="title"> {e.place}</span>
            <br />
            <span> Myydyt: {e.data.tapahtumatYht} kpl</span> <br />
            <span>
              {" "}
              Keskihinta:{" "}
              {typeof e.data.hintaPerNelio.avg !== "number"
                ? "-"
                : e.data.hintaPerNelio.avg.toFixed(0)}{" "}
              €/m2
            </span>{" "}
            <br />
            <span>
              {" "}
              Keskikoko:{" "}
              {typeof e.data.pintaAla.avg !== "number"
                ? "-"
                : e.data.pintaAla.avg.toFixed(0)}{" "}
              €/m2
            </span>{" "}
            <br />
          </div>
        ))}
      </ul> */
}
