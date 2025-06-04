<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="sm" class="h-9 px-2">
        <Languages class="h-4 w-4 mr-2" />
        {{ currentLocale.name }}
        <ChevronDown class="h-3 w-3 ml-1" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="switchLanguage(locale.code)"
        :class="{ 'bg-accent': locale.code === $i18n.locale.value }"
      >
        {{ locale.name }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { Languages, ChevronDown } from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'
import DropdownMenu from '~/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '~/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '~/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from '~/components/ui/dropdown-menu/DropdownMenuItem.vue'

const { $i18n } = useNuxtApp()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return $i18n.locales.value.filter((locale: any) => locale.code !== $i18n.locale.value)
})

const currentLocale = computed(() => {
  return $i18n.locales.value.find((locale: any) => locale.code === $i18n.locale.value)
})

const switchLanguage = (code: string) => {
  navigateTo(switchLocalePath(code))
}
</script>
