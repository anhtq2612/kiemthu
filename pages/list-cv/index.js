import { Button, Card } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'

export default function ListCV() {
  const [listCv, setListCv] = useState([])
  const accountType = useSelector((state) => state.collapse.account.userType)
  const router = useRouter()
  const getListCv = async () => {
    await axios
      .get('https://nuxttestproject1-default-rtdb.firebaseio.com/listcv.json')
      .then((res) => {
        if (res.data) {
          setListCv(Object.keys(res.data).map((e) => ({ ...res.data[e], id: e })))
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getListCv()
  }, [])

  return (
    <Layout>
      <Card
        title={
          <div className="flex justify-between">
            <p className="font-semibold text-2xl">Quản lý CV</p>
            {accountType === 'user' && (
              <Button className="bg-purple-700 text-white" onClick={() => router.push('/list-cv/create')}>Thêm mới</Button>
            )}
          </div>
        }
      ></Card>
    </Layout>
  )
}
