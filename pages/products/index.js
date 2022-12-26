/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Form, Input } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import useDebounce from '../../hooks/useDebounce'
import { productList } from '../redux/reducers'
import { useInView } from 'react-intersection-observer'
import { fakeData } from '../../constants/FakeData'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import axios from 'axios'
import { ListApiServices } from '../../services/getList'

function CustomerList(props) {
  const [valueInput, setValueInput] = useState()
  const [listCoffee, setListCoffee] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [listCoffeeSearch, setListCoffeeSearch] = useState([])
  const { ref: bottomRef, inView } = useInView({ threshold: 0 })
  const currentListCoffee = useRef()
  const dispatch = useDispatch()
  const router = useRouter()
  const debounce = useDebounce(valueInput, 500)

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

  const fetchData = async () => {
    try {
      const res = await ListApiServices.getListProduct()
      setListCoffee(res.data)
      setListCoffeeSearch(res.data)
      dispatch(productList(res.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    currentListCoffee.current = listCoffee
  }, [debounce, inView])

  useEffect(() => {
    let _listCoffee = searchProducts(debounce, listCoffeeSearch)
    setListCoffee(_listCoffee)
  }, [debounce])

  const clickToDetail = (id) => {
    router.push(`/products/${id}`)
  }

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setIsLoading(true)
        setListCoffee(
          listCoffee.concat(fakeData.map((e, idx) => ({ ...e, _id: new Date().getTime() + idx })))
        )
      }, 500)
    }
  }, [inView])

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
              <img src={data.image} alt="TM" width={'500px'} className="hover:opacity-50" />
              <p>{data.product_name}</p>
              <p>{`${data.base_price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}đ</p>
            </div>
          </div>
        ))}
      </div>
      {listCoffee.length > 0 && (
        <div ref={bottomRef} className="h-12 flex flex-col justify-center items-center">
          <AiOutlineLoading3Quarters className="icon-loading" />
          <p>Loading...</p>
        </div>
      )}
    </Layout>
  )
}

export default CustomerList
