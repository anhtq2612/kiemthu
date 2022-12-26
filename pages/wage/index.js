import * as React from 'react'
import { useForm, useFormState } from 'react-hook-form'
import Layout from '../../components/Layout'

export default function App() {
  const { register, handleSubmit, control, isDirty } = useForm({
    defaultValues: {
      firstName: 'firstName',
    },
  })
  const { dirtyFields } = useFormState({
    control,
  })
  const onSubmit = (data) => console.log(data)
  console.log(dirtyFields)
  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('firstName')} placeholder="First Name" />
        {dirtyFields.firstName && <p>Field is dirty.</p>}

        <input type="submit" />
      </form>
    </Layout>
  )
}
