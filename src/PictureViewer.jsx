import React, { useState, useEffect } from "react"
import { Row, Col } from "shards-react"
import {
  getContinuousDataFromRef,
  getDataFromRef,
  removeAtRef,
} from "./firebase"
import LoadingSymbol from "./LoadingSymbol"
import "./PictureViewer.scss"

export default () => {
  const [images, setImages] = useState(null)
  const setImagesRef = useState(null)[1]

  useEffect(() => {
    setImagesRef(
      getContinuousDataFromRef("Images", (imagesObject) => {
        if (imagesObject) setImages(Object.entries(imagesObject).sort())
        else {
          setImages({isEmpty: true})
        }
      })
    )
    return () => setImagesRef(null)
  }, [])

  return (
    <div className="picture-viewer">
      {images === null ? (
        <LoadingSymbol />
      ) : images.isEmpty ? (
        <div>No images found</div>
      ) : (
        <Row>
          {images.map(([dateString, image]) => {
            const date = new Date(Number(dateString))
            return (
              <Col md="3" lg="2" className="picture-entry">
                <img src={image} />
                <div className="date-label">
                  {date.toLocaleDateString("en-us") +
                    " " +
                    date.toLocaleTimeString("en-us")}
                </div>
                <i
                  className="material-icons delete-icon"
                  onClick={() => {
                    removeAtRef("Images/" + dateString)
                  }}
                >
                  delete
                </i>
              </Col>
            )
          })}
        </Row>
      )}
    </div>
  )
}
