import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { HiOutlineMenuAlt2, HiOutlineMenu } from 'react-icons/hi'
import { menuItems } from '../constants/MenuItem'
import Link from 'next/link'
import { useRouter } from 'next/router'
function SideBar({ toggleCollapse, setToggleCollapse }) {
  const router = useRouter()
  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse)
  }

  const activeMenu = useMemo(
    () => menuItems.find((e) => e.path === router.pathname),
    [router.pathname]
  )

  return (
    <div
      style={{ transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1) 0s' }}
      className={`h-screen fixed px-4 pt-8 pb-4 bg-gradient-to-t from-orange-300 to-orange-500 flex justify-between flex-col ${
        toggleCollapse ? 'w-20' : 'w-80'
      }`}
    >
      <div className="flex flex-col">
        <button
          onClick={handleSidebarToggle}
          className={`flex ${toggleCollapse ? 'justify-center' : 'justify-end'}`}
        >
          <HiOutlineMenuAlt2
            size={20}
            className={`rounded mb-5 ${toggleCollapse && 'rotate-180'}`}
          />
        </button>
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <Image
              alt=""
              className="rounded-xl"
              height={40}
              width={40}
              src="data:image/png;base64,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"
            />
            <span className={`text-lg font-medium text-text ${toggleCollapse && 'hidden'}`}>
              Logo
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start mt-10">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className={`hover:bg-gray-200 w-full rounded-lg ${
                activeMenu?.path === item.path && 'bg-gray-400'
              }`}
            >
              <Link href={item.path}>
                <a className="flex py-2 px-3 items-center w-full h-full">
                  <div>{<item.icon size={20} color="black" />}</div>
                  <span className={`pl-2 text-black ${toggleCollapse && 'hidden'}`}>
                    {item.title}
                  </span>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
