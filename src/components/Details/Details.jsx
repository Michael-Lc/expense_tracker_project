import React from 'react'
import { Card } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

import './styles.css'

import useTransactions from '../../hooks/useTransactions'

export default function Details({ title }) {
  const { total, chartData } = useTransactions(title)

  return (
    <Card className={`${title}`}>
      <Card.Header className='text-capitalize'>{title}</Card.Header>
      <Card.Body>
        <h5>${total}</h5>
        <Doughnut data={chartData} />
      </Card.Body>
    </Card>
  )
}
