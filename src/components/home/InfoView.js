import { useState, useEffect } from "react";

export default function InfoView({ name, data, width }) {
  console.log("Grid");
  console.log(data);

  return (
    <div style={{ width: width }}>
      {name}
      <br />
      Dataa....
      <br />
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
