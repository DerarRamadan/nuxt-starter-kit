export default defineNuxtPlugin(async (nuxtApp) => {
  // This client-side plugin is crucial for initiating the authentication process
  // as soon as the application hydrates on the client. It calls useAuth().initialize()
  // which attempts to fetch the user's session. The 'initialized' flag set by
  // useAuth() is then used by route middleware to make informed redirect decisions.
  console.log('[AuthPlugin] Starting auth.client.ts plugin');
  const { initialize, initialized, status } = useAuth();
  
  // Only run on client side
  if (process.client) {
    try {
      console.log('[AuthPlugin] Before initialize() call. Current auth initialized status:', initialized.value);
      await initialize()
      console.log('[AuthPlugin] After initialize() call. Auth initialized status:', initialized.value, 'Auth status:', status.value);
    } catch (error) {
      console.error('[AuthPlugin] Auth initialization error in plugin:', error)
    }
  }
  console.log('[AuthPlugin] Finished auth.client.ts plugin');
})
