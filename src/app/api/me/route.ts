import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('access_token')?.value
    
    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      )
    }



    const response = await fetch(`${process.env.API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch user data' },
        { status: response.status }
      )
    }

    const userData = await response.json()
    return NextResponse.json(userData)
  } catch (error) {
    console.error('Me endpoint error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
