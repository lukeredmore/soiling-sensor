/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react"
import "./GraphViewer.scss"

import { TimeSeries } from "pondjs"
import {
  Charts,
  ChartContainer,
  ChartRow,
  YAxis,
  LineChart,
} from "react-timeseries-charts"
import { useSelector } from "react-redux"

export default () => {
  const [open, setOpen] = useState(false)

  const points = useSelector(({ image }) => image.grayscale).sort()
  const series =
    points && points.length > 0
      ? new TimeSeries({
          name: "USD_vs_EURO",
          columns: ["time", "value"],
          points,
        })
      : null

  return (
    <div className="graph-viewer">
      {series ? (
        open ? (
          <>
            <div className="toggle-graph-label" onClick={() => setOpen(false)}>
              Close Graph<i className="material-icons">expand_more</i>
            </div>
            <ChartContainer timeRange={series.range()} format="%b '%y">
              <ChartRow height="150">
                <YAxis
                  id="price"
                  label="Soiling Level"
                  min={series.min()}
                  max={series.max()}
                  width="30"
                  format=".0f"
                  style={{
                    label: {
                      stroke: "none",
                      fill: "#8B7E7E", // Default label color
                      fontWeight: 500,
                      fontSize: 28,
                      font: '"Goudy Bookletter 1911", sans-serif"',
                    },
                    values: {
                      stroke: "none",
                      fill: "#8B7E7E", // Default value color
                      fontWeight: 500,
                      fontSize: 28,
                      font: '"Goudy Bookletter 1911", sans-serif"',
                    },
                    ticks: { fill: "none", stroke: "#C0C0C0" },
                    axis: { fill: "none", stroke: "#C0C0C0" },
                  }}
                />
                <Charts>
                  <LineChart axis="price" series={series} />
                </Charts>
              </ChartRow>
            </ChartContainer>
          </>
        ) : (
          <div className="toggle-graph-label" onClick={() => setOpen(true)}>
            Show Graph<i className="material-icons">chevron_right</i>
          </div>
        )
      ) : null}
    </div>
  )
}
