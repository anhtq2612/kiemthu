import React, { useEffect } from 'react'
import Image from 'next/image'
import { HiOutlineMenuAlt2, HiOutlineChevronDown } from 'react-icons/hi'
import { menu } from '../constants/MenuItem'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { collapseClose, collapseOpen, routes } from '../pages/redux/reducers'
function SideBar() {
  const { menuItems, setMenuItems } = menu()
  const router = useRouter()
  const dispatch = useDispatch()
  const toggleCollapse = useSelector((state) => state.collapse.collapse)
  const handleSidebarToggle = () => {
    if (toggleCollapse) {
      dispatch(collapseOpen())
    } else {
      dispatch(collapseClose())
    }
  }

  const changeExpanded = (item, idx) => {
    const _menuItems = [...menuItems]
    _menuItems[idx].expanded = !item.expanded
    setMenuItems(_menuItems)
  }
  return (
    <div
      className={`h-screen fixed pl-4 pt-8 pb-4 bg-gradient-to-t from-purple-700 to-purple-700 flex justify-between flex-col duration-300 transition-all ${
        toggleCollapse ? 'w-20' : 'w-96'
      }`}
    >
      <div className="flex flex-col">
        <button
          onClick={handleSidebarToggle}
          className={`flex pr-4 ${toggleCollapse ? 'justify-center' : 'justify-end'}`}
        >
          <HiOutlineMenuAlt2
            size={20}
            color="white"
            className={`rounded mb-5 ${toggleCollapse && 'rotate-180'} transition-all duration-300`}
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
            <span className={`text-lg font-medium text-purple-100 ${toggleCollapse && 'hidden'}`}>
              Trang tuyển dụng
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start mt-10">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className={`hover:bg-purple-100 hover:text-purple-700 text-purple-100 w-full rounded-l-2xl cursor-pointer ${
                item.path === router.route ? 'bg-purple-100 !text-purple-700' : ''
              }`}
            >
              <div
                className="flex py-2 px-3 items-center w-full h-full"
                onClick={() => {
                  router.push(item.path, undefined, { shallow: true }), dispatch(routes(item.path))
                }}
              >
                <div>{<item.icon size={20} />}</div>
                <span className={`pl-2 ${toggleCollapse && 'hidden'}`}>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
