import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Button, Card, Table } from 'antd'
import { useRouter } from 'next/router'
export default function ListJobs() {
  const [listJobs, setListJobs] = useState([])
  const router = useRouter()
  useEffect(() => {
    axios
      .get('https://nuxttestproject1-default-rtdb.firebaseio.com/datajob.json')
      .then((res) => setListJobs(Object.keys(res.data).map((e) => ({ ...res.data[e], id: e }))))
  }, [])

  return (
    <Layout>
      <Card title={<div className='flex justify-between'>
        <p className="font-semibold text-2xl">Danh sách công việc cần tuyển</p>
        <Button
          onClick={() => router.push('/list-jobs/create')}
          className="bg-purple-700 text-white"
        >
          Thêm mới
        </Button>
      </div>}>
      <div className="grid grid-cols-3 gap-10">
        {listJobs &&
          listJobs.map((job) => (
            <div
              className="p-4 hover:bg-slate-200 border-purple-700 border-2"
              key={job.id}
              onClick={() => router.push(`/list-jobs/${job.id}`)}
            >
              <p className='text-xl text-center text-blue-600'>Công ty <span className='text-xl font-semibold'>{job.companyName}</span></p>
              <img src={job.image} alt="a" className="w-full h-48 object-contain" />
              <div>
                <h2>{job.name}</h2>
                <p>Số lượng cần tuyển: {job.quantity ?? 3}</p>
                <p>Khoảng lương: {job.range}</p>
              </div>
              <div className="flex gap-x-2">
                <p>Thời gian tuyển dụng:</p>
                <div className="flex gap-x-10">
                  <p>{new Date(job.startDate).toLocaleDateString()}</p>
                  <p>{new Date(job.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      </Card>
    </Layout>
  )
}
