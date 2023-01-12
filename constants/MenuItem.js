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
import { useSelector } from 'react-redux'
export const menu = () => {
  const accountType = useSelector((state) => state.collapse.account)
  const [menuItems, setMenuItems] = useState(accountType.userType === 'admin' || accountType.userType === 'company' ? [
    {
      title: 'Quản lý tài khoản',
      icon: HiUserGroup,
      path: '/accounts',
    },
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
  ] : [
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
  ])
  return {
    menuItems,
    setMenuItems,
  }
}
