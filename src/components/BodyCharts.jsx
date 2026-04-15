import React from "react";
import { useState } from "react";
import PieChartConfig from "./Charts/PieChartConfig";
import ChartsConfig from "./Charts/Config/ChartsConfig";
import BarChartConfig from "./Charts/BarChart";

function BodyCharts() {

  const chartMap = {
  pie: PieChartConfig,
  donnut: PieChartConfig,
  bar: BarChartConfig
};

function RenderChart(chart, titleSize) {
  const Component = chartMap[chart.type];

  if (!Component) return null;

  return (
    <Component
      question={chart.question}
      questionB={chart.questionB}
      title={chart.title}
      titleSize={titleSize}
      type={chart.type}
    />
  );
}
  function ChangeOrder(index) {
    setChartsConfigR((prev) => {
      const newArray = [...prev];

      const temp = newArray[0];
      newArray[0] = newArray[index];
      newArray[index] = temp;

      return newArray;
    });
  }
  const [ChartsConfigR, setChartsConfigR] = useState(ChartsConfig);
  return (
    <div className="container py-3">
      {/* TOP */}
      <div className="row g-3 align-items-stretch">
        {/* PRINCIPAL */}
        {ChartsConfigR[0] && (
          <div className="col-12 col-lg-8">
            <div className="text-white rounded shadow p-3 chart-box big">
              {RenderChart(ChartsConfigR[0], 26)}
            </div>
          </div>
        )}

        {/* LATERAL */}
        <div className="col-12 col-lg-4">
          <div className="row g-3">
            {ChartsConfigR[3] && (
              <div className="col-12">
                <div
                  className="text-white rounded shadow p-3 chart-box-m"
                  onClick={() => ChangeOrder(3)}
                >
                  {RenderChart(ChartsConfigR[3], 16)}
                </div>
              </div>
            )}

            {ChartsConfigR[4] && (
              <div className="col-12">
                <div
                  className="text-white rounded shadow p-3 chart-box-m"
                  onClick={() => ChangeOrder(4)}
                >
                  {RenderChart(ChartsConfigR[4], 16)}
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
            <div
              className="text-white rounded shadow p-3 chart-box"
              onClick={() => ChangeOrder(1)}
            >
              {RenderChart(ChartsConfigR[1], 19)}
            </div>
          </div>
        )}

        {ChartsConfigR[2] && (
          <div className="col-12 col-lg-6 ">
            <div
              className="text-white rounded shadow p-3 chart-box"
              onClick={() => ChangeOrder(2)}
            >
              {RenderChart(ChartsConfigR[2], 19)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BodyCharts;
