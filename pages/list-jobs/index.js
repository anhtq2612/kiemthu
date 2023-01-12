import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Button, Card, Input, Table } from 'antd'
import { useRouter } from 'next/router'
export default function ListJobs() {
  const [listJobs, setListJobs] = useState([])
  const [listSearch, setListSearch] = useState([])
  const [search, setSearch] = useState('')
  const router = useRouter()
  useEffect(() => {
    axios.get('https://nuxttestproject1-default-rtdb.firebaseio.com/datajob.json').then((res) => {
      if (res.data) {
        setListJobs(Object.keys(res.data).map((e) => ({ ...res.data[e], id: e })))
        setListSearch(Object.keys(res.data).map((e) => ({ ...res.data[e], id: e })))
      } else {
        setListJobs([])
      }
    })
  }, [])

  const onSearchTitle = (search, data) => {
    let filterData = []
    for (var i = 0; i < listSearch?.length; i++) {
      search = search.toLowerCase()
      var name = listSearch[i]?.name.toLowerCase()
      if (name?.includes(search)) {
        filterData.push(data[i])
      }
    }
    return filterData
  }

  useEffect(() => {
    let b = onSearchTitle(search, listSearch)
    setListJobs(b)
  }, [search])

  return (
    <Layout>
      <Card
        title={
          <div className="flex justify-between">
            <p className="font-semibold text-2xl">Danh sách công việc cần tuyển</p>
            <Button
              onClick={() => router.push('/list-jobs/create')}
              className="bg-purple-700 text-white"
            >
              Thêm mới
            </Button>
          </div>
        }
      >
        <div className='grid grid-cols-3 gap-x-5 mb-5'>
          <Input placeholder='Nhập job cần tìm...' value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {listJobs &&
            listJobs.map((job) => (
              <div
                className="p-4 hover:bg-slate-200 border-purple-700 border-2"
                key={job.id}
                onClick={() => router.push(`/list-jobs/${job.id}`)}
              >
                <p className="text-xl text-center text-blue-600">
                  Công ty <span className="text-xl font-semibold">{job.companyName}</span>
                </p>
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
