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

function BestCompareChart({ question, questionB, title, titleSize }) {
  const [data, setData] = useState([]);
  const [keys, setKeys] = useState([])

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
  sheetsData.get('/1').then(res => {

    const grouped = {}
    const dynamicKeys = new Set()

    res.data.forEach(item => {
      const x = String(item[question] || '').trim()
      const y = String(item[questionB] || '').trim()

      if (!x || !y) return

      if (!grouped[x]) {
        grouped[x] = { name: x }
      }

      grouped[x][y] = (grouped[x][y] || 0) + 1

      dynamicKeys.add(y)
    })

    setData(Object.values(grouped))
    setKeys([...dynamicKeys])

  })
}, [question, questionB])

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
            {payload[0].payload.name}
          </p>

          <p style={{ margin: 0, color: "#000" }}>Total: {total}</p>

          {payload.map((p, i) => (
            <p key={i} style={{ margin: 0, color: "#000" }}>
              {p.dataKey}: {p.value}
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
          fontSize: titleSize,
        }}
      >
        {title}
      </h3>

      {/* CHART AREA */}
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

            <XAxis label={{ 
    value: "Total de pessoas", 
    angle: -90, 
    position: "insideLeft" ,
    offset: -40,
    style: {
      fontSize: 11,
      fill: "#374151",   // cinza escuro (melhor que preto puro)
      fontWeight: 500    // mantém legibilidade
    }
  }} dataKey="name" />
            <YAxis />

            <Tooltip content={<CustomTooltip />} />

            <Legend />
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

export default BestCompareChart;
