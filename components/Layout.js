import Head from 'next/head'
import React, { useState } from 'react'
import SideBar from './sidebar'
import { AiOutlineUser } from 'react-icons/ai'
import { Popover, Button } from 'antd'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
function Layout(props) {
  const toggleCollapse = useSelector((state) => state.collapse.collapse)
  const router = useRouter()
  return (
    <div className="h-screen flex flex-row justify-start">
      <Head>
        <title>Tuyển dụng IT</title>
        <meta property="og:title" content="Đây là trang Admin" key="admin" />
      </Head>
      <SideBar />
      <div
        className={`bg-white flex-1 text-black border-1 border-dashed absolute duration-300 transition-all ${
          toggleCollapse ? 'left-20' : 'left-96'
        }`}
        style={{ width: toggleCollapse ? 'calc(100% - 80px)' : 'calc(100% - 24rem)' }}
      >
        <div
          className="h-16 bg-white w-full top-0 shadow-lg"
          style={{ width: toggleCollapse ? 'calc(100% - 80px)' : 'calc(100% - 24rem)' }}
        >
          <div className="flex justify-between h-full items-center pl-4 pr-6">
            <p>Hi ! Chào mừng bạn đến với web tuyển dụng IT</p>
            <Popover
              placement="bottomRight"
              trigger="click"
              title={false}
              content={() => (
                <div className="w-40">
                  <div className="hover-content-popover">
                    <p className="p-2 pl-3" onClick={() => router.push('/infoAccount')}>
                      Thông tin tài khoản
                    </p>
                  </div>
                  <Link href="/login">
                    <div className="hover-content-popover">
                      <p className="p-2 pl-3">
                        <a>Đăng xuất</a>
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            >
              <div className="rounded-full border-2 border-gray-700">
                <AiOutlineUser size={20} />
              </div>
            </Popover>
          </div>
        </div>
        <div className="p-4 overflow-auto">{props.children}</div>
      </div>
    </div>
  )
}

export default Layout
