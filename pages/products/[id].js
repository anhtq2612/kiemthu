import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../components/Layout'

function ProductDetail(props) {
  const params = useRouter()
  const detail = useSelector((state) =>
    state.collapse.listCoffee?.find((e) => e._id === params.query.id)
  )
  console.log(detail)
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: detail?.description_html }}></div>
    </Layout>
  )
}

export default ProductDetail
