import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap'
import { HiUserCircle } from "react-icons/hi";

import { useAuth } from '../contexts/AuthContext';

export default function User() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  // const [loading, setLoading] = useState(false)

  async function onLogout() {
    try {
      // setLoading(true)
      const res = await logout()
      // setLoading(false)
      navigate('/signin')
      console.log(res)
    } catch(err) {
      // setLoading(false)
      console.log(err)
    }
  }

  function onExport() {
    navigate('/exports')
  }

  return (
    <Dropdown align='end'>
      <Dropdown.Toggle variant='light'>
        <HiUserCircle className='fs-2' />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={onExport}>Export</Dropdown.Item>
        <Dropdown.Item onClick={onLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
