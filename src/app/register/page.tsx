'use client'
import { Form } from '@/components/form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'

export default function RegisterPage() {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const authFetch = useAuthFetch()

  const register = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'register',
      redirectRoute: '/',
      formData
    })
    finishLoading()
  }
  return (
    <>
      <Form onSubmit={register} title='Create Account' description={'Create Account'}>
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input label='Email' name='email' placeholder='Email...' type='text' />
          <Form.Input label='Password' name='password' placeholder='Password...' type='password' />
          <Form.Input label='Confirm Password' name='confirmPassword' placeholder='Password...' type='password' />
        </div>
        <Form.SubmitButton buttonText='Create Account' isLoading={isLoading} />
        <Form.Footer description='Already have account?' textLink='Login' link='/' />
      </Form>
    </>
  )
}
