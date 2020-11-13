import React, { useEffect, useRef, useState } from 'react'
import FastAverageColor from "fast-average-color"

import './PictureThumbnail.scss'

export default ({image, dateString, onClick, index}) => {
     const [color, setColor] = useState(null)

    const imageRef = useRef()
    useEffect(() => {
      if (!imageRef.current) return
        const fac = new FastAverageColor()
        const colorData = fac.getColor(imageRef.current)
        setColor(colorData)
    }, [imageRef])

    const date = new Date(Number(dateString))
    return (
      <div className="picture-thumbnail">
        <img
          ref={imageRef}
          src={Object.values(image).join("")}
          onClick={() => onClick({ dateString, image, index })}
        />
        <div className="date-label">
          {date.toLocaleDateString("en-us") +
            " " +
            date.toLocaleTimeString("en-us")}
        </div>
        <div className="average-grey-label">
          {"Average Grayscale Value: " +
            JSON.stringify(color?.value[0])}
        </div>
      </div>
    )
}