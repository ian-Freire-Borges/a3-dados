import React, { useEffect, useState } from 'react'
import sheetsData from '../../axios/config'
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  Sector,
  ResponsiveContainer
} from 'recharts'

function PieChartConfig({question,title, titleSize,type}) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [data, setData] = useState([])
  const donut = type === "donnut" ? 30 : undefined

  const COLORS = [
  '#2563EB', // azul
  '#DC2626', // vermelho
  '#16A34A', // verde
  '#F59E0B', // amarelo
  '#7C3AED', // roxo
  '#0D9488', // teal
  '#EA580C', // laranja
  '#4B5563', // cinza escuro
  '#DB2777', // rosa
  '#65A30D', // verde oliva
  '#0891B2', // azul petróleo
  '#BE123C', // vinho
  '#9333EA', // violeta
  '#CA8A04'  // dourado
]

  useEffect(() => {
  sheetsData.get('/1')
    .then(res => {
      const counts = {}

      res.data.forEach(item => {
        const value = item[question]
        if (!value) return

        counts[value] = (counts[value] || 0) + 1
      })

      const formatted = Object.keys(counts).map(key => ({
        name: key,
        value: counts[key]
      }))

      setData(formatted)
    })
}, [question])

  const renderLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props

    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55

    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    const totalOpcoes = data.length

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: Math.max(5, titleSize / Math.sqrt(totalOpcoes)),
          fontWeight: 700,
          pointerEvents: 'none'
        }}
      >
        {(percent * 100).toFixed(0)}%
      </text>
    )
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const total = data.reduce((acc, item) => acc + item.value, 0)
      const value = payload[0].value
      const percent = total ? ((value / total) * 100).toFixed(1) : 0

      return (
        <div  className="text-dark"style={{
          background: '#fff',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          
        
          
        }}>
           <p style={{ margin: 0 }}><strong>{payload[0].name}</strong></p>
        <p style={{ margin: 0 }}>Total: {value}</p>
        <p style={{ margin: 0 }}>{percent}%</p>
        </div>
      )
    }
    return null
  }

return (
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  }}>

    
    <h3 style={{
      textAlign: 'center',
      color: 'black',
      fontSize: titleSize
      
    }}>
      {title}
    </h3>

    {/* 📊 GRÁFICO OCUPA RESTO DO ESPAÇO */}
    <div style={{ flex: 1 }}>

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius="80%"
            innerRadius={donut}
            activeIndex={activeIndex}
            animationDuration={400}
            isAnimationActive={true}

            label={renderLabel}
            labelLine={false}

            activeShape={(props) => (
              <g>
                <Sector
                  {...props}
                  outerRadius={props.outerRadius + 8}
                />
              </g>
            )}

            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
             wrapperStyle={{ fontSize: titleSize - 8 }}
          />

        </PieChart>

      </ResponsiveContainer>

    </div>
  </div>
)
}

export default PieChartConfig