import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

function Login(props) {
  const router = useRouter()
  const Login = () => {
    router.push('/customer')
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

  return (
    <div>
      <img
        src="https://static.vecteezy.com/system/resources/previews/005/152/375/original/modern-futuristic-neon-purple-background-free-vector.jpg"
        className="w-screen h-screen"
      />
      <div className="p-12 w-[30vw] absolute top-1/4 left-[calc(50%-30vw/2)] bg-gradient-to-b from-purple-500 to-white rounded-xl">
        <div className="text-3xl font-bold mb-5">Đăng nhập</div>
        <Form layout="vertical">
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
