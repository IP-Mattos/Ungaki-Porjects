'use client'
import { Form } from '@/components/form'
import { useAuthFetch } from '@/hooks/useAuthFetch'
import { useLoading } from '@/hooks/useLoading'
import { AxiosRequestConfig } from 'axios'
import { useSearchParams } from 'next/navigation'

export default function ChangePasswordPage() {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const searchParams = useSearchParams()
  const authFetch = useAuthFetch()

  const token = searchParams.get('token')

  const options: AxiosRequestConfig<any> = {
    headers: {
      token
    }
  }

  const forgetPassword = async (formData: any) => {
    startLoading()
    await authFetch({
      endpoint: 'change_password',
      formData,
      redirectRoute: '/',
      options
    })
    finishLoading()
  }
  return (
    <>
      <Form onSubmit={forgetPassword} title='Recover Password' description={'Recover Password'}>
        <div className='my-[10px] flex flex-col gap-4'>
          <Form.Input label='Password' name='newPassword' placeholder='Password...' type='password' />
          <Form.Input label='Confirm Password' name='confirmPassword' placeholder='Password...' type='password' />
        </div>
        <Form.SubmitButton buttonText='Change Password' isLoading={isLoading} />
      </Form>
    </>
  )
}
