import React from 'react'
import { useState } from 'react'
import PieChartConfig from './Charts/PieChartConfig'
import ChartsConfig from './Charts/Config/ChartsConfig'

function BodyCharts() {
function ChangeOrder(index) {
  setChartsConfigR(prev => {
    const newArray = [...prev]

    const temp = newArray[0]
    newArray[0] = newArray[index]
    newArray[index] = temp

    return newArray
  })
}
   const [ChartsConfigR,setChartsConfigR] = useState(ChartsConfig)
  return (
    <div className="container py-3">

      {/* TOP */}
      <div className="row g-3 align-items-stretch">

        {/* PRINCIPAL */}
        {ChartsConfigR[0] && (
          <div className="col-12 col-lg-8">
            <div className="text-white rounded shadow p-3 chart-box big">
              <PieChartConfig
                question={ChartsConfigR[0].question}
                title={ChartsConfigR[0].title}
                titleSize={26}
              />
            </div>
          </div>
        )}

        {/* LATERAL */}
        <div className="col-12 col-lg-4">
          <div className="row g-3">

            {ChartsConfigR[3] && (
              <div className="col-12">
                <div className="text-white rounded shadow p-3 chart-box-m" onClick={() => ChangeOrder(3)}>
                  <PieChartConfig
                    question={ChartsConfigR[3].question}
                    title={ChartsConfigR[3].title}
                    titleSize={16}
                  />
                </div>
              </div>
            )}

            {ChartsConfigR[4] && (
              <div className="col-12">
                <div className="text-white rounded shadow p-3 chart-box-m"onClick={() => ChangeOrder(4)}>
                  <PieChartConfig
                    question={ChartsConfigR[3].question}
                    title={ChartsConfigR[3].title}
                    titleSize={16}
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="row g-3 mt-3 ">

        {ChartsConfigR[1] && (
          <div className="col-12 col-lg-6">
            <div className="text-white rounded shadow p-3 chart-box" onClick={() => ChangeOrder(1)}>
              <PieChartConfig
                question={ChartsConfigR[1].question}
                title={ChartsConfigR[1].title}
                titleSize={19}
              />
            </div>
          </div>
        )}

        {ChartsConfigR[2] && (
          <div className="col-12 col-lg-6 ">
            <div className="text-white rounded shadow p-3 chart-box" onClick={() => ChangeOrder(2)}>
              <PieChartConfig
                question={ChartsConfigR[2].question}
                title={ChartsConfigR[2].title}
                titleSize={19}
              />
            </div>
          </div>
        )}

      </div>

    </div>
  )
}

export default BodyCharts