import { configureStore } from '@reduxjs/toolkit'
import menu from './menuReducer'
import collapse from './reducers'

export const store = configureStore({
  reducer: {
    collapse: collapse,
  },
})
