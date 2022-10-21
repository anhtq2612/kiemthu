import { configureStore } from '@reduxjs/toolkit'
import collapse from './reducers'

export const store = configureStore({
  reducer: {
    collapse: collapse,
  },
})
