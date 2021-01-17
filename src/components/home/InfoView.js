import { useState, useEffect } from "react";

export default function InfoView({ area, data, width }) {
  console.log("InfoView___");
  console.log(data);
  console.log(area);

  const headers = ["", "Yksiöt", "Kaksiot", "Kolmiot", "4h+", "kaikki"];

  const [rows, setRows] = useState([]);

  useEffect(() => {
    let areaData = data.filter((d) => d.place == area);

    console.log("areaData");
    console.log(areaData);

    if (areaData.length == 0) {
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
          {rows.map((row, rowIndex) => {
            console.log(row);
            return (
              <tr key={"regionInfoViewTableRow_" + rowIndex}>
                {row.map((r, rIndex) =>
                  //First item is row name -> return row name
                  rIndex == 0 ? (
                    <td
                      key={"regionInfoViewTableRow_" + rowIndex + "_" + rIndex}
                    >
                      {r}
                    </td>
                  ) : (
                    // remaining items include data -> loop min, avg, and max values:
                    <td
                      key={"regionInfoViewTableRow_" + rowIndex + "_" + rIndex}
                    >
                      <div>
                        {r.min != undefined ? r.min : ""}
                        <br />
                        {r.avg != undefined ? r.avg : r}
                        <br />
                        {r.max != undefined ? r.max : ""}
                      </div>
                    </td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
