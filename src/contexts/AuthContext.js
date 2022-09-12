import { createContext, useContext, useEffect, useState } from "react";

import { auth, firestore } from '../firebase'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [initialLoading, setInitialLoading] = useState(true)
  // const navigate = useNavigate()

  async function signup(body) {
    try {
      const user = await auth.createUserWithEmailAndPassword(body.email, body.password)
      const newUser = firestore.collection("users").doc(user.user.uid);
      try {
        await newUser.set({
          id: user.user.uid,
          name: body.name,
          email: body.email,
        })
        return true
      } catch (err) {
        console.log(err.message)
        return false
      }
    } catch (err) {
      console.log(err.message)
      return false
    } 
  }

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    return unSubscribe
  }, [])

  const value = {
    currentUser,
    signup
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






