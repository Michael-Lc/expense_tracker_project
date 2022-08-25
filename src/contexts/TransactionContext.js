import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const TransactionContext = createContext([])

export function useTransaction() {
  return useContext(TransactionContext)
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([])

  function addTransaction(transaction) {
    setTransactions([ { id: uuidv4(), ...transaction }, ...transactions ])
  }

  function deleteTransaction(id) {
    const newData = transactions.filter(t => t.id !== id)
    setTransactions([ ...newData ])
  }

  const value = {
    transactions,
    addTransaction,
    deleteTransaction,
  }

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}