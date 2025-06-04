<template>
  <div class="min-h-screen flex">
    <!-- Left side - Hero Section -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-primary/80 p-12 text-primary-foreground">
      <div class="flex flex-col justify-center max-w-md">
        <div class="mb-8">
          <div class="h-12 w-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center mb-4">
            <span class="text-primary-foreground font-bold text-xl">N</span>
          </div>
          <h1 class="text-3xl font-bold mb-4">{{ $t('pages.home.title') }}</h1>
          <p class="text-primary-foreground/80 leading-relaxed">
            {{ $t('pages.home.description') }}
          </p>
        </div>
        
        <!-- Features -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="h-2 w-2 rounded-full bg-primary-foreground/60"></div>
            <span class="text-sm">{{ $t('pages.home.features.typescript') }}</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="h-2 w-2 rounded-full bg-primary-foreground/60"></div>
            <span class="text-sm">{{ $t('pages.home.features.authentication') }}</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="h-2 w-2 rounded-full bg-primary-foreground/60"></div>
            <span class="text-sm">{{ $t('pages.home.features.i18n') }}</span>
          </div>
          <div class="flex items-center space-x-3">
            <div class="h-2 w-2 rounded-full bg-primary-foreground/60"></div>
            <span class="text-sm">{{ $t('pages.home.features.ui') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - Auth Form -->
    <div class="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12">
      <div class="mx-auto w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden mb-8 text-center">
          <div class="h-12 w-12 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
            <span class="text-primary-foreground font-bold text-xl">N</span>
          </div>
          <h1 class="text-2xl font-bold">{{ $t('pages.home.title') }}</h1>
        </div>

        <!-- Auth Form Content -->
        <slot />

        <!-- Footer -->
        <div class="mt-8 text-center">
          <div class="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '~/components/common/ThemeToggle.vue'
import LanguageSwitcher from '~/components/common/LanguageSwitcher.vue'
import Toaster from '~/components/ui/toast/Toaster.vue'

const { t: $t } = useI18n()
</script>
