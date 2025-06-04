<template>
  <Button variant="ghost" size="icon" @click="toggleTheme">
    <SunIcon v-if="isDarkMode === false" class="h-[1.2rem] w-[1.2rem]" />
    <MoonIcon v-else class="h-[1.2rem] w-[1.2rem]" />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Button } from '@/components/ui/button';
// Assuming lucide-vue-next is used for icons, auto-imported or globally registered
// If not, you'll need to import them, e.g.:
import { SunIcon, MoonIcon } from 'lucide-vue-next'; 

const colorMode = useColorMode();

// Determine if current effective mode is dark
const isDarkMode = computed(() => {
  if (colorMode.preference === 'system') {
    // For 'system', we need to check the actual resolved mode
    // $colorMode.value reflects the actual mode (light or dark) applied by the browser/OS preference
    return colorMode.value === 'dark';
  }
  return colorMode.preference === 'dark';
});

const toggleTheme = () => {
  if (colorMode.preference === 'dark') {
    colorMode.preference = 'light';
  } else {
    colorMode.preference = 'dark';
  }
};
</script>
