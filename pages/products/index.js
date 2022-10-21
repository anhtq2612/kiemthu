/* eslint-disable @next/next/no-img-element */
import { Form, Input } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import useDebounce from '../../hooks/useDebounce'

function CustomerList(props) {
  const [valueInput, setValueInput] = useState()
  const [listCoffee, setListCoffee] = useState([])
  const [listCoffeeSearch, setListCoffeeSearch] = useState([])
  const router = useRouter()
  const debounce = useDebounce(valueInput, 500)
  const cl = useSelector((state) => state)
  const searchProducts = (search, data) => {
    let filterData = []
    for (var i = 0; i < listCoffeeSearch?.length; i++) {
      search = valueInput?.toLowerCase()
      var product_name = listCoffeeSearch[i]?.product_name.toLocaleLowerCase()
      if (product_name?.includes(search)) {
        filterData.push(data[i])
      }
    }
    return filterData
  }

  const fetchData = () =>
    fetch('https://api.thecoffeehouse.com/api/v2/menu')
      .then((res) => res.json())
      .then((res) => {
        setListCoffee(res.data)
        setListCoffeeSearch(res.data)
      })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    let _listCoffee = searchProducts(valueInput, listCoffeeSearch)
    setListCoffee(_listCoffee)
    console.log(cl)
  }, [debounce])

  const clickToDetail = (id) => {
    router.push(`/products/${id}`)
  }

  return (
    <Layout>
      <Form layout="vertical">
        <div className="grid grid-cols-4">
          <Form.Item label="Tìm kiếm">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              onChange={(e) => setValueInput(e.target.value)}
            />
          </Form.Item>
        </div>
      </Form>
      <div className="grid grid-cols-5 gap-4 mt-2">
        {listCoffee?.map((data) => (
          <div
            className="flex justify-center hover:bg-gray-300"
            key={data._id}
            onClick={() => clickToDetail(data._id)}
          >
            <div className="flex flex-col items-center">
              <img src={data.image} alt="TM" width={'200px'} />
              <p>{data.product_name}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default CustomerList
