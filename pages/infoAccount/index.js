import { Button, Form, Input, notification } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'

export default function InfoAccount() {
  const [form] = Form.useForm()
  const [img, setImg] = useState('')
  const [account, setAccount] = useState()
  const onSubmit = async () => {
    await axios
      .put(
        'https://nuxttestproject1-default-rtdb.firebaseio.com/accounts/' +
          JSON.parse(localStorage.getItem('account')).id +
          '.json',
        {
          username: 'admin',
          password: JSON.parse(localStorage.getItem('account')).password,
          confirmPassword: JSON.parse(localStorage.getItem('account')).password,
          img: img,
          congty: form.getFieldValue('congty'),
          diachi: form.getFieldValue('diachi'),
          phone: form.getFieldValue('phone'),
          nv: form.getFieldValue('nv'),
        }
      )
      .then((res) => {
        notification.success({ message: 'Chỉnh sửa thành công!' })
      })
      .catch((err) => {
        notification.error({ message: 'Có lỗi xảy ra!' })
      })
  }

  const getAccountById = async () => {
    await axios
      .get(
        'https://nuxttestproject1-default-rtdb.firebaseio.com/accounts/' +
          JSON.parse(localStorage.getItem('account')).id +
          '.json'
      )
      .then((res) => {form.setFieldsValue(res.data)
      console.log(res.data);
    }
      )
      .catch((err) => {
        notification.error({ message: 'Có lỗi xảy ra!' })
      })
  }

  useEffect(() => {
    getAccountById()
  }, [])
  return (
    <Layout>
      <Form form={form} layout="vertical">
        <Form.Item label="Tên người dùng" name="username">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Quyền" name="userType">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Công ty" name="congty">
          <Input />
        </Form.Item>
        <Form.Item label="Địa chỉ" name="diachi">
          <Input />
        </Form.Item>
        <Form.Item label="Điện thoại" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Nhân viên trong công ty" name="nv">
          <Input />
        </Form.Item>
        <Form.Item label="Ảnh">
          <Input value={img} onChange={(e) => setImg(e.target.value)} />
        </Form.Item>
        <img src={img} alt="" width={180} />
      </Form>
      <Button className="bg-purple-500 text-white" onClick={() => onSubmit()}>
        Xác nhận
      </Button>
    </Layout>
  )
}
