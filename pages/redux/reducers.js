import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collapse: false,
  listCoffee: [],
  route: '/customer'
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
    productList: (state, action) => {
      state.listCoffee = action.payload
    },
    routes: (state, action) => {
      console.log(action);
      state.route = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { collapseOpen, collapseClose, productList, routes } = collapse.actions

export default collapse.reducer
