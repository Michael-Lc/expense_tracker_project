import { createContext, useContext, useState } from "react";
import { ToastContainer } from "react-bootstrap";

import Dialog from "../components/notifications/Dialog";
import Notification from "../components/notifications/Notification";

const NotificationContext = createContext()

export function useNotification() {
  return useContext(NotificationContext)
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [dialog, setDialog] = useState(null)
  
  const showNotification = (display, type, message) => {
    if(display === 'dialog') {
      setDialog({ type, message })
    } else {
      setNotifications([...notifications, {type, message}]);
    }
  }

  const closeNotification = (display) => {
    if(display === 'dialog') {
      setDialog(null)
    } else {
      const tempNs = notifications.filter((n, idx) => idx !== display)
      setNotifications([...tempNs]);
    }
  }

  const value = {
    showNotification,
    closeNotification
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {dialog && <Dialog message={dialog.message} type={dialog.type} />}
      <ToastContainer className='notifications-container'>
        {notifications.map((n, idx) => <Notification key={idx} type={n.type} message={n.message} id={idx} />)}
      </ToastContainer>
    </NotificationContext.Provider>
  );
}