import { createSlice } from '@reduxjs/toolkit'
import { HiViewGrid, HiUserGroup, HiViewList, HiCurrencyPound, HiDownload, HiCurrencyYen, HiOutlinePhoneIncoming } from 'react-icons/hi'

const initialState = {
  menuItems: [
    {
      title: 'Quản lý nhân viên',
      icon: HiUserGroup,
      path: '/customer',
    },
    {
      title: 'Doanh thu',
      icon: HiCurrencyPound,
      path: '/doanh-thu',
    },
    {
      title: 'Bàn',
      icon: HiViewGrid,
      path: '/ban',
    },
    {
      title: 'Danh sách sản phẩm',
      icon: HiViewList,
      path: '/products',
    },
    {
      title: 'Test',
      icon: HiDownload,
      path: '/anchor',
    },
    // {
    //   title: 'Quản lý hàng',
    //   expanded: false,
    //   icon: HiDownload,
    //   subMenu: [
    //     {
    //       title: 'Quản lý nhập kho',
    //       icon: HiCurrencyYen,
    //       path: '/warehouse-import',
    //     },
    //     {
    //       title: 'Quản lý xuất kho',
    //       icon: HiOutlinePhoneIncoming,
    //       path: '/warehouse-export',
    //     },
    //     {
    //       title: 'Quản lý tồn kho',
    //       icon: HiUserGroup,
    //       path: '/warehouse-manager',
    //     },
    //   ]
    // }
  ],
}
export const menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    changeMenu: (state, action) => {
      state.menuItems = [...action.payload]
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeMenu } = menu.actions

export default menu.reducer
