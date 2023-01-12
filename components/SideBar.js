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
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAYFBMVEVJbqr///93kr+uv9eRp8qkt9Xo7fRUd6+OpcqywdnS2+qCm8XG0uSvv9r09vq6yN9ribqZrs9ggLXd5O/N1+fX3+xOcqxKbqvo7PSGnsV7lsBohrjAzeJph7jR2upWeK+Ipp2vAAAEI0lEQVR4nO3d63KbMBCGYZuYQ8CAEyc0p6b3f5d1c5gJAqTVepEW9Xv/dgbzFHN2pN0+kXaxV0AqQLQFiLYA0RYg2gJEW4BoywNS1HneZMFq8rwuxCFF25S7CJVNS8RQIF1/ioH47tR3IpCiirItflZW7s3ignRVbMVnlWurOCBt9K3xXdleASmy2Kv/s8z6/bJBjmo2x2flkQfJY6/4tJwDUbKXj6v8ISodFskSRKljWbIAuYu9vsvd+UD62Gtrq6dDzsqOu+PKMxkS9RrR3YkKUXgCGTd3OpmBFLHX093MxcoMRNUF1nwZBVLHXktKNQGy8gb5NQxlOQxXLmW6SSaQ1faQ4a59eBx9ubviXL8f2wNnaZO9ZAJZ55x+up09+H+tA6PJ+X0CWeFcONw+LSuYkNIFOUordkPrvN3mZN5kmRDxq95n97Mc1nLNq2ATci/LKN+djH3HWvK9HSJ8zHqhPFrjQczjlgGR3UUOFAf3P8/YSQyI6PXiwi2Q2RNv6caVowFpBB3PNAcX0lghgtcnr9R3Amfe8o2rFAMid9AqH4gO7lWqcdgyIGIO6g7Ch5hrvhKE/MXSDnkjO3RDXukO3RDHy4xRD4ohJemU/hX3aiIExDhZbRfi883avymGWI+93eM47s11AIh5r/AD8XbIXodx3E8JAJl5fvbZ+UXmAz4KAFm67i1E7z8DQJbeWT7LLP6reBDmPe1SASALR1/hp8oBIDfzkFZm6d/Fg0gesnYxIcLP+QGhB4hXgNADxCtA6AHiFSD0APEKEHqAeBUAcrtVyOkwbuEHNDeH2bjPVlaAkF8XzqcHMv09GyCAKIBwH0Cqg3B/kaQOwvwtij7IYyoQRe/ZAflI0Q8GroMoes9+HUTRe/brIIres18H4b7/UQfh3m8BAsj/AvmtB0L4kwRLf/RAsnzcwlOUPp+L/bdQK0DMNvtcyyyZJ42AeAUIPUC8AoQeIF4BQg8QrwChB4hXgNADxCtA6AHiFSD0APEKEHqAeAUIPUC8AoQeIF4BQg8QrwJAknkZCohXgNADxCtA6AHiFSD0APHKCpEZNyoIxD4EqMxnBYHYB2WVGSY3CMQ+TK7MwMVBIPaBi2WGkg4CsQ8lLTO4dxCIfXBvmcNWCIhjuHWZAfBDQFwD4IvsJCEgrikJRCaJCABxThIhMm3HwvCGkpMxuaft2MBUQ/9yT6SyhbmGSFPbpDPZ0BY2CWn6py3sJbQJuZKZIi2dSevSmUYwmYkd05lqM53JT9VKvKejVSphTBCs8nTCmrI5nUm005nWfJ/MRPOXOiX7fOWci9Dx75fvVxV9q5SVew4mN+SyVfqoV5GnnjJRDgVyqWibKNulbFrihFhEyAemzvMmC1aT5zV9Vi8fiO4A0RYg2gJEW4BoCxBtAaKtZCB/AXF1Ut/jtHWTAAAAAElFTkSuQmCC"
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
