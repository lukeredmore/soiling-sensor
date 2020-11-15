/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useRef } from "react"
import FastAverageColor from "fast-average-color"

import "./PictureThumbnail.scss"
import { useDispatch, useSelector } from "react-redux"
import { setImageGrayscale } from "./image.actions"

export default ({ image, dateString, onClick, index }) => {
  const colorObj = useSelector(({ image }) =>
    image?.grayscale?.find(([dateStringKey]) => dateString === dateStringKey)
  )

  const dispatch = useDispatch()
  const imageRef = useRef()
  useEffect(() => {
    if (!imageRef.current) return
    const fac = new FastAverageColor()
    const colorData = fac.getColor(imageRef.current)
    dispatch(setImageGrayscale(dateString, colorData?.value[0]))
  }, [imageRef])

  const date = new Date(Number(dateString))
  return (
    <div className="picture-thumbnail">
      <img
        alt="Soiling"
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
        {colorObj ? "Average Grayscale Value: " + colorObj[1] : "Loading..."}
      </div>
    </div>
  )
}
