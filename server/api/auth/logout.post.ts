export default defineEventHandler(async (event) => {
  // Add realistic delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // Clear the auth cookie
  setCookie(event, 'auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0 // Expire immediately
  })
  
  return {
    message: 'Logged out successfully'
  }
})
