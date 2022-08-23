import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

export default function MainForm() {
  return (
    <Form>
      <Row className='m-0'>
        <Col xs='12'>
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-3'>
            <Form.Label>Type</Form.Label>
            <Form.Select>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-2'>
            <Form.Label>Category</Form.Label>
            <Form.Select>
              <option value="business">business</option>
              <option value="salary">salary</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-2'>
            <Form.Label>Amount</Form.Label>
            <Form.Control type='number' />
          </Form.Group>
        </Col>

        <Col xs='6'>
          <Form.Group className='mt-2'>
            <Form.Label>Date</Form.Label>
            <Form.Control type='date' />
          </Form.Group>
        </Col>


        <Col xs='12'>
          <Form.Group className='mt-2'>
            <Button variant='light' className='border-secondary w-100'>Create</Button>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )
}
