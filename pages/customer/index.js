import { Button, Form, Input, Modal, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

export default function Customer() {
  const columns = [
    { title: 'STT', render: (text, r, idx) => idx + 1 },
    { title: 'Tên nhân viên', dataIndex: 'name', key: 'name' },
    { title: 'Ngày sinh', dataIndex: 'dob', key: 'dob' },
    { title: 'Giới tính', dataIndex: 'gioitinh', key: 'gioitinh' },
    { title: 'Quê quán', dataIndex: 'country', key: 'country' },
    { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Hệ số lương', dataIndex: 'hsl', key: 'hsl' },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <div
          className={`h-2 w-2 rounded-full ${text === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}
        />
      ),
    },
    {
      title: 'Thao tác',
      render: (text, record) => (
        <div className="flex gap-x-3">
          <p
            onClick={() => {
              setModalAdd(true), setMode('edit'), setId(record.code)
            }}
          >
            Sửa
          </p>
          <p>Xóa</p>
        </div>
      ),
    },
  ]

  const dataTable = [
    {
      code: 'B1',
      name: '11111',
      dob: '19/07/2002',
      gioitinh: 'Nữ',
      country: 'Hà Nội',
      phoneNumber: '0983763636',
      hsl: 3.2,
      status: 'active',
    },
    {
      code: 'B2',
      name: 'Tiểu Long Nữ',
      dob: '21/08/2006',
      gioitinh: 'Nữ',
      country: 'Hà Nội',
      phoneNumber: '0983763685',
      hsl: 3.2,
      status: 'active',
    },
    {
      code: 'B3',
      name: 'Trần Quang Anh',
      dob: '26/12/1999',
      gioitinh: 'Nam',
      country: 'Hà Nội',
      phoneNumber: '0983767536',
      hsl: 3.2,
      status: 'inactive',
    },
    {
      code: 'B4',
      name: 'T22222',
      dob: '19/07/2002',
      gioitinh: 'Nam',
      country: 'Hà Nội',
      phoneNumber: '0983768536',
      hsl: 3.2,
      status: 'inactive',
    },
    {
      code: 'B5',
      name: 'Phạm Văn Mách',
      dob: '19/07/2002',
      gioitinh: 'Nam',
      country: 'Hà Nội',
      phoneNumber: '0983763716',
      hsl: 3.2,
      status: 'active',
    },
    {
      code: 'B6',
      name: 'Nguyễn Thúc Thùy Tiên',
      dob: '19/07/1998',
      gioitinh: 'Nữ',
      country: 'Hà Nội',
      phoneNumber: '0883763636',
      hsl: 3.2,
      status: 'inactive',
    },
  ]

  const [modalAdd, setModalAdd] = useState(false)
  const [mode, setMode] = useState('add')
  const [id, setId] = useState()
  const [form] = Form.useForm()

  useEffect(() => {
    if (!modalAdd) return;
    if (mode === 'edit' && id) {
      form.setFieldsValue(dataTable.find((item) => item.code === id))
    } else {
      form.resetFields()
    }
  }, [mode, modalAdd, id])

  return (
    <Layout>
      <div className="flex justify-between">
        <Typography.Title level={3}>Quản lý nhân viên</Typography.Title>
        <Button onClick={() => setModalAdd(true)} className="bg-orange-500 text-white">
          + Thêm nhân viên
        </Button>
      </div>
      <Table columns={columns} dataSource={dataTable.map((e, i) => ({...e, key: i}))} bordered />
      {modalAdd && (
        <Modal
          open={modalAdd}
          title="Thêm nhân viên"
          onCancel={() => {
            setModalAdd(false), setMode('add')
          }}
          footer={false}
        >
          <div className="flex justify-end gap-5">
            <Button className="bg-orange-500 text-white">Xác nhận</Button>
            <Button
              onClick={() => {
                setModalAdd(false), setMode('add')
              }}
              className="bg-gray-500 text-white"
            >
              Thoát
            </Button>
          </div>
          <Form layout="vertical" className="h-[60vh] overflow-auto" form={form}>
            <Form.Item label="Mã nhân viên" name="code">
              <Input />
            </Form.Item>
            <Form.Item label="Tên nhân viên" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Ngày sinh" name="dob">
              <Input />
            </Form.Item>
            <Form.Item label="Giới tính" name="gioitinh">
              <Input />
            </Form.Item>
            <Form.Item label="Quê quán" name="country">
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phoneNumber">
              <Input />
            </Form.Item>
            <Form.Item label="Hệ số lương" name="hsl">
              <Input />
            </Form.Item>
            <Form.Item label="Trạng thái" name="status">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </Layout>
  )
}
