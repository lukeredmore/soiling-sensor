import { ImageActionTypes } from './image.types'

export const setImageGrayscale = (dateString, grayscaleValue) => ({
  type: ImageActionTypes.SET_GRAYSCALE,
  payload: [dateString, grayscaleValue],
})
