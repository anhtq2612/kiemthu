/* eslint-disable @next/next/no-img-element */
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

export default function Login() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/customer')
  }
  return (
    <div className="h-screen w-screen flex items-center">
      <img className="h-screen w-screen" src="https://wallpapercave.com/wp/wp3719649.jpg" alt="" />
      <div className="h-96 w-96 absolute left-[20%]">
        <Form onFinish={handleClick} layout="vertical">
          <Form.Item
            label={<label className="text-bold text-2xl text-white">Username</label>}
            name="username"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<label className="text-bold text-2xl text-white">Password</label>}
            name="password"
          >
            <Input />
          </Form.Item>
          <Button
            type="submit"
            onClick={handleClick}
            className="bg-purple-500 text-white rounded-lg text-bold text-2xl h-10 hover:bg-white hover:text-black"
          >
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  )
}
