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
      <Toast.Header className={`py-2 text-white bg-${notificationType[type].class}`}>
        <strong className='me-auto'>{message}</strong>
      </Toast.Header>
    </Toast>
  )
}
