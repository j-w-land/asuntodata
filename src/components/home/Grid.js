export default function Grid({ data, width, onClick }) {
  return (
    <div style={{ width: width }}>
      <ul className="flex-container">
        {console.log("GRID_data")}
        {console.log(data)}

        {data
          .sort(function (a, b) {
            console.log(a.data.kaikki.hintaPerNelio.avgNum);
            return (
              b.data.kaikki.hintaPerNelio.avgNum -
              a.data.kaikki.hintaPerNelio.avgNum
            );
          })
          .map((e) => (
            <div
              onClick={onClick}
              className={"flex-item-home"}
              //className={e.place}
              //className={"flex-item-home"}
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
                Keskihinta: {e.data.kaikki.hintaPerNelio.avg}/m2
              </span>{" "}
              <br />
              <span style={{ pointerEvents: "none" }}>
                {" "}
                Keskikoko: {e.data.kaikki.pintaAla.avg}
                m2
              </span>{" "}
              <br />
            </div>
          ))}
      </ul>
    </div>
  );
}
