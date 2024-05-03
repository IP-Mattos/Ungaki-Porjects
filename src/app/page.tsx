'use client'
import { Form } from '@/components/form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'

export default function LoginPage() {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const authFetch = useAuthFetch()

  const login = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'login',
      redirectRoute: '/home',
      formData
    })
    finishLoading()
  }
  return (
    <>
      <Form onSubmit={login} title='Login' description={'Login to page'}>
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input label='Email' name='email' placeholder='Email...' type='text' />
          <Form.Input label='Password' name='password' placeholder='Password...' type='password' />
        </div>
        <Form.SubmitButton buttonText='Login' isLoading={isLoading} />
        <Form.Footer description='Forgot your password?' textLink='Recover password' link='/forget_password' />
        <Form.Footer description='Create Account' textLink='Sign In' link='/register' />
      </Form>
    </>
  )
}
