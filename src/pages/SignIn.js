import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Card, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import SubmitButton from '../components/custom-buttons/SubmitButton'

export default function SignIn() {
  const defaultValues = {
    email: '',
    password: '',
  }
  const navigate = useNavigate()
  const { signin } = useAuth()
  const [loading, setLoading] = useState(false)
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues,
    mode: 'all',
    // resolver: yupResolver(signUpSchema),
  });

  async function onSubmit(data, e) {

    try {
      setLoading(true)
      const res = await signin(data)
      setLoading(false)
      console.log(res)
      navigate('/')
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
            <h2 className="font-weight-normal text-center mb-4">Sign In</h2>
            <Form role='form' method='post' onSubmit={handleSubmit(onSubmit, onError)}>
              {/* {error && <Alert variant='danger'>{error}</Alert>} */}
              <Form.Group className='my-2' id="email">
                {errors.email && <Alert variant='danger'>{errors.email.message}</Alert>}
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" {...register('email')}  required />
              </Form.Group>

              <Form.Group className='my-2' id="password">
                {errors.password && <Alert variant='danger'>{errors.password.message}</Alert>}
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" {...register('password')}  required />
              </Form.Group>

              <SubmitButton loading={loading} className='w-100 my-3'>
                Sign In
              </SubmitButton>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to='/forgot-password'>Forgot password? </Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Don't Have An Account? <Link to='/signup'>Create an account</Link>
        </div>
      </div>
    </Container>
  )
}

