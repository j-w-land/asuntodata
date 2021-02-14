import { ResponsiveLine } from "@nivo/line";

export default function Line({ data }) {
  console.log("LINE_DATA");
  console.log(data);
  if (data === null) return null;
  const legendFormater = (d) => {
    console.log(d);
    console.log("xx");
    console.log("legendFormater");
  };

  return (
    <div>
      <div style={{ height: "450px" }}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          onClick={(node) => {
            console.log(node);
            console.log("CLICKEd");
          }}
          tooltip={({ point }) => {
            console.log(point);
            console.log("TOOLTIP");
            return (
              <div
                style={{
                  background: "white",
                  padding: "9px 12px",
                  border: "1px solid #ccc",
                  fontSize: "0.85rem",
                }}
              >
                <div style={{}}>
                  <div
                    style={{
                      color: point.serieColor,
                      padding: "3px 0",
                      display: "inline-block",
                    }}
                  >
                    <span
                      style={{
                        height: "10px",
                        width: "10px",
                        backgroundColor: point.serieColor,
                        borderRadius: "50%",
                        display: "inline-block",
                        marginRight: "5px",
                      }}
                    ></span>
                    <strong>{point.serieId}</strong>
                  </div>
                  <div style={{ display: "inline-block" }}>
                    {"  "}[{point.data.xFormatted}]
                  </div>
                </div>
                <div> {point.data.yFormatted} €/m2 </div>
              </div>
            );
            return (
              <div>
                <p>
                  {point.serieId} ({point.data.xFormatted})
                </p>
                <p>{point.data.yFormatted} €/m2</p>
              </div>
            );
          }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "year",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "€/m2",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legendFormat={legendFormater}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              //onClick: legendOnClick,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
      <div style={{ textAlign: "left" }}>
        <span>Lähde: tilastokeskus</span>
      </div>
    </div>
  );
}
