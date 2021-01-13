import { useState, useEffect } from "react";

export default function Grid({ data, width, onClick }) {
  console.log("Grid");
  console.log(data);

  return (
    <div style={{ width: width }}>
      <ul className="flex-container">
        {data.map((e) => (
          <div
            onClick={onClick}
            className="flex-item-home"
            key={e.place}
            id={e.place}
            style={{ cursor: "pointer" }}
          >
            <span style={{ pointerEvents: "none" }} className="title">
              {" "}
              {e.place}
            </span>
            <br />
            <span style={{ pointerEvents: "none" }}>
              {" "}
              Myydyt: {e.data.tapahtumatYht} kpl
            </span>{" "}
            <br />
            <span style={{ pointerEvents: "none" }}>
              {" "}
              Keskihinta:{" "}
              {typeof e.data.hintaPerNelio.avg !== "number"
                ? "-"
                : e.data.hintaPerNelio.avg.toFixed(0)}{" "}
              €/m2
            </span>{" "}
            <br />
            <span style={{ pointerEvents: "none" }}>
              {" "}
              Keskikoko:{" "}
              {typeof e.data.pintaAla.avg !== "number"
                ? "-"
                : e.data.pintaAla.avg.toFixed(0)}
              m2
            </span>{" "}
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}
