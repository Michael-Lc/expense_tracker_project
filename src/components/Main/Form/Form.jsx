import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useSpeechContext } from '@speechly/react-client'
import { useForm } from 'react-hook-form'

import { categories } from '../../../constants/categories'
import { useTransaction } from '../../../contexts/TransactionContext'
import { formatDate } from '../../../utils/utils'
import SubmitButton from '../../custom-buttons/SubmitButton'

export default function MainForm() {
  const defaultValues = {
    amount: '',
    category: '',
    type: 'income',
    date: formatDate(new Date()),
  }
  const { handleSubmit, register, formState: { error }, setValue, watch, reset } = useForm({ defaultValues })
  // const [formData, setFormData] = useState(defaultValues)
  const type = watch('type')
  const selectedCategories = categories[type]
  const { addTransaction } = useTransaction()
  const { segment } = useSpeechContext()
  const [loading, setLoading] = useState(false)
  // console.log(formData)

  async function onSubmit(formData) {
    if(Number.isNaN(Number(formData.amount)) || !formData.date.includes("-")) return

    try {
      setLoading(true)
      await addTransaction(formData)
      setLoading(false)
      reset(defaultValues)
    } catch(err) {
      setLoading(false)
      console.log(err)
    }
  }

  useEffect(() => {
    setValue('category', selectedCategories[0].type)
  }, [type])

  useEffect(() => {
    if(segment) {
      if(segment.intent.intent === 'add_expense') {
        setValue('type', 'expense')
      } else if(segment.intent.intent === 'add_income') {
        setValue('type', 'income')
      } else if(segment.isFinal && segment.intent.intent === 'create_transaction') {
        return onSubmit()
      } else if(segment.isFinal && segment.intent.intent === 'cancel_transaction') {
        return reset(defaultValues)
      }

      segment.entities.forEach((e) => {
        const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
        switch(e.type) {
          case 'amount':
            setValue('amount', e.value)
            break
          case 'category':
            if(categories.income.map((ic) => ic.type).includes(category)) {
              setValue('type', 'income')
              setValue('category', category)
            } else if(categories.expense.map((ec) => ec.type).includes(category)) {
              setValue('type', 'expense')
              setValue('category', category)
            }
            break
          case 'date':
            setValue('date', e.value)
            break
          default:
            break
        }
      })

      const formData = watch()
      if(segment.isFinal && Object.keys(formData).every(k => formData[k])) {
        onSubmit()
      }
    }
  }, [segment])

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className='m-0'>
        <Col xs='12'>
          {segment && segment.words.map(w => w.value).join(" ")}
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-2'>
            <Form.Label>Type</Form.Label>
            <Form.Select {...register('type', { required: true })}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-2'>
            <Form.Label>Category</Form.Label>
            <Form.Select {...register('category', { required: true })}>
              {selectedCategories.map((c, idx) => (
                <option value={c.type} key={idx}>{c.type}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-2'>
            <Form.Label>Amount</Form.Label>
            <Form.Control {...register('amount', { required: true })} type='number' />
          </Form.Group>
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-2'>
            <Form.Label>Date</Form.Label>
            <Form.Control {...register('date', { required: true })} type='date' />
          </Form.Group>
        </Col>


        <Col xs='12'>
          <Form.Group className='mt-2'>
            {/* <Button type='submit' variant='light' className='border border-secondary w-100'>Create</Button> */}
            <SubmitButton variant='secondary' loading={loading} className='border border-secondary w-100'>
              Create
            </SubmitButton>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}
