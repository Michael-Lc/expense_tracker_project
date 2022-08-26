import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useSpeechContext } from '@speechly/react-client'

import { categories } from '../../../constants/categories'
import { useTransaction } from '../../../contexts/TransactionContext'
import { formatDate } from '../../../utils/utils'

export default function MainForm() {
  const defaultValues = {
    amount: '',
    category: '',
    type: 'income',
    date: formatDate(new Date()),
  }
  const [formData, setFormData] = useState(defaultValues)
  const { addTransaction } = useTransaction()
  const { segment } = useSpeechContext()
  const selectedCategories = categories[formData.type]

  function onSubmit() {
    addTransaction(formData)
    setFormData(defaultValues)
  }

  useEffect(() => {
    if(segment) {
      if(segment.intent.intent === 'add_expense') {
        setFormData({ ...formData, type: 'expense' })
      } else if(segment.intent.intent === 'add_income') {
        setFormData({ ...formData, type: 'income' })
      } else if(segment.isFinal && segment.intent.intent === 'create_transaction') {
        return onSubmit()
      } else if(segment.isFinal && segment.intent.intent === 'cancel_transaction') {
        return setFormData(defaultValues)
      }
    }
  }, [segment])

  return (
    <Form>
      <Row className='m-0'>
        <Col xs='12'>
          {segment && segment.words.map(w => w.value).join(" ")}
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-2'>
            <Form.Label>Type</Form.Label>
            <Form.Select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-2'>
            <Form.Label>Category</Form.Label>
            <Form.Select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
              {selectedCategories.map((c, idx) => (
                <option value={c.type} key={idx}>{c.type}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-2'>
            <Form.Label>Amount</Form.Label>
            <Form.Control value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} type='number' />
          </Form.Group>
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-2'>
            <Form.Label>Date</Form.Label>
            <Form.Control value={formData.date} onChange={e => setFormData({ ...formData, date: formatDate(e.target.value) })} type='date' />
          </Form.Group>
        </Col>


        <Col xs='12'>
          <Form.Group className='mt-2'>
            <Button type='button' onClick={onSubmit} variant='light' className='border-secondary w-100'>Create</Button>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}
