export default defineNuxtRouteMiddleware((to) => {
  const { status, initialized } = useAuth();

  if (process.server) {
    // On the server, status is initially 'unauthenticated' before client-side plugin runs.
    // If we redirect here, we send the login page HTML for a protected route,
    // causing hydration mismatch when the client quickly authenticates and navigates back.
    // So, for server-side, we let the requested page (e.g., dashboard) render.
    // The client-side will then run auth.client.ts, update status,
    // and client-side middleware logic below will do its job if a redirect is still needed.
    // console.log(`[AuthMW] Server: Path: ${to.path}, Status: ${status.value}. Allowing request to proceed for SSR.`);
    return;
  }

  // Client-side logic below
  if (!initialized.value) {
    // console.log('[AuthMW] Client: Auth not initialized. Waiting for plugin.');
    return; // Wait for auth.client.ts plugin to set initialized to true
  }

  // If auth status is still 'loading' (e.g., getSession is re-called), wait.
  if (status.value === 'loading') {
    // console.log('[AuthMW] Client: Auth status is loading. Waiting.');
    return;
  }

  if (status.value === 'unauthenticated') {
    // Ensure this middleware is actually for a route that requires authentication.
    // This check might need to be more robust, e.g., checking to.meta.requiresAuth or similar.
    // For now, assuming if this middleware is active, the route is protected.
    // console.log(`[AuthMW] Client: Unauthenticated for route ${to.path} after init. Redirecting to login.`);
    return navigateTo('/auth/login', { replace: true });
  }

  // If status.value is 'authenticated', do nothing, allow access.
  // console.log(`[AuthMW] Client: Authenticated for route ${to.path}. Allowing access.`);
});
