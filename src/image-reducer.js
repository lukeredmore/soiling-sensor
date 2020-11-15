import { ImageActionTypes } from "./image.types"

const INITIAL_STATE = {
  grayscale: [],
}

const imageReducer = (currentState = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ImageActionTypes.SET_GRAYSCALE:
      return {
        ...currentState,
        grayscale: [...currentState.grayscale, payload],
      }
    default:
      return currentState
  }
}

export default imageReducer
