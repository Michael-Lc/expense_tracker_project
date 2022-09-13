import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Card, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import SubmitButton from '../components/custom-buttons/SubmitButton'
import { useAuth } from '../contexts/AuthContext'

export default function ForgotPassword() {
  const defaultValues = {
    email: '',
  }
  const { resetPassword } = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues,
    mode: 'all',
    // resolver: yupResolver(signUpSchema),
  });

  async function onSubmit(data, e) {
    try {
      setLoading(true)
      setMessage("")
      const res = await resetPassword(data)
      setLoading(false)
      setMessage('Please check your email for further instructions')
      console.log(res)
    } catch(err) {
      setLoading(false)
      console.log(err)
    }
  }

  const onError = (errors, e) => console.log(errors, e);

  return (
    <Container className="auth-layout d-flex justify-content-center align-items-center p-2" style={{minHeight: '100vh'}}>
      <div className="w-100" style={{maxWidth: '400px'}}>
        <Card className='shadow-sm pt-3'>
          {/* <div className="d-flex justify-content-center">
            <IconRound />
          </div> */}
          <Card.Body>
            <h2 className="font-weight-normal text-center mb-4">Reset Password</h2>
            <Form role='form' method='post' onSubmit={handleSubmit(onSubmit, onError)}>
              {message && <Alert variant='success'>{message}</Alert>}
              <Form.Group className='my-2' id="email">
                {errors.email && <Alert variant='danger'>{errors.email.message}</Alert>}
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" {...register('email')}  required />
              </Form.Group>

              <SubmitButton loading={loading} className='w-100 my-3'>
                Reset password
              </SubmitButton>
              <div className="w-100 text-center mt-3">
                <Link to='/signin'>Sign in</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}


