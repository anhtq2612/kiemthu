import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collapse: false,
}
export const collapse = createSlice({
  name: 'collapse',
  initialState,
  reducers: {
    collapseOpen: (state) => {
      state.collapse = false
    },
    collapseClose: (state) => {
      state.collapse = true
    },
  },
})
// Action creators are generated for each case reducer function
export const { collapseOpen, collapseClose } = collapse.actions

export default collapse.reducer
