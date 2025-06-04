export default defineNuxtPlugin(async () => {
  // Initialize auth state on app start
  const { initialize } = useAuth()
  
  // Only run on client side
  if (process.client) {
    try {
      await initialize()
    } catch (error) {
      console.error('Auth initialization error:', error)
    }
  }
})
