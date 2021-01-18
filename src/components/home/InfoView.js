import { useState, useEffect } from "react";

export default function InfoView({ area, data, width }) {
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
    <div style={{ width: width }}>
      <table className="infoViewTable" style={{ width: "100%" }}>
        <thead>
          <tr key={"InfoViewHeader_header_tr"}>
            {headers.map((header, ind) => (
              <th key={"InfoViewHeader" + ind + "-" + header}>{header}</th>
            ))}
          </tr>
        </thead>
        {rows.map((row, rowIndex) => {
          return (
            <tbody key={"InfoViewHeader_tbody-" + rowIndex}>
              <tr
                className="regionInfoViewTableRow_Title"
                key={"regionInfoViewTableRow_Title" + rowIndex}
              >
                <td
                  colSpan={headers.length}
                  key={"InfoViewTableRow_Title_TD" + rowIndex}
                >
                  {row[0]}
                </td>
              </tr>
              <tr key={"InfoViewTableRow_RowNames" + rowIndex}>
                {row.map((r, rIndex) =>
                  //First item is row name -> return row name and min/avg/max rows
                  rIndex === 0 ? (
                    <td key={"InfoViewTableRow_" + rowIndex + "_" + rIndex}>
                      <div
                        key={"InfoViewTableRow_div" + rowIndex + "_" + rIndex}
                      >
                        {/* <p> */} {/* {r} <br /> */}
                        {typeof row[1] === "object"
                          ? Object.keys(row[1]).map((key, index) => {
                              return (
                                <p
                                  key={
                                    "InfoViewTableRow_name_p" +
                                    rowIndex +
                                    key +
                                    rIndex +
                                    index
                                  }
                                  style={{ lineHeight: "0" }}
                                >
                                  {key}
                                </p>
                              );
                            })
                          : "määrä"}
                        {/*  </p> */}
                      </div>
                    </td>
                  ) : (
                    // remaining items include data -> loop min, avg, and max values:
                    <td key={"InfoViewTableRow_" + rowIndex + "_" + rIndex}>
                      <div
                        key={"InfoViewTableRow_div" + rowIndex + "_" + rIndex}
                      >
                        {typeof r === "object"
                          ? Object.keys(r).map((key, index) => {
                              return (
                                <p
                                  key={
                                    "InfoViewTableRow_val_p" +
                                    rowIndex +
                                    rIndex +
                                    key +
                                    index
                                  }
                                  style={{ lineHeight: "0" }}
                                >
                                  {r[key]}
                                </p>
                              );
                            })
                          : r}
                      </div>
                    </td>
                  )
                )}
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
