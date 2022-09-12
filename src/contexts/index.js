import React from 'react'

import { AuthProvider } from './AuthContext'
import { NotificationProvider } from './NotificationContext'
import { TransactionProvider } from './TransactionContext'

export default function Providers({ children }) {
  return (
    <>
      <AuthProvider>
        <NotificationProvider>
          <TransactionProvider>
            {children}
          </TransactionProvider>
        </NotificationProvider>
      </AuthProvider>
    </>
  )
}
