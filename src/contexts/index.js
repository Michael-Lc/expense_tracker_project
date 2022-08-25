import React from 'react'

import { TransactionProvider } from './TransactionContext'

export default function Providers({ children }) {
  return (
    <TransactionProvider>
      {children}
    </TransactionProvider>
  )
}
