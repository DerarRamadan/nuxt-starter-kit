import { SignJWT } from 'jose'

export default defineEventHandler(async (event) => {
  // Add realistic delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const body = await readBody(event)
  const { email, password, name } = body
  
  if (!email || !password || !name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email, password, and name are required'
    })
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format'
    })
  }
  
  // Mock: Check if user already exists
  if (email === 'admin@example.com' || email === 'user@example.com') {
    throw createError({
      statusCode: 409,
      statusMessage: 'User already exists'
    })
  }
  
  // Create new user (in real app, save to database)
  const newUser = {
    id: Math.floor(Math.random() * 1000) + 100,
    email,
    name,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
  }
  
  // Generate JWT token
  const secret = new TextEncoder().encode(process.env.NUXT_AUTH_SECRET || 'your-secret-here')
  const token = await new SignJWT({ 
    sub: newUser.id.toString(),
    email: newUser.email,
    name: newUser.name
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
    user: newUser,
    token
  }
})
