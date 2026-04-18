import React, { useMemo } from 'react'
import { useSheetData } from '../../hooks/useSheetData'
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const COLOR_PALETTES = {
  default:      ['#4F46E5','#EF4444','#10B981','#F59E0B','#8B5CF6','#0D9488','#EC4899'],
  Tritanopia:   ['#D55E00','#E69F00','#009E73','#56B4E9','#CC79A7','#F0E442'],
  Deuteranopia: ['#0072B2','#D55E00','#009E73','#F0E442','#CC79A7','#56B4E9'],
  Protanopia:   ['#0072B2','#009E73','#56B4E9','#F0E442','#E69F00','#CC79A7'],
}

function sortByOrder(arr, orderList) {
  if (!orderList) return arr
  return [...arr].sort((a, b) => {
    const ia = orderList.indexOf(a)
    const ib = orderList.indexOf(b)

    if (ia !== -1 && ib !== -1) return ia - ib
    if (ia === -1 && ib === -1) return a.localeCompare(b)
    if (ia === -1) return 1
    return -1
  })
}

function ScatterChartConfig({ questionX, questionY, groupBy, title, titleSize, isMain, orderX, orderY, order}) {
  const { data, loading, cores, keyMap } = useSheetData()
  const COLORS = COLOR_PALETTES[cores] || COLOR_PALETTES.default

  const realX       = keyMap[questionX]  ?? questionX
  const realY       = keyMap[questionY]  ?? questionY
  const realGroupBy = groupBy ? (keyMap[groupBy] ?? groupBy) : null

  const groups = useMemo(() => {
    const result = {}

    data.forEach(item => {
      const rawX  = (item[realX] || '').trim()
      const rawY  = (item[realY] || '').trim()
      const group = realGroupBy
        ? (item[realGroupBy] || 'Outros').trim()
        : 'Todos'

      const x = parseFloat(rawX)
      const y = parseFloat(rawY)

      // fallback: tenta índice da ordem se não for número
      const finalX = isNaN(x)
        ? (orderX ? orderX.indexOf(rawX) : NaN)
        : x

      const finalY = isNaN(y)
        ? (orderY ? orderY.indexOf(rawY) : NaN)
        : y

      if (isNaN(finalX) || isNaN(finalY)) return

      if (!result[group]) result[group] = []

      result[group].push({
        x: finalX,
        y: finalY,
        labelX: rawX,
        labelY: rawY
      })
    })

    // ordena grupos (caso tenha order no config)
    const sortedGroups = sortByOrder(Object.keys(result), order)

    const sortedResult = {}
    sortedGroups.forEach(g => {
      sortedResult[g] = result[g]
    })

    return sortedResult
  }, [data, realX, realY, realGroupBy, orderX, orderY, order])

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    const d = payload[0].payload
    return (
      <div style={{ background: '#fff', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: 12, color: '#000' }}>
        <p style={{ margin: 0 }}><strong>{d.labelX}</strong></p>
        <p style={{ margin: 0 }}>{d.labelY}</p>
      </div>
    )
  }

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b' }}>
      Carregando...
    </div>
  )

  const labelX = realX ? realX.replace(/^[^\?]+\??\s*/, '').slice(0, 35) || questionX : questionX
  const labelY = realY ? realY.replace(/^[^\?]+\??\s*/, '').slice(0, 25) || questionY : questionY

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', color: 'black', fontSize: titleSize, margin: '0 0 4px' }}>{title}</h3>
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis type="number" dataKey="x" tickCount={6}
              label={{ value: labelX, position: 'insideBottom', offset: -10, style: { fontSize: 9 } }} />
            <YAxis type="number" dataKey="y" tickCount={6}
              label={{ value: labelY, angle: -90, position: 'insideLeft', style: { fontSize: 9 } }} />
            {isMain && <Tooltip content={<CustomTooltip />} />}
            {isMain && <Legend verticalAlign="top" wrapperStyle={{ fontSize: titleSize - 8 }} />}
            {Object.entries(groups).map(([name, points], i) => (
              <Scatter key={name} name={name} data={points}
                fill={COLORS[i % COLORS.length]} opacity={0.75} />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ScatterChartConfig