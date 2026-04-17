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

function PieChartConfig({ question, title, fontSizeDeteminer, type,typs,mainChart}) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [data, setData] = useState([])

  const donut = type === "donnut" ? 20 : undefined

  const [page, setPage] = useState(0)
  const ITEMS_PER_PAGE = 6
  const start = page * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  const COLORS = [
    '#2563EB','#DC2626','#16A34A','#F59E0B','#7C3AED',
    '#0D9488','#EA580C','#4B5563','#DB2777','#65A30D',
    '#0891B2','#BE123C','#9333EA','#CA8A04'
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

  const totalOpcoes = data.length

  const renderLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props

    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55

    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
     if (!mainChart && totalOpcoes >= 8) return null;
    return (
      
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: Math.max(8, fontSizeDeteminer / Math.sqrt(totalOpcoes)),
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
        <div style={{
          background: '#fff',
          padding: '10px',
          border: '1px solid #fff6f6',
          borderRadius: '8px',
          color:'black'
        }}>
          <p style={{ margin: 0 }}><strong>{`${typs} ${payload[0].name}`}</strong></p>
          <p style={{ margin: 0 }}>Total de pessoas: {value}</p>
          <p style={{ margin: 0 }}>{percent}%</p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }) => {
    const paginated = payload.slice(start, end)
    const hasNext = end < payload.length
    const hasPrev = page > 0

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        
        {paginated.map((entry, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: entry.color,
                marginRight: 8
              }}
            />
            <span style={{
              color: '#000',
              maxWidth: 100,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {entry.value}
            </span>
          </div>
        ))}

        {(hasNext || hasPrev) && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            marginTop: 6
          }}>
            
            {hasPrev && (
              <div
                onClick={() => setPage(p => Math.max(p - 1, 0))}
                style={{
                  width: 10,
                  height: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  userSelect: 'none',
                  color: '#000'
                }}
              >
                ↑
              </div>
            )}

            {hasNext && (
              <div
                onClick={() => setPage(p => p + 1)}
                style={{
                  width: 10,
                  height: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 10,
                  userSelect: 'none',
                  color: '#000'
                }}
              >
                ↓
              </div>
            )}

          </div>
        )}

      </div>
    )
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
        fontSize: fontSizeDeteminer
      }}>
        {title}
      </h3>

      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart style={{ position: 'relative' }}>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius="80%"
              innerRadius={donut}
              activeIndex={activeIndex}
              animationDuration={400}
              label={renderLabel}
              labelLine={false}
              activeShape={(props) => (
                <g>
                  <Sector {...props} outerRadius={props.outerRadius + 8} />
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

            {mainChart &&<Tooltip content={<CustomTooltip />} />}

            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              content={<CustomLegend />}
              wrapperStyle={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 150,
                fontSize: Math.max(12, fontSizeDeteminer / Math.sqrt(totalOpcoes)),
                background: '#fff',
                padding: '8px',
                borderRadius: 8,
                boxShadow: '0 0 5px rgba(0,0,0,0.1)'
              }}
            />

          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PieChartConfig