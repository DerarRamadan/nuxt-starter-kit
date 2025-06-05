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
  const initialized = useState<boolean>('auth.initialized', () => false)
  
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
    console.log('[Auth] getSession: Start. Current user:', user.value, 'Initialized:', initialized.value);
    // if (user.value && initialized.value) return user.value; // Potential optimization: only return if already initialized and user exists
    
    loading.value = true
    
    try {
      if (process.client) {
        const token = document.cookie.includes('auth-token'); // Simple client-side cookie check
        console.log('[Auth] getSession: auth-token cookie present on client?', token);
      }
      const response = await $fetch('/api/auth/me')
      console.log('[Auth] getSession: API success, user from response:', response.user);
      user.value = response.user
      return response.user
    } catch (error) {
      console.error('[Auth] getSession: API error or no user', error);
      user.value = null
      return null
    } finally {
      loading.value = false
      // The 'initialized' flag is crucial for coordinating with route middleware.
      // It's set to true here after the *first* attempt to get the session (via initialize()),
      // regardless of whether authentication was successful. 
      // Middleware waits for this flag before making redirect decisions on the client-side.
      if (!initialized.value) {
        initialized.value = true 
        console.log('[Auth] getSession: Initialized flag SET to true.');
      }
      console.log('[Auth] getSession: End. New user state:', user.value, 'Status:', status.value, 'Initialized:', initialized.value);
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
    initialize,
    initialized: readonly(initialized)
  }
}
