import { jwtVerify } from 'jose'

// Mock user database
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    name: 'Admin User',
    avatar: 'https://github.com/shadcn.png'
  },
  {
    id: 2,
    email: 'user@example.com',
    name: 'John Doe',
    avatar: 'https://github.com/vercel.png'
  }
]

export default defineEventHandler(async (event) => {
  // Add realistic delay
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const token = getCookie(event, 'auth-token')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No token provided'
    })
  }
  
  try {
    const secret = new TextEncoder().encode(process.env.NUXT_AUTH_SECRET || 'your-secret-here')
    const { payload } = await jwtVerify(token, secret)
    
    // Find user by ID from token
    const userId = parseInt(payload.sub as string)
    let user = users.find(u => u.id === userId)
    
    // If not found in mock database, create from token data
    if (!user) {
      user = {
        id: userId,
        email: payload.email as string,
        name: payload.name as string,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${payload.email}`
      }
    }
    
    return { user }
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }
})
