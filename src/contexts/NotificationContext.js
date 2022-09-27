import { createContext, useContext, useState } from "react";

import Notifications from "../components/Notification/Notifications";

const NotificationContext = createContext()

export function useNotification() {
  return useContext(NotificationContext)
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  
  const showNotification = (type, message) => {
    setNotifications([...notifications, {type, message}]);
  }

  const closeNotification = (id) => {
    const tempNs = notifications.filter((n, idx) => idx !== id)
    setNotifications([...tempNs]);
  }

  const value = {
    showNotification,
    closeNotification
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Notifications notifications={notifications} />
      {/* <ToastContainer className='notifications-container'>
        {notifications.map((n, idx) => <Notification key={idx} type={n.type} message={n.message} id={idx} />)}
      </ToastContainer> */}
    </NotificationContext.Provider>
  );
}