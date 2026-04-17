import React, { useEffect, useState } from "react";
import sheetsData from "../../axios/config";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function BarChartConfig({
  question,
  questionB,
  title,
  fontSizeDeteminer,
  typs,
  eixoX,
  mainChart,
}) {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([]);
  const totalOpcoes = data.length;

  const COLORS = [
    "#4F46E5",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
  ];

  useEffect(() => {
    sheetsData.get("/1").then((res) => {
      const grouped = {};
      const dynamicKeys = new Set();

      res.data.forEach((item) => {
        const x = String(item[question] || "").trim();
        const y = String(item[questionB] || "").trim();

        if (!x || !y) return;

        if (!grouped[x]) {
          grouped[x] = { name: x };
        }

        grouped[x][y] = (grouped[x][y] || 0) + 1;

        dynamicKeys.add(y);
      });

      setData(Object.values(grouped));
      setKeys([...dynamicKeys]);
    });
  }, [question, questionB]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((acc, p) => acc + p.value, 0);

      return (
        <div
          style={{
            fontSize: "12px",
            background: "#fff",
            padding: "2px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            color: "#000",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold", color: "#000" }}>
            {`${eixoX}: ${payload[0].payload.name}`}
          </p>

          <p style={{ margin: 0, color: "#000" }}>Total de pessoas: {total}</p>

          {payload.map((p, i) => (
            <p key={i} style={{ margin: 0, color: "#000" }}>
              {p.dataKey} /Total: {p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* TITLE */}
      <h3
        style={{
          textAlign: "center",
          color: "black",
          fontSize: fontSizeDeteminer,
        }}
      >
        {title}
      </h3>

      {/* CHART AREA */}
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

            <XAxis
              dataKey="name"
              label={
                mainChart
                  ? {
                      value:eixoX,
                      position: "insideLeft",
                      offset: -60,
                      dy: 12,
                      style: {
                        fontSize: fontSizeDeteminer - 13,
                        fill: "#374151",
                        fontWeight: 500,
                      },
                    }
                  : undefined
              }
            />
            <YAxis
              label={
                mainChart
                  ? {
                      value: "Total de pessoas",
                      angle: -90,
                      offset: 70,
                      dx: -20,
                      position: "insideBottom",
                      style: {
                        fontSize: fontSizeDeteminer - 13,
                        fill: "#374151",
                        fontWeight: 500,
                      },
                    }
                  : undefined
              }
            />
            {mainChart && <Tooltip content={<CustomTooltip />} />}

            <Legend
            iconSize={Math.max(
                  8,
                  fontSizeDeteminer / Math.sqrt(totalOpcoes),
                )}
              wrapperStyle={{
                fontSize: Math.max(
                  8,
                  fontSizeDeteminer / Math.sqrt(totalOpcoes),
                ),
              }}
              formatter={(value) => `${value} ${typs}`}
            />
            {keys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartConfig;
