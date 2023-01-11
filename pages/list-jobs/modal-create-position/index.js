import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, notification } from 'antd'
import axios from 'axios'

export default function ModalCreatePosition(props) {
  const [form] = Form.useForm()
  const { isOpenCreatePosition, setIsOpenCreatePosition, getListPosition } = props

  const onCreatePosition = async (data) => {
    await axios
      .post('https://nuxttestproject1-default-rtdb.firebaseio.com/listPosition.json', data)
      .then((res) => {
        notification.success({ message: 'Thêm mới thành công!' })
        getListPosition()
        form.resetFields()
        setIsOpenCreatePosition(false)
      })
      .catch((err) => {
        notification.error({ message: 'Có lỗi xảy ra!' })
      })
  }

  return (
    <div>
      {isOpenCreatePosition && (
        <Modal
          open={isOpenCreatePosition}
          onCancel={() => setIsOpenCreatePosition(false)}
          title="Thêm chức vụ"
          footer={
            <div>
              <Button
                className="bg-purple-700 text-white"
                onClick={() =>
                  form
                    .validateFields()
                    .then((data) => onCreatePosition(data).catch((err) => console.log(err)))
                }
              >
                Xác nhận
              </Button>
              <Button
                className="bg-red-500 text-white"
                onClick={() => setIsOpenCreatePosition(false)}
              >
                Thoát
              </Button>
            </div>
          }
        >
          <Form form={form}>
            <Form.Item
              label="Tên chức vụ"
              name="name"
              rules={[{ required: true, message: 'Không được để trống!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  )
}
