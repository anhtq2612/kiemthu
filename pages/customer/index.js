/* eslint-disable @next/next/no-img-element */
import { Input } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import useDebounce from '../../hooks/useDebounce'

function CustomerList(props) {
  const [valueInput, setValueInput] = useState()
  const [listCoffee, setListCoffee] = useState([])
  const debounce = useDebounce(valueInput, 500)

  const changeInput = (e) => {
    setValueInput(e.target.value)
  }

  useEffect(() => {
    fetch('https://api.thecoffeehouse.com/api/v2/menu')
      .then((res) => res.json())
      .then((res) => setListCoffee(res.data))
  }, [debounce])

  return (
    <Layout>
      <div className="grid grid-cols-5 gap-x-10">
        {listCoffee?.map((data) => (
          <div className="w-1/6 h-24" key={data._id}>
            <img src={data.image} alt="TM" />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default CustomerList
