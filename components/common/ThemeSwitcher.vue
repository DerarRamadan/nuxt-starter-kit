<template>
  <Select v-model="$colorMode.preference">
    <SelectTrigger class="w-[100px] px-2 h-9 border rounded-md flex items-center justify-between">
      <SelectValue :placeholder="currentThemeLabel" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Theme</SelectLabel>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { computed } from 'vue';
// useColorMode is auto-imported by Nuxt / @nuxtjs/color-mode
import {
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const colorMode = useColorMode();

const currentThemeLabel = computed(() => {
  switch (colorMode.preference) {
    case 'light': return 'Light';
    case 'dark': return 'Dark';
    case 'system': return 'System';
    default: return 'Theme';
  }
});
//   SelectItem, 
//   SelectLabel, 
//   SelectTrigger, 
//   SelectValue 
// } from '@/components/ui/select'
</script>
