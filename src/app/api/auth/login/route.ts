import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    const apiResponse = await fetch(`${process.env.API_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await apiResponse.json()

    if (!apiResponse.ok) {
      return NextResponse.json(
        { message: data.message || 'Login failed' },
        { status: apiResponse.status }
      )
    }

    // Create response with user data and set the cookie
    const response = NextResponse.json({ user: data.user })
    response.cookies.set('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
    return response


  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
