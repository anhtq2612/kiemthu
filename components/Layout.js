import Head from 'next/head'
import React, { useState } from 'react'
import SideBar from './sidebar'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { Popover, Button } from 'antd'
import { useSelector } from 'react-redux'
function Layout(props) {
  const toggleCollapse = useSelector((state) => state.collapse.collapse)

  return (
    <div className="h-screen flex flex-row justify-start">
      <Head>
        <title>Đây là trang Admin</title>
        <meta property="og:title" content="Đây là trang Admin" key="admin" />
      </Head>
      <SideBar />
      <div
        className={`bg-white flex-1 text-black border-1 border-dashed absolute ${
          toggleCollapse ? 'left-20' : 'left-80'
        }`}
        style={{ width: toggleCollapse ? 'calc(100% - 80px)' : 'calc(100% - 320px)' }}
      >
        <div>
          <div
            className="h-16 bg-white fixed top-0 shadow-lg"
            style={{ width: toggleCollapse ? 'calc(100% - 80px)' : 'calc(100% - 320px)' }}
          >
            <div className="flex justify-between h-full items-center px-4">
              <p>Thông báo hôm nay là ngày 21/10</p>
              <p>Thông tin tài khoản</p>
            </div>
          </div>
          <div className="p-4 h-screen mt-16">{props.children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
