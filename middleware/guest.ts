export default defineNuxtRouteMiddleware((to) => {
  const { status, initialized } = useAuth();

  if (process.server) {
    // On server, status is initially 'unauthenticated'.
    // If user requests /auth/login, let it render. Client will sort out if already authed.
    // console.log(`[GuestMW] Server: Path: ${to.path}, Status: ${status.value}. Allowing request to proceed for SSR.`);
    return;
  }

  // Client-side logic below
  if (!initialized.value) {
    // console.log('[GuestMW] Client: Auth not initialized. Waiting for plugin.');
    return; // Wait for auth.client.ts plugin to set initialized to true
  }

  // If auth status is still 'loading', wait.
  if (status.value === 'loading') {
    // console.log('[GuestMW] Client: Auth status is loading. Waiting.');
    return;
  }

  if (status.value === 'authenticated') {
    // console.log(`[GuestMW] Client: Authenticated. Trying to access guest route ${to.path} after init. Redirecting to dashboard.`);
    return navigateTo('/dashboard', { replace: true });
  }

  // If status.value is 'unauthenticated', do nothing, allow access to guest page.
  // console.log(`[GuestMW] Client: Unauthenticated for guest route ${to.path}. Allowing access.`);
});
