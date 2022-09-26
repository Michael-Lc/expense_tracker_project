import { createContext, useContext, useEffect, useState } from "react";

import { auth } from '../firebase'

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
      try {
        await user.user.updateProfile({
          displayName: body.name,
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

  async function signin(body) {
    try {
      const user = await auth.signInWithEmailAndPassword(body.email, body.password)
      // console.log(user)
      setCurrentUser(user.user)
      return true
    } catch (err) {
      console.log(err.message)
      return false
    } 
  }

  async function resetPassword(data) {
    try {
      await auth.sendPasswordResetEmail(data.email)
      return true
    } catch (err) {
      console.log(err.message)
      return false
    } 
  }

  async function updateAccount(data) {
    const promises = []
    if(data.password !== '') {
      promises.push(currentUser.updatePassword(data.password))
    }

    if(data.name !== currentUser.displayName) {
      promises.push(currentUser.updateProfile({ displayName: data.name })) 
    }

    if(data.email !== currentUser.email) {
      promises.push(currentUser.updateEmail(data.email)) 
    }

    try {
      const res = await Promise.all(promises)
      console.log(res)
      return true
    } catch (err) {
      console.log(err)
      return false
    } 
  }

  async function logout() {
    try {
      await auth.signOut()
      return true
    } catch(err) {
      console.log(err)
      return false
    }
  }

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setInitialLoading(false)
    })
    return unSubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    signin,
    logout,
    resetPassword,
    updateAccount,
  }

  return (
    <AuthContext.Provider value={value}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
}






