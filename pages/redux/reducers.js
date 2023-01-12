import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collapse: false,
  listCoffee: [],
  route: '/customer',
  account: {}
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
      state.route = action.payload
    },
    accountInfo: (state, action) => {
      state.account = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { collapseOpen, collapseClose, productList, routes, accountInfo } = collapse.actions

export default collapse.reducer
