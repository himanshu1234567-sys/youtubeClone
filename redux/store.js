import { combineReducers, configureStore } from '@reduxjs/toolkit'
import colorSlice from './slice/colorslice'
import videoListSlice from './slice/videoListSlice'

const allReducers = combineReducers({
    colorSlice , 
    videoListSlice

})
export const store = configureStore({
  reducer:allReducers
})