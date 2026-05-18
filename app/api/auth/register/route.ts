import { NextRequest, NextResponse } from 'next/server'
import { UserRole } from '@/lib/types'

// Mock database (in production, this would be a real database)
const registeredUsers: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role, facility } = await request.json()

    // Validate input
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user already exists (mock check)
    if (registeredUsers.some((u) => u.email === email)) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      )
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      password, // In production, this would be hashed
      name,
      role,
      facility,
      createdAt: new Date(),
    }

    registeredUsers.push(newUser)

    // Create session
    const sessionData = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      facility: newUser.facility,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }

    const response = NextResponse.json(
      {
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          facility: newUser.facility,
        },
        session: sessionData,
      },
      { status: 201 }
    )

    response.cookies.set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60,
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
