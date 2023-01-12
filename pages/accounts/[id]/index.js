import React, { useEffect, useState } from 'react'
import { Button, Card, DatePicker, Form, Input, InputNumber, notification, Select } from 'antd'
import Layout from '../../../components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function AccountCreate() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [listAccounts, setListAccounts] = useState([])
  const onSubmit = async (data) => {
      await axios
        .put('https://nuxttestproject1-default-rtdb.firebaseio.com/accounts' + router.query.id +'.json', {
          ...data,
        })
        .then((res) => {
          notification.success({ message: 'Thêm mới thành công!' })
        })
        .catch((err) => {
          notification.error({ message: 'Có lỗi xảy ra!' })
        })
      router.push('/accounts')
  }

  const getAccountById = async () => {
    await axios
      .get('https://nuxttestproject1-default-rtdb.firebaseio.com/accounts/' + router.query.id + '.json')
      .then((res) => form.setFieldsValue(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (router.query.id) {
        getAccountById()
    }
  }, [router.query.id])

  return (
    <Layout>
      <Card
        title={
          <div className="flex justify-between">
            <h1 className="font-bold text-xl">Thêm mới tài khoản</h1>
            <div className="flex gap-x-5">
              <Button
                className="bg-purple-700 text-white"
                onClick={() =>
                  form
                    .validateFields()
                    .then((data) => onSubmit(data))
                    .catch((e) => {
                      console.log(e)
                    })
                }
              >
                Xác nhận
              </Button>
              <Button className="bg-orange-500 text-white" onClick={() => router.push('/accounts')}>
                Thoát
              </Button>
            </div>
          </div>
        }
      >
        <Form form={form} layout="vertical" initialValues={{ userType: 'user' }}>
          <div className="grid grid-cols-3 gap-x-5">
            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Công ty"
              name="congty"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Địa chỉ"
              name="diachi"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              label="Quyền"
              name="userType"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Select
                disabled
                options={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'user', label: 'Người dùng' },
                  { value: 'company', label: 'Công ty' },
                ]}
                className="w-full"
              />
            </Form.Item>
          </div>
        </Form>
      </Card>
    </Layout>
  )
}
