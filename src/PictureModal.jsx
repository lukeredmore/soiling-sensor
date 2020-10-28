import React, { useEffect } from "react"
import { Modal, ModalBody } from "shards-react"
import "./PictureModal.scss"
import { useKeyPress } from "./hooks"
import "bootstrap/dist/css/bootstrap.min.css"
import "shards-ui/dist/css/shards.min.css"

export default ({
  dateString,
  image,
  onClose,
  onBack,
  onForward,
  onDelete,
}) => {
  const leftArrow = useKeyPress("ArrowLeft")
  const rightArrow = useKeyPress("ArrowRight")
  const escape = useKeyPress("Escape")

  useEffect(() => {
    if (leftArrow) onBack()
  }, [leftArrow])
  useEffect(() => {
    if (rightArrow) onForward()
  }, [rightArrow])
  useEffect(() => {
    if (escape) onClose()
  }, [escape])

  const date = new Date(Number(dateString))

  return (
    <div className="picture-modal">
      <Modal open toggle={onClose}>
        <ModalBody>
          <i className="material-icons close-icon" onClick={onClose}>
            close
          </i>
          <i className="material-icons back-icon" onClick={onBack}>
            arrow_back_ios
          </i>
          <i className="material-icons forward-icon" onClick={onForward}>
            arrow_forward_ios
          </i>
          <img src={image} />
          <div className="date-label">
            {date.toLocaleDateString("en-us") +
              " " +
              date.toLocaleTimeString("en-us")}
            <i
              className="material-icons delete-icon"
              title="Delete image"
              onClick={onDelete}
            >
              delete
            </i>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}
