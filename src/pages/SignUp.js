import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Card, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

import { useAuth } from '../contexts/AuthContext'
import SubmitButton from '../components/custom-buttons/SubmitButton'

export default function SignUp() {
  const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const { register, setError, formState: { errors }, handleSubmit } = useForm({
    defaultValues,
    mode: 'all',
    // resolver: yupResolver(signUpSchema),
  });

  async function onSubmit(data, e) {
    if(data.password !== data.confirmPassword) {
      return setError("confirmPassword", { type: "focus", message: "Passwords do not match" }, { shouldFocus: true })
    }

    try {
      setLoading(true)
      const res = await signup(data)
      setLoading(false)
      navigate('/')
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
            <h2 className="font-weight-normal text-center mb-4">Create An Account</h2>
            <Form role='form' method='post' onSubmit={handleSubmit(onSubmit, onError)}>
              <Form.Group className='my-2' id="fname">
                {errors.name && <Alert variant='danger'>{errors.name.message}</Alert>}
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" {...register('name', { required: 'Please fill this field' })} />
              </Form.Group>
              
              <Form.Group className='my-2' id="email">
                {errors.email && <Alert variant='danger'>{errors.email.message}</Alert>}
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" {...register('email', { required: 'Please fill this field' })} />
              </Form.Group>

              <Form.Group className='my-2' id="password">
                {errors.password && <Alert variant='danger'>{errors.password.message}</Alert>}
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" {...register('password', { required: 'Please fill this field', minLength: { value: 6, message: "Password must contain at least 6 characters" } })} />
              </Form.Group>

              <Form.Group className='my-2' id="confirmPassword">
                {errors.confirmPassword && <Alert variant='danger'>{errors.confirmPassword.message}</Alert>}
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" {...register('confirmPassword', { required: 'Please fill this field' })} />
              </Form.Group>

              <SubmitButton loading={loading} className='w-100 my-3'>
                Create Account
              </SubmitButton>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already Have An Account? <Link to='/signin'>Sign In</Link>
        </div>
      </div>
    </Container>
  )
}
