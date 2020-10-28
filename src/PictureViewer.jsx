import React, { useState, useEffect } from "react"
import { getContinuousDataFromRef, removeAtRef } from "./firebase"
import LoadingSymbol from "./LoadingSymbol"
import PictureModal from "./PictureModal"
import "./PictureViewer.scss"

export default () => {
  const [images, setImages] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const setImagesRef = useState(null)[1]

  useEffect(() => {
    setImagesRef(
      getContinuousDataFromRef("Images", (imagesObject) => {
        if (imagesObject)
          setImages(Object.entries(imagesObject).sort().reverse())
        else {
          setImages({ isEmpty: true })
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
        <div className="pic-container">
          {images.map(([dateString, image], i) => {
            const date = new Date(Number(dateString))
            return (
              <div key={i} className="picture-entry">
                <img
                  src={image}
                  onClick={() =>
                    setSelectedImage({ dateString, image, index: i })
                  }
                />
                <div className="date-label">
                  {date.toLocaleDateString("en-us") +
                    " " +
                    date.toLocaleTimeString("en-us")}
                </div>
                
              </div>
            )
          })}
        </div>
      )}
      {selectedImage && (
        <PictureModal
        onDelete={() => {
          removeAtRef("Images/" + selectedImage.dateString)
          setSelectedImage(null)
        }}
          onBack={() => {
            const index = selectedImage.index - 1
            if (!images[index]) return
            const [dateString, image] = images[index]
            setSelectedImage({ dateString, image, index })
          }}
          onForward={() => {
            const index = selectedImage.index + 1
            if (!images[index]) return
            const [dateString, image] = images[index]
            setSelectedImage({ dateString, image, index })
          }}
          onClose={() => setSelectedImage(null)}
          {...selectedImage}
        />
      )}
    </div>
  )
}
