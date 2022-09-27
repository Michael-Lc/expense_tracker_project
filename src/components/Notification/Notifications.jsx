import React from 'react'
import { ToastContainer } from 'react-bootstrap'

import './styles.css'
import Notification from './Notification'

export default function Notifications({ notifications }) {
  return (
    <ToastContainer className='notifications-container'>
      {notifications.map((n, idx) => <Notification key={idx} type={n.type} message={n.message} id={idx} />)}
    </ToastContainer>
  )
}
