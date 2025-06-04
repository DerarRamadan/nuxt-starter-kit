<template>
  <Select v-model="selectedPalette">
    <SelectTrigger class="w-[120px] px-2 h-9 border rounded-md flex items-center justify-between">
      <SelectValue :placeholder="currentPaletteLabel" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Color Palette</SelectLabel>
        <SelectItem value="default">Default</SelectItem>
        <SelectItem value="blue">Blue</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import {
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const selectedPalette = ref('default');
const localStorageKey = 'app-color-palette';

const currentPaletteLabel = computed(() => {
  switch (selectedPalette.value) {
    case 'default': return 'Default';
    case 'blue': return 'Blue';
    default: return 'Palette';
  }
});

const applyPalette = (paletteName: string) => {
  if (process.client && document.documentElement) {
    if (paletteName === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', paletteName);
    }
  }
};

watch(selectedPalette, (newValue) => {
  applyPalette(newValue);
  if (process.client) {
    localStorage.setItem(localStorageKey, newValue);
  }
});

onMounted(() => {
  if (process.client) {
    const storedPalette = localStorage.getItem(localStorageKey);
    if (storedPalette) {
      selectedPalette.value = storedPalette;
      // Watcher will call applyPalette
    } else {
      applyPalette(selectedPalette.value); // Apply initial default if nothing stored
    }
  }
});
</script>
