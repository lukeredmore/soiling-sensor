/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react"
import DukeWordmark from "./duke-wordmark.svg"
import { getContinuousDataFromRef, writeToRef } from "./firebase"

import "./Header.scss"
export default () => {
  const [shutterOpen, setShutterOpen] = useState(null)
  const setShutterOpenRef = useState(null)[1]

  useEffect(() => {
    setShutterOpenRef(
      getContinuousDataFromRef("ShutterOpen", (val) => {
        setShutterOpen(val)
      })
    )
    return () => setShutterOpenRef(null)
  }, [])

  return (
    <div className="header">
      <img src={DukeWordmark} alt="Duke" />
      {shutterOpen === null ? null : shutterOpen === 0 ? (
        <span
          className="capture-button"
          onClick={() => {
            writeToRef("ShutterOpen", new Date().getTime())
          }}
        >
          Capture <i className="material-icons">photo_camera</i>{" "}
        </span>
      ) : (
        "Capturing..."
      )}
      <span className="title">Soiling Sensor Images</span>
    </div>
  )
}
