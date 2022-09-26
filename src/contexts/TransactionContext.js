import { createContext, useContext, useEffect, useState } from "react";

import { firestore, timestamp } from "../firebase";
import { useAuth } from "./AuthContext";

const TransactionContext = createContext([])

export function useTransaction() {
  return useContext(TransactionContext)
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const { currentUser } = useAuth()

  const balance = transactions.reduce((acc, curr) => {
    return (curr.type === 'expense' ? acc - (parseFloat(curr.amount) || 0) : acc + (parseFloat(curr.amount) || 0))
  }, 0)

  async function addTransaction(transaction) {
    const newPost = firestore.collection("transactions").doc();
    transaction.id = newPost.id;
    transaction.user_id = currentUser.uid
    transaction.date_created = timestamp.now()

    try {
      await newPost.set(transaction)
      setTransactions([ { ...transaction }, ...transactions ])
      return true
    } catch(err) {
      console.log(err)
      return false
    }
  }

  async function deleteTransaction(id) {
    try {
      await firestore.collection("transactions").doc(id).delete()
      const newData = transactions.filter(t => t.id !== id)
      setTransactions([ ...newData ])
      return true
    } catch(err) {
      console.log(err)
      return false
    }
  }

  async function getAllTransactions(id) {
    try {
      const docs = await firestore.collection("transactions").orderBy('date_created', 'desc').get()
      if(!docs.empty) {
        docs.forEach(doc => console.log(doc.data()))
      }
      // const newData = transactions.filter(t => t.id !== id)
      // setTransactions([ ...newData ])
      return true
    } catch(err) {
      console.log(err)
      return false
    }
  }

  useEffect(() => {
    getAllTransactions()
  }, [])
  

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