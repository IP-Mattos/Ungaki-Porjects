import { NextRequest, NextResponse } from 'next/server'
import { connectMongoDB } from '@/libs/mongodb'
import User, { IUser } from '@/models/User'
import { messages } from '@/utils/message'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export async function POST(request: NextRequest) {
  try {
    await connectMongoDB()
    const body: IUser = await request.json()
    const { email, password } = body
    //validate all fields
    if (!email || !password) {
      return NextResponse.json(
        {
          message: messages.error.needProps
        },
        {
          status: 400
        }
      )
    }
    //find user by email
    const userFind = await User.findOne({ email })
    if (!userFind) {
      return NextResponse.json(
        {
          message: messages.error.userNotFound
        },
        { status: 400 }
      )
    }
    //compare passwords

    const isCorrect: boolean = await bcrypt.compare(password, userFind.password)
    if (!isCorrect) {
      return NextResponse.json(
        {
          message: messages.error.incorrectPassword
        },
        {
          status: 400
        }
      )
    }
    const { password: userPass, ...rest } = userFind._doc
    const token = jwt.sign({ data: rest }, 'secret', {
      expiresIn: 86400
    })

    const response = NextResponse.json(
      { userLogged: rest, mesage: messages.success.loginSuccess, token },
      {
        status: 200
      }
    )
    response.cookies.set('auth_cookie', token, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400,
      path: '/'
    })
    return response
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
