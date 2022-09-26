import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../../contexts/AuthContext'

export default function RequireAuth() {
  const { currentUser } = useAuth()

  if(!currentUser) {
    return <Navigate to='/signin' />
  }

  return (
    <Outlet />
  )
}
