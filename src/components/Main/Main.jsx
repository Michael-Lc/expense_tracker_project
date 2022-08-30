import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import { useTransaction } from '../../contexts/TransactionContext'

import MainForm from './Form/Form'
import InfoCard from '../InfoCard'
import List from './List/List'

export default function Main() {
  const { balance } = useTransaction()

  return (
    <Card className="root">
      <Card.Header>
        <h4>Expense Tracker</h4>
        <h5 className='fw-normal'>Powered by Speechly</h5>
      </Card.Header>
      <Card.Body>
        <h5 className='text-center'>Total Balance ${balance}</h5>
        <InfoCard />
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
