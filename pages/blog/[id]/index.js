import { Button, Card, DatePicker, Form, Input, notification, Select } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
      .put(
        `https://nuxttestproject1-default-rtdb.firebaseio.com/datablog/` +
          router.query.id +
          `.json`,
        data
      )
      .then((res) => {
        notification.success({ message: 'Chỉnh sửa thành công!' })
      })
      .catch((err) => {
        notification.error({ message: 'Có lỗi xảy ra!' })
      })
  }
  useEffect(() => {
    if (router.query.id) {
      axios.get('https://nuxttestproject1-default-rtdb.firebaseio.com/datablog.json').then((res) =>
        form.setFieldsValue(
          Object.keys(res.data)
            .map((e) => ({
              ...res.data[e],
              id: e,
              createdAt: moment(res.data[e].createdAt),
            }))
            .find((s) => s.id === router.query.id)
        )
      )
    }
  }, [router.query.id])

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
          <Form.Item label="Tiêu đề" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả" name={'description'}>
            <Input />
          </Form.Item>
          <Form.Item label="Thể loại" name={'category'}>
            <Input />
          </Form.Item>
          <Form.Item label="Ngày tạo" name={'createdAt'}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Trạng thái" name="status">
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
          <Form.Item label="Nội dung" name="content">
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
