import { Button, Input, Modal, notification, Table, Typography } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { BiEdit, BiTrashAlt } from 'react-icons/bi'
import { useSelector } from 'react-redux'
export default function Blog() {
  const [listBlog, setListBlog] = useState([])
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [idSelected, setIdSelected] = useState(false)
  const [search, setSearch] = useState()
  const [listBlogSearch, setListBlogSearch] = useState([])
  const accountType = useSelector((state) => state.collapse.account)
  console.log(accountType);
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
    { title: 'Người đăng', dataIndex: 'userPost', key: 'userPost' },
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
      width: 100,
      align: 'center',
      render: (text, record) => (
        <div className="flex justify-around">
          <BiEdit size={20} onClick={() => router.push('/blog/' + record.id)} />
          <BiTrashAlt
            size={20}
            onClick={() => {
              setIdSelected(record.id)
              setOpen(true)
            }}
          />
        </div>
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
          if (accountType.userType !== 'admin') {
            setListBlog(
              Object.keys(res.data)
                .map((e) => ({ ...res.data[e], id: e }))
                .filter((e) => e?.type === 1 || e?.username === accountType.username)
            )
            setListBlogSearch(
              Object.keys(res.data)
                .map((e) => ({ ...res.data[e], id: e }))
                .filter((e) => e?.type === 1 || e?.username === accountType.username)
            )
          } else {
            setListBlog(Object.keys(res.data).map((e) => ({ ...res.data[e], id: e })))
            setListBlogSearch(Object.keys(res.data).map((e) => ({ ...res.data[e], id: e })))
          }
        } else {
          setListBlog([])
        }
      })
  }

  const onSearchTitle = (search, data) => {
    let filterData = []
    for (var i = 0; i < listBlogSearch?.length; i++) {
      search = search.toLowerCase()
      var title = listBlogSearch[i]?.title.toLowerCase()
      if (title?.includes(search)) {
        filterData.push(data[i])
      }
    }
    return filterData
  }

  useEffect(() => {
    let b = onSearchTitle(search, listBlogSearch)
    setListBlog(b)
  }, [search])

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
        <div className="grid grid-cols-3 gap-x-10 mb-5">
          <Input
            placeholder="Nhập tên tiêu đề..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
            <Button
              size={20}
              className="bg-purple-700 text-white"
              onClick={() => {
                onDelete()
              }}
            >
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
