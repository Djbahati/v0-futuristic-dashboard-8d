import { NextRequest, NextResponse } from 'next/server'
import { User, UserRole } from '@/lib/types'

// Mock database of users
const mockUsers = [
  {
    id: '1',
    email: 'doctor@ineza.rw',
    password: 'password123', // In production, this would be hashed
    name: 'Dr. Jean Munyarugerero',
    role: UserRole.Doctor,
    facility: 'Central Hospital Kigali',
  },
  {
    id: '2',
    email: 'nurse@ineza.rw',
    password: 'password123',
    name: 'Nurse Alice Habimana',
    role: UserRole.Nurse,
    facility: 'District Hospital Muhanga',
  },
  {
    id: '3',
    email: 'pharmacist@ineza.rw',
    password: 'password123',
    name: 'Pharmacist Robert Kabanda',
    role: UserRole.Pharmacist,
    facility: 'Health Center Kimironko',
  },
  {
    id: '4',
    email: 'admin@ineza.rw',
    password: 'password123',
    name: 'Admin System',
    role: UserRole.Admin,
    facility: 'Central Hospital Kigali',
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Find user
    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Create session (in production, this would be stored in a database)
    const sessionData = {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      facility: user.facility,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    }

    // Create response with session cookie
    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          facility: user.facility,
        },
        session: sessionData,
      },
      { status: 200 }
    )

    // Set session cookie (HTTP-only in production)
    response.cookies.set('session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
