import { NextRequest, NextResponse } from 'next/server'
import { connectMongoDB } from '@/libs/mongodb'
import { messages } from '@/utils/message'
import { headers } from 'next/headers'
import User from '@/models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

interface BodyProps {
  newPassword: string
  confirmPassword: string
}
export async function POST(request: NextRequest) {
  try {
    const body: BodyProps = await request.json()

    const { newPassword, confirmPassword } = body
    console.log(body)
    //Validate Fields
    if (!newPassword || !confirmPassword) {
      return NextResponse.json(
        {
          message: messages.error.needProps
        },
        {
          status: 400
        }
      )
    }

    connectMongoDB()

    const headerList = headers()
    const token = headerList.get('token')
    //Verify Token
    if (!token) {
      return NextResponse.json(
        {
          message: messages.error.notAuthorized
        },
        {
          status: 400
        }
      )
    }
    try {
      const isTokenValid = jwt.verify(token, 'secret')

      const { data }: any = isTokenValid
      const userFind = await User.findById(data.userId)
      // Validate User
      if (!userFind) {
        return NextResponse.json(
          {
            message: messages.error.userNotFound
          },
          {
            status: 400
          }
        )
      }
      //Validate Password
      if (newPassword !== confirmPassword) {
        return NextResponse.json(
          {
            message: messages.error.passwordNotMatch
          },
          {
            status: 400
          }
        )
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)
      userFind.password = hashedPassword
      await userFind.save()
      return NextResponse.json(
        {
          message: messages.success.passwordChanged
        },
        {
          status: 200
        }
      )
    } catch (error) {
      return NextResponse.json(
        {
          message: messages.error.tokenNotValid
        },
        {
          status: 400
        }
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: messages.error.default
      },
      {
        status: 500
      }
    )
  }
}
