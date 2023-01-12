import { Button, Form, Input, notification, Select } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
function SignUp(props) {
  const router = useRouter()
  const [form] = Form.useForm()
  const [listAccounts, setListAccounts] = useState([])
  const signUp = async (data) => {
    console.log(listAccounts)
    console.log(form.getFieldValue('username'))
    console.log(listAccounts.find((e) => e.username === form.getFieldValue('username')))
    if (listAccounts.find((e) => e.username === form.getFieldValue('username'))) {
      notification.error({ message: 'Tài khoản trùng!' })
    } else {
      await axios
        .post('https://nuxttestproject1-default-rtdb.firebaseio.com/accounts.json', {
          ...data,
          userType: form.getFieldValue('userType') ? 'user' : form.getFieldValue('userType'),
        })
        .then((res) => {
          notification.success({ message: 'Đăng kí thành công!' })
        })
        .catch((err) => {
          notification.error({ message: 'Có lỗi xảy ra!' })
        })
      router.push('/login')
    }
  }
  let validateSpecialCharacters = /^[a-zA-Z0-9]*$/
  let validateNumber = /[0-9]/
  let validateCapital = /[A-Z]/
  let validateCharacters = /[a-z]/
  const validatorPassword = (value) => {
    if (value) {
      if (value.length < 6) {
        return Promise.reject(new Error('Mật khẩu phải lớn hơn hoặc bằng 6 kí tự!'))
      }

      if (!validateCapital.test(value)) {
        return Promise.reject(new Error('Phải có chữ tối thiểu 1 kí tự in hoa!'))
      }

      if (!validateCharacters.test(value)) {
        return Promise.reject(new Error('Phải có chữ tối thiểu 1 kí tự in thường!'))
      }

      if (!validateNumber.test(value)) {
        return Promise.reject(new Error('Phải có tối thiểu 1 số!'))
      }

      if (validateSpecialCharacters.test(value)) {
        return Promise.reject(new Error('Mật khẩu phải có tối thiểu 1 kí tự đặc biệt!'))
      }
    }
    return Promise.resolve()
  }

  const getAccounts = async () => {
    await axios
      .get('https://nuxttestproject1-default-rtdb.firebaseio.com/accounts.json')
      .then((res) => setListAccounts(Object.keys(res.data).map((e) => res.data[e])))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getAccounts()
  }, [])

  return (
    <div>
      <img
        src="https://static.vecteezy.com/system/resources/previews/005/152/375/original/modern-futuristic-neon-purple-background-free-vector.jpg"
        className="w-screen h-screen"
      />
      <div className="p-12 w-[30vw] absolute top-[calc(50%-250px)] left-[calc(50%-30vw/2)] bg-gradient-to-b from-purple-700 to-purple-200 rounded-xl">
        <div className="text-3xl text-white font-bold mb-5">Đăng ký</div>
        <Form layout="vertical" form={form}>
          <Form.Item
            name="username"
            label={<label className="text-white">Tài khoản</label>}
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={<label className="text-white">Mật khẩu</label>}
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              {
                validator: (_, value) => validatorPassword(value),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label={<label className="text-white">Nhập lại mật khẩu</label>}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Mật khẩu không trùng khớp!'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="userType" label={<p className="text-white">Quyền</p>}>
            <Select
              options={[
                { value: 'user', label: 'Người dùng' },
                { value: 'company', label: 'Công ty' },
              ]}
              defaultValue="user"
            />
          </Form.Item>
        </Form>
        <div className="flex flex-col items-center gap-y-4">
          <Button
            className="w-60 h-16 rounded-xl bg-purple-700 text-white mt-5"
            onClick={() =>
              form.validateFields().then((data) => signUp(data).catch((err) => console.log(err)))
            }
          >
            Đăng kí
          </Button>
          <p>
            Bạn đã có tài khoản quay về trang{' '}
            <span
              className="underline text text-purple-700 cursor-pointer"
              onClick={() => router.push('/login')}
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUp
