import React from 'react'
import Layout from '../../components/Layout'

export default function Customer() {
  return (
    <Layout>
      <div
        style={{
          width: 0,
          height: 0,
          borderTop: '50px solid transparent',
          'border-right': '100px solid red',
          'border-bottom': '50px solid transparent',
        }}
      >
        <div style={{ width: 100, height: 100, position: 'absolute', borderRadius: '50%' }}></div>
        <div style={{ width: 100, height: 100, position: 'absolute', borderRadius: '50%' }}></div>
      </div>
      <div></div>
    </Layout>
  )
}
