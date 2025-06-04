<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">
        {{ $t('auth.forgotPassword') }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ $t('auth.resetPasswordInstruction') }}
      </p>
    </div>

    <!-- Form -->
    <form v-if="!emailSent" @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <Label for="email">{{ $t('common.email') }}</Label>
        <Input
          id="email"
          v-model="form.email"
          type="email"
          :placeholder="$t('common.email')"
          required
          :disabled="loading"
          @blur="validateEmail"
        />
        <p v-if="errors.email" class="text-sm text-destructive">
          {{ errors.email }}
        </p>
      </div>

      <Button 
        type="submit" 
        class="w-full" 
        :disabled="loading"
      >
        <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
        {{ loading ? $t('common.loading') : $t('auth.sendResetLink') }}
      </Button>
    </form>

    <!-- Success Message -->
    <div v-else class="text-center space-y-4">
      <div class="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
        <CheckCircle class="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <div class="space-y-2">
        <h2 class="text-lg font-medium">Reset link sent!</h2>
        <p class="text-sm text-muted-foreground">
          We've sent a password reset link to <strong>{{ form.email }}</strong>
        </p>
        <p class="text-sm text-muted-foreground">
          Check your inbox and follow the instructions to reset your password.
        </p>
      </div>
      <Button @click="resetForm" variant="outline">
        Send another email
      </Button>
    </div>

    <!-- Demo Note -->
    <Card class="p-4 bg-muted/50">
      <CardContent class="p-0">
        <p class="text-sm text-muted-foreground">
          <strong>Demo Mode:</strong> In a real application, this would send an actual email 
          with a secure reset link. For demo purposes, any valid email will work.
        </p>
      </CardContent>
    </Card>

    <!-- Back to Login -->
    <div class="text-center">
      <NuxtLink 
        to="/auth/login" 
        class="text-sm text-primary hover:underline font-medium inline-flex items-center"
      >
        <ArrowLeft class="mr-1 h-3 w-3" />
        {{ $t('auth.backToLogin') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2, CheckCircle, ArrowLeft } from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'
import Input from '~/components/ui/input/Input.vue'
import Label from '~/components/ui/label/Label.vue'
import Card from '~/components/ui/card/Card.vue'
import CardContent from '~/components/ui/card/CardContent.vue'

// Layout and middleware
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const { toast } = useToast()
const { t: $t } = useI18n()

// Form state
const form = ref({
  email: ''
})

const errors = ref({
  email: ''
})

const loading = ref(false)
const emailSent = ref(false)

// Validation functions
const validateEmail = () => {
  if (!form.value.email) {
    errors.value.email = $t('auth.emailRequired')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = $t('auth.emailInvalid')
  } else {
    errors.value.email = ''
  }
}

const validateForm = () => {
  validateEmail()
  return !errors.value.email
}

// Reset form
const resetForm = () => {
  emailSent.value = false
  form.value.email = ''
  errors.value.email = ''
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real app, this would call your password reset API
    // await $fetch('/api/auth/forgot-password', {
    //   method: 'POST',
    //   body: { email: form.value.email }
    // })

    emailSent.value = true
    toast.success($t('auth.resetLinkSent'))
  } catch (error: any) {
    console.error('Forgot password error:', error)
    toast.error('Failed to send reset email. Please try again.')
  } finally {
    loading.value = false
  }
}

// SEO
useHead({
  title: 'Forgot Password - Nuxt Starter Kit',
  meta: [
    {
      name: 'description', 
      content: 'Reset your password by entering your email address. We\'ll send you a secure reset link.'
    }
  ]
})
</script>
