<template>
  <ClientOnly>
    <!-- Default slot for authenticated content -->
    <template v-if="auth.status.value === 'authenticated' && auth.initialized.value">
      <slot />
    </template>
    <!-- Slot for when user is not authenticated -->
    <template v-else-if="auth.status.value === 'unauthenticated' && $slots.fallback">
      <slot name="fallback" />
    </template>
    <!-- Slot for when auth is initializing (and not yet authenticated/unauthenticated and a loading slot is provided) -->
    <template v-else-if="auth.status.value === 'loading' && $slots.loading">
      <slot name="loading" />
    </template>
    <!-- Default behavior: render nothing if no matching state or slot not provided -->
    <!-- {{ debugRender }} --> <!-- Reference computed to trigger logging -->
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const auth = useAuth();

const debugRender = computed(() => {
  const status = auth.status.value;
  const initialized = auth.initialized.value;
  const hasDefaultSlot = !!$slots.default;
  const hasFallbackSlot = !!$slots.fallback;
  const hasLoadingSlot = !!$slots.loading;

  let decision = 'None';

  if (status === 'authenticated' && initialized) {
    decision = 'Default Slot';
  } else if (status === 'unauthenticated' && hasFallbackSlot) {
    decision = 'Fallback Slot';
  } else if (status === 'loading' && hasLoadingSlot) {
    decision = 'Loading Slot';
  }
  
  const logOutput = {
    status,
    initialized,
    hasDefaultSlot,
    hasFallbackSlot,
    hasLoadingSlot,
    decisionToRender: decision
  };
  console.log('[ClientOnlyAuthenticated Debug]', JSON.parse(JSON.stringify(logOutput))); // Use JSON.parse(JSON.stringify) for clean reactive proxy logging
  return decision; // We need to return something for the computed prop to be useful in template if needed, though primary use is logging
});

// To ensure the computed property is evaluated, we can reference it in the template (even in a comment)
</script>
