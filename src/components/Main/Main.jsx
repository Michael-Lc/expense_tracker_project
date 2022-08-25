import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import MainForm from './Form/Form'
import List from './List/List'

export default function Main() {
  return (
    <Card className="root">
      <Card.Header>
        <h4>Expense Tracker</h4>
        <h5 className='fw-normal'>Powered by Speechly</h5>
      </Card.Header>
      <Card.Body>
        <h5 className='text-center'>Total Balance $100</h5>
        <span>
          Try saying: Add income for $100 in Category Salary for Monday
        </span>
        <hr />
        <MainForm />
      </Card.Body>
      <Card.Body>
        <Row className='m-0'>
          <Col xs='12'>
            <List />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
