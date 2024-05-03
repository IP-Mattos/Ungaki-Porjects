'use client'
import { Form } from '@/components/form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'

export default function ForgetPasswordPage() {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const authFetch = useAuthFetch()

  const forgetPassword = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'forget_password',
      formData
    })
    finishLoading()
  }
  return (
    <>
      <Form onSubmit={forgetPassword} title='Recover Password' description={'Recover Password'}>
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input label='Email' name='email' placeholder='Email...' type='text' />
        </div>
        <Form.SubmitButton buttonText='Recover Password' isLoading={isLoading} />
        <Form.Footer description='Login?' textLink='Login' link='/' />
      </Form>
    </>
  )
}
