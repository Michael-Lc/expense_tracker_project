import { createContext, useContext, useEffect, useState } from "react";

import { firestore, timestamp } from "../firebase";
import { useAuth } from "./AuthContext";
import { useNotification } from "./NotificationContext";

const TransactionContext = createContext([])

export function useTransaction() {
  return useContext(TransactionContext)
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()
  const { showNotification } = useNotification()

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
      showNotification('success', 'Successfully created')
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
      showNotification('success', 'Successfully deleted')
      return true
    } catch(err) {
      console.log(err)
      return false
    }
  }

  async function getAllTransactions(id) {
    try {
      const docs = await firestore.collection("transactions").where("user_id", "==", currentUser.uid).orderBy('date_created', 'desc').get()
      if(!docs.empty) {
        const docData = []
        docs.forEach(doc => docData.push(doc.data()))
        setTransactions([...docData])
      }
      return true
    } catch(err) {
      setLoading(false)
      console.log(err)
      return false
    }
  }

  useEffect(() => {
    if(currentUser) {
      getAllTransactions()
      .then(res => {
        if(res) setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [currentUser])
  

  const value = {
    transactions,
    balance,
    addTransaction,
    deleteTransaction,
  }

  return (
    <TransactionContext.Provider value={value}>
      {!loading && children}
    </TransactionContext.Provider>
  );
}