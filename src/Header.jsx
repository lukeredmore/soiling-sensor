import React from "react"
import DukeWordmark from "./duke-wordmark.svg"
import { writeToRef } from "./firebase"

import "./Header.scss"
export default () => (
  <div className="header">
    <img src={DukeWordmark} />
    <span className='capture-button' onClick={() => {
        writeToRef('ShutterOpen', true)
        setTimeout(() => {
            writeToRef('ShutterOpen', false)
        }, 2000)
    }}>Capture <i className="material-icons">photo_camera</i> </span>
    <span className='title'>Soiling Sensor Images</span>
  </div>
)
