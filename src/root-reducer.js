import { combineReducers } from "redux"
import imageReducer from "./image-reducer"

export default combineReducers({
  image: imageReducer
})
