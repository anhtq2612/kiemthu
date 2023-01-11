import { Card, Input, Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

export default function Accounts() {
  const [listAccounts, setListAccounts] = useState([])
  const getListAccounts = async () => {
    await axios
      .get('https://nuxttestproject1-default-rtdb.firebaseio.com/accounts.json')
      .then((res) => {
        if (res.data) {
          setListAccounts(Object.keys(res.data).map((s) => ({ ...res.data[s], id: s })))
        }
      })
      .catch((error) => console.log(error))
  }
  useEffect(() => {
    getListAccounts()
  }, [])

  const columns = [
    { title: 'STT', key: '', render: (t, r, i) => i + 1 },
    { title: 'Tên người dùng', key: 'username', dataIndex: 'username' },
    { title: 'Công ty', key: 'congty', dataIndex: 'congty' },
    { title: 'Địa chỉ', key: 'diachi', dataIndex: 'diachi' },
    { title: 'Điện thoại', key: 'phone', dataIndex: 'phone' },
    { title: 'Nhân viên trong công ty', key: 'nv', dataIndex: 'nv' },
  ]

  const onSearchUsername = () => {}
  return (
    <Layout>
      <Card title="Danh sách tài khoản">
        <div className="mb-5">
          <div>
            <Input
              placeholder="Nhập tên người dùng..."
              onChange={(e) => onSearchUsername(e.target.value)}
            />
          </div>
        </div>
        <Table columns={columns} dataSource={listAccounts} bordered />
      </Card>
    </Layout>
  )
}
