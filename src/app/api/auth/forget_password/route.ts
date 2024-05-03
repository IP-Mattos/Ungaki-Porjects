import { connectMongoDB } from '@/libs/mongodb'
import { messages } from '@/utils/message'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/User'
import { Resend } from 'resend'
import jwt from 'jsonwebtoken'
import { EmailTemplate } from '@/components/Email_Template'

const resend = new Resend('re_F9njyv8V_5ZLpu92Ypok9LS77k68BGkgK')
export async function POST(request: NextRequest) {
  try {
    const body: { email: string } = await request.json()
    const { email } = body

    await connectMongoDB()
    const userFind = await User.findOne({ email })

    // Validate User
    if (!userFind) {
      return NextResponse.json(
        { message: messages.error.userNotFound },
        {
          status: 400
        }
      )
    }
    const tokenData = {
      email: userFind.email,
      userId: userFind._id
    }
    const token = jwt.sign({ data: tokenData }, 'secret', {
      expiresIn: 86400
    })

    const forgetUrl = `http://localhost:3000/change_password?token=${token}`
    // @ts-ignore
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Forget Password',
      react: EmailTemplate({ buttonUrl: forgetUrl })
    })
    return NextResponse.json(
      { message: messages.success.emailSent },
      {
        status: 200
      }
    )
  } catch (error) {
    return NextResponse.json(
      { message: messages.error.default },
      {
        status: 500
      }
    )
  }
}
