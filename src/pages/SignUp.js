import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useForm } from 'react-hooks-form'

export default function SignUp() {
  const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  }
  const [loading, setLoading] = useState(false)
  const { register, formState: { errors }, handleSubmit } = useForm({
    defaultValues,
    mode: 'all',
    // resolver: yupResolver(signUpSchema),
  });

  function onSubmit(data, e) {
    console.log(data)
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
              {/* {error && <Alert variant='danger'>{error}</Alert>} */}
              <Form.Group className='my-2' id="fname">
                {errors.first_name && <Alert variant='danger'>{errors.first_name.message}</Alert>}
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" {...register('name')}  required />
              </Form.Group>
              
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

              <Form.Group className='my-2' id="confirmPassword">
                {errors.confirmPassword && <Alert variant='danger'>{errors.confirmPassword.message}</Alert>}
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" {...register('confirmPassword')}  required />
              </Form.Group>

              <Button disabled={loading} className='w-100 my-3 rounded'>Create Account</Button>
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
