import { SignJWT } from 'jose'

// Mock user database
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'password',
    name: 'Admin User',
    avatar: 'https://github.com/shadcn.png'
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'password',
    name: 'John Doe',
    avatar: 'https://github.com/vercel.png'
  }
]

export default defineEventHandler(async (event) => {
  // Add realistic delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const body = await readBody(event)
  const { email, password } = body
  
  if (!email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }
  
  // Find user
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }
  
  // Generate JWT token
  const secret = new TextEncoder().encode(process.env.NUXT_AUTH_SECRET || 'your-secret-here')
  const token = await new SignJWT({ 
    sub: user.id.toString(),
    email: user.email,
    name: user.name
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret)
  
  // Set httpOnly cookie
  setCookie(event, 'auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 // 24 hours
  })
  
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar
    },
    token
  }
})
