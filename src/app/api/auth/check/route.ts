import { messages } from '@/utils/message'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import jwt from 'jsonwebtoken'
import { connectMongoDB } from '@/libs/mongodb'
import User from '@/models/User'

export async function GET() {
  try {
    const headerList = headers()
    const token = headerList.get('token')
    //validate token
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

      await connectMongoDB()
      const userFind = await User.findById(data._id)
      //validate User
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
      return NextResponse.json(
        {
          isAuthorized: true,
          message: messages.success.authorized
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
        status: 400
      }
    )
  }
}
