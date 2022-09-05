import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'
import { useNotification } from '../../contexts/NotificationContext'

export default function Notification({ type, message, id }) {
  const { closeNotification } = useNotification()
  const [show] = useState(true)
  const notificationType =  {
    error: {
      class: 'danger',
    },
    success: {
      class: 'success',
    },
    info: {
      class: 'info',
    },
  }

  function onClose() {
    closeNotification(id)
  }

  return (
    <Toast bg={notificationType[type].class} show={show} onClose={onClose} delay={5000} autohide>
      <Toast.Header>
        <strong className='me-auto text-dark'>PrincipalBooks</strong>
        <small>just now</small>
      </Toast.Header>
      <Toast.Body className='text-white'>
        {message}
      </Toast.Body>
    </Toast>
  )
}
