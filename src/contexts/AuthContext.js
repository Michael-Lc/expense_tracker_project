import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from '../firebase'


const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}


export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const navigate = useNavigate()

  function signup(body) {
    auth.createUserWithEmailAndPassword(body.email, body.password)
  }

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    return unSubscribe
  }, [])

  const value = {
    currentUser,
    loading,
  }

  useEffect(() => {
    const user = localStorage.getItem('user')
    if(user) {
      const userData = JSON.parse(user)
      // handleSetUser(userData)
      // setUser({ ...userData, isValidated: true })
      // localStorage.removeItem('user')
    }
    if(!user) {
      const tempUser = {
        "user_id": "d36f3737-7304-4756-82b2-1a0bf95580a3",
        "name": "John",
        "email": "johndoe565@gmail.com",
        "date_joined": "Mon, 13 Jun 2022 19:06:04 GMT"
      }

      // handleSetUser(tempUser)
    }
    setInitialLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
}






