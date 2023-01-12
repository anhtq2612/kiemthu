import { Button, Card, DatePicker, Form, Input, notification, Select } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'
import Layout from '../../../components/Layout'

const BlogCreate = () => {
  const [selectedTab, setSelectedTab] = useState('write')
  const [form] = Form.useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    await axios
      .post('https://nuxttestproject1-default-rtdb.firebaseio.com/datablog.json', data)
      .then((res) => {
        notification.success({ message: 'Thêm mới thành công!' })
        router.push('/blog')
      })
      .catch((err) => {
        notification.error({ message: 'Có lỗi xảy ra!' })
      })
  }

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
              <Button className="bg-orange-500 text-white" onClick={() => router.push('/blog')}>
                Thoát
              </Button>
            </div>
          </div>
        }
      >
        <Form
          form={form}
          layout="vertical"
          rules={[
            {
              required: true,
              message: 'Không được để trống',
            },
          ]}
        >
          <Form.Item label="Tiêu đề" name="title" rules={[{required: true, message: 'Không được để trống'}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name={'description'} rules={[{required: true, message: 'Không được để trống'}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Thể loại" name={'category'} rules={[{required: true, message: 'Không được để trống'}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Ngày tạo" name={'createdAt'} rules={[{required: true, message: 'Không được để trống'}]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Trạng thái" name="status" rules={[{required: true, message: 'Không được để trống'}]}>
            <Select
              options={[
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
              ]}
            />
          </Form.Item>
          <Form.Item label="Nội dung" name="content" rules={[{required: true, message: 'Không được để trống'}]}>
            <ReactMde
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(<ReactMarkdown>{markdown}</ReactMarkdown>)
              }
            />
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  )
}
export default BlogCreate
