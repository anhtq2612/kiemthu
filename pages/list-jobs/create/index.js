import React, { useEffect, useState } from 'react'
import { Button, Card, DatePicker, Form, Input, InputNumber, notification, Select } from 'antd'
import Layout from '../../../components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import ModalCreatePosition from '../modal-create-position'

export default function JobCreate() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [position, setPosition] = useState([])
  const [isOpenCreatePosition, setIsOpenCreatePosition] = useState(false)
  const onSubmit = async (data) => {
    await axios
      .post('https://nuxttestproject1-default-rtdb.firebaseio.com/datajob.json', data)
      .then((res) => {
        notification.success({ message: 'Thêm mới thành công!' })
      })
      .catch((err) => {
        notification.error({ message: 'Có lỗi xảy ra!' })
      })
  }

  const getListPosition = async () => {
    await axios
      .get('https://nuxttestproject1-default-rtdb.firebaseio.com/listPosition.json')
      .then((res) => {
        setPosition(Object.keys(res.data).map((e) => ({ ...res.data[e], id: e })))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    getListPosition()
  }, [])

  return (
    <Layout>
      <Card
        title={
          <div className="flex justify-between">
            <h1 className="font-bold text-xl">Thêm mới Job</h1>
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
              <Button
                className="bg-orange-500 text-white"
                onClick={() => router.push('/list-jobs')}
              >
                Thoát
              </Button>
            </div>
          </div>
        }
      >
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-3 gap-x-5">
            <Form.Item
              label="Tên Jobs"
              name="name"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tên công ty"
              name="companyName"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Điện thoại liên hệ"
              name="phone"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input />
            </Form.Item>
            <div className="relative">
              <Form.Item
                label="Chức vụ"
                name="position"
                rules={[{ required: true, message: 'Không được để trống!' }]}
              >
                <Select
                  options={position.map((e) => ({ label: e.name, value: e.id }))}
                  className="w-[calc(100%-35px)]"
                />
              </Form.Item>
              <Button
                className="flex items-center justify-center w-10 h-auto absolute right-0 top-[30px]"
                onClick={() => setIsOpenCreatePosition(true)}
              >
                +
              </Button>
            </div>
            <Form.Item
              label="Khoảng lương"
              name="range"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số lượng nhân viên cần tuyển"
              name="quantity"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item
              label="Ngày bắt đầu"
              name="startDate"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item
              label="Ngày kết thúc"
              name="endDate"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </div>
          <Form.Item
            label="Mô tả công việc"
            name="description"
            rules={[{ required: true, message: 'Không được để trống!' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Ảnh"
            name="image"
            rules={[{ required: true, message: 'Không được để trống!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Card>
      <ModalCreatePosition
        setPosition={setPosition}
        getListPosition={getListPosition}
        isOpenCreatePosition={isOpenCreatePosition}
        setIsOpenCreatePosition={setIsOpenCreatePosition}
      />
    </Layout>
  )
}
