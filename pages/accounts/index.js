import { Button, Card, Input, Modal, notification, Table, Select } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { BiEdit, BiTrashAlt } from 'react-icons/bi'

export default function Accounts() {
  const [listAccounts, setListAccounts] = useState([])
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [listSearch, setListSearch] = useState([])
  const [showModalDelete, setShowModalDelete] = useState(false)
  const [account, setAccount] = useState()
  const [quyen, setQuyen] = useState()
  const getListAccounts = async () => {
    await axios
      .get('https://nuxttestproject1-default-rtdb.firebaseio.com/accounts.json')
      .then((res) => {
        if (res.data) {
          setListAccounts(Object.keys(res.data).map((s) => ({ ...res.data[s], id: s })))
          setListSearch(Object.keys(res.data).map((s) => ({ ...res.data[s], id: s })))
        }
      })
      .catch((error) => console.log(error))
  }

  const handleDelete = async (id) => {
    await axios
      .delete(`https://nuxttestproject1-default-rtdb.firebaseio.com/accounts/` + id + `.json`)
      .then((res) => {
        notification.success({ message: 'Xóa thành công!' })
        setShowModalDelete(false)
        getListAccounts()
      })
      .catch((err) => {
        notification.error({ message: 'Có lỗi xảy ra!' })
      })
  }

  useEffect(() => {
    getListAccounts()
  }, [])

  const columns = [
    { title: 'STT', key: '', render: (t, r, i) => i + 1 },
    { title: 'Tên người dùng', key: 'username', dataIndex: 'username' },
    { title: 'Quyền', key: 'userType', dataIndex: 'userType' },
    { title: 'Công ty', key: 'congty', dataIndex: 'congty' },
    { title: 'Địa chỉ', key: 'diachi', dataIndex: 'diachi', width: 300 },
    { title: 'Điện thoại', key: 'phone', dataIndex: 'phone' },
    { title: 'Nhân viên trong công ty', key: 'nv', dataIndex: 'nv' },
    {
      title: '',
      width: 100,
      render: (t) => (
        <div className="flex justify-around">
          <BiEdit size={20} onClick={() => router.push(`/accounts/${t.id}`)} />
          <BiTrashAlt
            size={20}
            onClick={() => {
              setShowModalDelete(true)
              setAccount(t)
            }}
          />
        </div>
      ),
    },
  ]

  const onSearchUsername = (search, data) => {
    let filterData = []
    for (var i = 0; i < listSearch?.length; i++) {
      search = search.toLowerCase()
      var username = listSearch[i]?.username.toLowerCase()
      if (username?.includes(search)) {
        filterData.push(data[i])
      }
    }
    return filterData
  }

  const onSearchQuyen = () => {
    if (quyen) {
      setListAccounts(listSearch.filter((e) => e.userType === quyen))
    } else {
      setListAccounts(listSearch)
    }
  }

  useEffect(() => {
    let b = onSearchUsername(search, listSearch)
    setListAccounts(b)
  }, [search])

  useEffect(() => {
    onSearchQuyen()
  }, [quyen])
  return (
    <Layout>
      <Card
        title={
          <div className="flex justify-between">
            <p className="font-semibold text-2xl">Danh sách tài khoản</p>
            <Button
              className="text-white bg-purple-700"
              onClick={() => router.push('/accounts/create')}
            >
              Thêm mới
            </Button>
          </div>
        }
      >
        <div className="mb-5">
          <div className="grid grid-cols-3 gap-x-3">
            <Input
              placeholder="Nhập tên người dùng..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              placeholder="Quyền tài khoản..."
              options={[
                { value: 'admin', label: 'admin' },
                { value: 'company', label: 'company' },
                { value: 'user', label: 'user' },
              ]}
              allowClear
              onChange={(value) => setQuyen(value)}
            />
          </div>
        </div>
        <Table columns={columns} dataSource={listAccounts} bordered />
      </Card>
      {showModalDelete && (
        <Modal
          onCancel={() => setShowModalDelete(false)}
          open={showModalDelete}
          title="Thông báo"
          footer={
            <div>
              <Button
                className="bg-purple-700 text-white"
                onClick={() => handleDelete(account?.id)}
              >
                Xác nhận
              </Button>
              <Button className="bg-red-500 text-white" onClick={() => setShowModalDelete(false)}>
                Thoát
              </Button>
            </div>
          }
        >
          <p>
            Bạn có muốn xóa tài khoản{' '}
            <span className="text-blue-600 underline">{account?.username}</span>
          </p>
        </Modal>
      )}
    </Layout>
  )
}
