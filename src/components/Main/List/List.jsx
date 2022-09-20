import React from 'react'
import { Button, Col, Collapse, ListGroup } from 'react-bootstrap'
import { MdMoneyOffCsred, MdOutlineAttachMoney } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'

import { useTransaction } from '../../../contexts/TransactionContext'

import './styles.css'

export default function List() {
  const { transactions, deleteTransaction } = useTransaction()
  // console.log(transactions)

  return (
    <ListGroup variant="flush" className='transactions_list'>
      {transactions.map((transaction) => (
        <Collapse in mountOnEnter unmountOnExit key={transaction.id}>
          <ListGroup.Item className='d-flex m-0'>
            <Col xs='2' className='d-flex align-items-center'>
              {/* Icon */}
              {transaction.type === 'income' ? 
              <MdOutlineAttachMoney className='fs-2 text-success' />
              : <MdMoneyOffCsred className='fs-2 text-danger' />}
            </Col>
            <Col xs='8'>
              <h5 className='text-capitalize'>{transaction.category}</h5> 
              ${transaction.amount} - {transaction.date}
            </Col>
            <Col xs='2' className='d-flex align-items-center'>
              {/* Delete Button */}
              <Button onClick={() => deleteTransaction(transaction.id)} className='fs-3' variant='light'>
                <AiTwotoneDelete className='text-secondary' />
              </Button>
            </Col>
          </ListGroup.Item>
        </Collapse>
      ))}
    </ListGroup>
  )
}
