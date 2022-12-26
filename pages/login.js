import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

function Login(props) {
  const router = useRouter()
  const Login = () => {
    router.push('/customer')
  }

  return (
    <div className="wrapper">
      <img src="https://wallpaperaccess.com/full/2029165.jpg" className=" h-screen w-screen" />
      <div className="h-40 w-80 absolute top-1/3 left-80">
        <div className="text-3xl font-bold mb-5">Đăng nhập</div>
        <Form>
          <label className="text-white">Tài khoản</label>
          <Form.Item name="username">
            <Input />
          </Form.Item>
          <label className="text-white">Mật khẩu</label>
          <Form.Item name="password">
            <Input.Password />
          </Form.Item>
          <Button onClick={Login}>Đăng nhập</Button>
        </Form>
      </div>
    </div>
  )
}

export default Login
