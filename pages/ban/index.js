import React from 'react'
import Layout from '../../components/Layout'
import { FaEdit } from 'react-icons/fa'

const DEFINED_TABLE = {
  RONG: 1,
  DA_DAT: 2,
  DANG_SU_DUNG: 3,
}

const items = [
  { value: 1, label: 'Bàn 1', rong: DEFINED_TABLE.RONG },
  { value: 2, label: 'Bàn 2', rong: DEFINED_TABLE.DA_DAT },
  { value: 3, label: 'Bàn 3', rong: DEFINED_TABLE.RONG },
  { value: 4, label: 'Bàn 4', rong: DEFINED_TABLE.DANG_SU_DUNG },
  { value: 5, label: 'Bàn 5', rong: DEFINED_TABLE.DANG_SU_DUNG },
  { value: 6, label: 'Bàn 6', rong: DEFINED_TABLE.DA_DAT },
  { value: 7, label: 'Bàn 7', rong: DEFINED_TABLE.RONG },
  { value: 8, label: 'Bàn 8', rong: DEFINED_TABLE.RONG },
  { value: 9, label: 'Bàn 9', rong: DEFINED_TABLE.DANG_SU_DUNG },
  { value: 10, label: 'Bàn 10', rong: DEFINED_TABLE.DANG_SU_DUNG },
  { value: 11, label: 'Bàn 11', rong: DEFINED_TABLE.DA_DAT },
]

export default function Ban() {
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-y-10">
        {items.map((item) => {
          return (
            <div
              key={item.value}
              className={`relative font-medium text-lg rounded-xl flex justify-center items-center h-40 w-5/6 ${
                item.rong === DEFINED_TABLE.RONG
                  ? 'bg-yellow-300'
                  : item.rong === DEFINED_TABLE.DA_DAT
                  ? 'bg-gray-400'
                  : 'bg-red-300'
              }`}
            >
              {item.label}
              {item.rong === DEFINED_TABLE.RONG && (
                <div className="absolute rounded-tr-xl rounded-bl-xl flex items-center justify-center h-10 w-50 p-3 top-0 right-0 bg-pink-300">
                  Rỗng
                </div>
              )}
              {item.rong === DEFINED_TABLE.DA_DAT && (
                <div className="absolute rounded-tr-xl rounded-bl-xl flex items-center justify-center h-10 w-50 p-3 top-0 right-0 bg-blue-300">
                  Đã đặt
                </div>
              )}
              {item.rong === DEFINED_TABLE.DANG_SU_DUNG && (
                <div className="absolute rounded-tr-xl rounded-bl-xl flex items-center justify-center h-10 w-50 p-3 top-0 right-0 bg-purple-200">
                  Đang sử dụng
                </div>
              )}
              <div className="absolute top-[-12px] right-[-20px] bg-lime-300 rounded-full h-8 w-8 flex justify-center items-center">
                <FaEdit />
              </div>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}
