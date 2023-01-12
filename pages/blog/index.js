import { Button, Modal, notification, Table, Typography } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
export default function Blog() {
  const [listBlog, setListBlog] = useState([])
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [idSelected, setIdSelected] = useState(false)
  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => {
        return (
          <span
            onClick={() => router.push('/blog/' + record.id)}
            className="underline text-blue-400 cursor-pointer"
          >
            {text}
          </span>
        )
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) =>
        [
          {
            label: 'Được đăng',
            value: 'published',
          },
          {
            label: 'Bản nháp',
            value: 'draft',
          },
          {
            label: 'Hủy',
            value: 'rejected',
          },
        ].find((e) => e.value === text).label,
    },
    {
      title: '',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      align: 'center',
      render: (text, record) => (
        <>
          <EditOutlined onClick={() => router.push('/blog/' + record.id)} />
          <DeleteOutlined
            className="text-red-500 ml-4"
            color="red"
            onClick={() => {
              setIdSelected(record.id)
              setOpen(true)
            }}
          />
        </>
      ),
    },
  ]

  const onDelete = async (data) => {
    await axios
      .delete(
        `https://nuxttestproject1-default-rtdb.firebaseio.com/datablog/` + idSelected + `.json`
      )
      .then((res) => {
        notification.success({ message: 'Xóa thành công!' })
        fetchData()
        setOpen(false)
      })
      .catch((err) => {
        notification.error({ message: 'Có lỗi xảy ra!' })
      })
  }
  const fetchData = async () => {
    await axios
      .get('https://nuxttestproject1-default-rtdb.firebaseio.com/datablog.json')
      .then((res) => {
        if (res.data) {
          setListBlog(Object.keys(res.data).map((e) => ({ ...res.data[e], id: e })))
        } else {
          setListBlog([])
        }
      })
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Layout>
      <div className="flex justify-between items-center mb-10">
        <p className="font-semibold text-2xl">Danh sách Blogs</p>
        <Button onClick={() => router.push('/blog/create')} className="bg-purple-700 text-white">
          Thêm mới
        </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={listBlog} bordered size="small" />
      </div>
      <Modal
        title="Thông báo"
        open={open}
        onCancel={() => {
          setOpen(false)
        }}
        footer={
          <div className="flex justify-end">
            <Button size={20} className="bg-purple-700 text-white" onClick={() => {
              onDelete()
            }}>
              Xác nhận
            </Button>
            <Button className="bg-red-500 text-white" size={20} onClick={() => setOpen(false)}>
              Thoát
            </Button>
          </div>
        }
      >
        <p>Bạn có muốn xóa blog này không?</p>
      </Modal>
    </Layout>
  )
}
