import { Button, Form, Input, notification } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { accountInfo } from './redux/reducers'

function Login(props) {
  const router = useRouter()
  const [form] = Form.useForm()
  const [listAccounts, setListAccounts] = useState([])
  const dispatch = useDispatch()
  const Login = () => {
    if (
      (listAccounts.find((e) => e.username === form.getFieldValue('username')) &&
        listAccounts.find((e) => e.password === form.getFieldValue('password'))) ||
      (form.getFieldValue('username') === 'admin' && form.getFieldValue('password') === 'Admin@123')
    ) {
      router.push('/accounts')
      localStorage.setItem(
        'account',
        JSON.stringify({
          email: form.getFieldValue('username') === 'admin' ? 'admin' : form.getFieldValue('username'),
          type:
          listAccounts.find((e) => e.username === form.getFieldValue('username')).userType,
          id: listAccounts.find((e) => e.username === form.getFieldValue('username')).id,
          password: form.getFieldValue('password'),
        })
      )
      dispatch(accountInfo(listAccounts.find((e) => e.username === form.getFieldValue('username'))))
    } else {
      notification.error({ message: 'Sai thông tin đăng nhập' })
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

  const getListAccounts = async () => {
    await axios
      .get('https://nuxttestproject1-default-rtdb.firebaseio.com/accounts.json')
      .then((res) => {
        if (res.data) {
          setListAccounts(Object.keys(res.data).map((s) => ({ ...res.data[s], id: s })))
        }
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getListAccounts()
  }, [])

  return (
    <div>
      <img
        src="https://static.vecteezy.com/system/resources/previews/005/152/375/original/modern-futuristic-neon-purple-background-free-vector.jpg"
        className="w-screen h-screen"
      />
      <div className="p-12 w-[30vw] absolute top-[calc(50%-220px)] left-[calc(50%-30vw/2)] bg-gradient-to-b from-purple-700 to-purple-200 rounded-xl">
        <div className="text-3xl text-white font-bold mb-5">Đăng nhập</div>
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
        </Form>
        <div className="flex flex-col items-center gap-y-4">
          <Button className="w-60 h-16 rounded-xl bg-purple-700 text-white mt-5" onClick={Login}>
            Đăng nhập
          </Button>
          <p className="text-purple-700">Bạn chưa có tài khoản hãy đăng kí</p>
          <p className="text-purple-700 underline text-xl" onClick={() => router.push('/signup')}>
            Đăng kí
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
