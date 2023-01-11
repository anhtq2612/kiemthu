import { useState } from 'react'
import {
  HiViewGrid,
  HiUserGroup,
  HiViewList,
  HiCurrencyPound,
  HiDownload,
  HiCurrencyYen,
  HiOutlinePhoneIncoming,
  HiClipboardList,
  HiDocument,
} from 'react-icons/hi'
import { FaBloggerB } from 'react-icons/fa'
export const menu = () => {
  const [menuItems, setMenuItems] = useState([
    // {
    //   title: 'Quản lý nhân viên',
    //   icon: HiUserGroup,
    //   path: '/customer',
    // },
    {
      title: 'Quản lý tài khoản',
      icon: HiUserGroup,
      path: '/account',
    },
    // {
    //   title: 'Doanh thu',
    //   icon: HiCurrencyPound,
    //   path: '/doanh-thu',
    // },
    // {
    //   title: 'Bàn',
    //   icon: HiViewGrid,
    //   path: '/ban',
    // },
    // {
    //   title: 'Danh sách sản phẩm',
    //   icon: HiViewList,
    //   path: '/products',
    // },
    {
      title: 'Quản lý JOB',
      icon: HiClipboardList,
      path: '/list-jobs',
    },
    {
      title: 'Quản lý Blog',
      icon: FaBloggerB,
      path: '/blog',
    },
    {
      title: 'Quản lý CV',
      icon: HiDocument,
      path: '/list-cv',
    },
    // {
    //   title: 'Test',
    //   icon: HiDownload,
    //   path: '/anchor',
    // },
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
  ])
  return {
    menuItems,
    setMenuItems,
  }
}
