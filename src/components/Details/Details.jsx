import React from 'react'
import { Card } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'

import './styles.css'

export default function Details({ title }) {
  return (
    <Card className={`${title}`}>
      <Card.Header className='text-capitalize'>{title}</Card.Header>
      <Card.Body>
        <h5>$50</h5>
        {/* <Doughnut data={[]} /> */}
      </Card.Body>
    </Card>
  )
}
