import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid'

const TransactionContext = createContext([])

export function useTransaction() {
  return useContext(TransactionContext)
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([])

  const balance = transactions.reduce((acc, curr) => {
    return (curr.type === 'expense' ? acc - (parseFloat(curr.amount) || 0) : acc + (parseFloat(curr.amount) || 0))
  }, 0)

  function addTransaction(transaction) {
    setTransactions([ { id: uuidv4(), ...transaction }, ...transactions ])
  }

  function deleteTransaction(id) {
    const newData = transactions.filter(t => t.id !== id)
    setTransactions([ ...newData ])
  }

  const value = {
    transactions,
    balance,
    addTransaction,
    deleteTransaction,
  }

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}