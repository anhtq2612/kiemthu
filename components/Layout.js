import Head from 'next/head'
import React, { useState } from 'react'
import SideBar from './sidebar'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { Popover, Button } from 'antd'
function Layout(props) {
  const [toggleCollapse, setToggleCollapse] = useState(false)

  return (
    <div className="h-screen flex flex-row justify-start">
      <Head>
        <title>Đây là trang Admin</title>
        <meta property="og:title" content="Đây là trang Admin" key="admin" />
      </Head>
      <SideBar setToggleCollapse={setToggleCollapse} toggleCollapse={toggleCollapse} />
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
            <div className="flex justify-between h-full items-center">
              <div>Thông báo</div>
              <div>Thông tin tài khoản</div>
            </div>
          </div>
          <div className="p-4 h-screen mt-16">{props.children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
