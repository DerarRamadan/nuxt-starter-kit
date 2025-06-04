interface User {
  id: number
  email: string
  name: string
  avatar?: string
}

interface AuthData {
  user: User | null
}

export const useAuth = () => {
  const user = useState<User | null>('auth.user', () => null)
  const loading = useState('auth.loading', () => false)
  
  const status = computed(() => {
    if (loading.value) return 'loading'
    return user.value ? 'authenticated' : 'unauthenticated'
  })
  
  const data = computed(() => {
    return user.value ? { user: user.value } : null
  })
  
  // Sign in with credentials
  const signIn = async (provider: string, credentials: { email: string; password: string; redirect?: boolean }) => {
    if (provider !== 'credentials') {
      throw new Error('Only credentials provider is supported')
    }
    
    loading.value = true
    
    try {
      const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email: credentials.email,
          password: credentials.password
        }
      })
      
      if (response.user) {
        user.value = response.user
        return { error: null }
      }
      
      return { error: 'Invalid credentials' }
    } catch (error: any) {
      return { error: error.data?.statusMessage || 'Login failed' }
    } finally {
      loading.value = false
    }
  }
  
  // Sign out
  const signOut = async (options?: { callbackUrl?: string }) => {
    loading.value = true
    
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST'
      })
      
      user.value = null
      
      if (options?.callbackUrl) {
        await navigateTo(options.callbackUrl)
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      loading.value = false
    }
  }
  
  // Get current session
  const getSession = async () => {
    if (user.value) return user.value
    
    loading.value = true
    
    try {
      const response = await $fetch('/api/auth/me')
      user.value = response.user
      return response.user
    } catch (error) {
      user.value = null
      return null
    } finally {
      loading.value = false
    }
  }
  
  // Initialize auth state on app start
  const initialize = async () => {
    await getSession()
  }
  
  return {
    data,
    status,
    user: readonly(user),
    loading: readonly(loading),
    signIn,
    signOut,
    getSession,
    initialize
  }
}
