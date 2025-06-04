<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Global composables or configurations can go here
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})

// Handle color mode initialization
const colorMode = useColorMode()

// Set initial theme based on user preference or system preference
onMounted(() => {
  if (colorMode.preference === 'system') {
    colorMode.preference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
})
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>
