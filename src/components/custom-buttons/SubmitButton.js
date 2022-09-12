import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

export default function SubmitButton({ loading, children, ...props }) {
  return (
    <Button type='submit' {...props} disabled={loading}>
      {loading && <Spinner size='sm' className='mx-2' animation='border' variant='light' />}
      {children}
    </Button>
  )
}