export default function Grid({ data, width, onClick }) {
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
              Myydyt: {e.data.kaikki.tapahtumatYht} kpl
            </span>{" "}
            <br />
            <span style={{ pointerEvents: "none" }}>
              {" "}
              Keskihinta:{" "}
              {typeof e.data.kaikki.hintaPerNelio.avg !== "number"
                ? "-"
                : e.data.kaikki.hintaPerNelio.avg.toFixed(0)}{" "}
              €/m2
            </span>{" "}
            <br />
            <span style={{ pointerEvents: "none" }}>
              {" "}
              Keskikoko:{" "}
              {typeof e.data.kaikki.pintaAla.avg !== "number"
                ? "-"
                : e.data.kaikki.pintaAla.avg.toFixed(0)}
              m2
            </span>{" "}
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}
