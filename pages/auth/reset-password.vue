<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">
        {{ $t('auth.resetPassword') }}
      </h1>
      <p class="text-sm text-muted-foreground">
        Enter your new password below
      </p>
    </div>

    <!-- Form -->
    <form v-if="!passwordReset" @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <Label for="password">{{ $t('auth.newPassword') }}</Label>
        <Input
          id="password"
          v-model="form.password"
          type="password"
          :placeholder="$t('auth.newPassword')"
          required
          :disabled="loading"
          @blur="validatePassword"
        />
        <p v-if="errors.password" class="text-sm text-destructive">
          {{ errors.password }}
        </p>
      </div>

      <div class="space-y-2">
        <Label for="confirmPassword">{{ $t('common.confirmPassword') }}</Label>
        <Input
          id="confirmPassword"
          v-model="form.confirmPassword"
          type="password"
          :placeholder="$t('common.confirmPassword')"
          required
          :disabled="loading"
          @blur="validateConfirmPassword"
        />
        <p v-if="errors.confirmPassword" class="text-sm text-destructive">
          {{ errors.confirmPassword }}
        </p>
      </div>

      <!-- Password Requirements -->
      <div class="bg-muted/50 p-3 rounded-md">
        <p class="text-sm font-medium mb-2">Password requirements:</p>
        <ul class="text-xs text-muted-foreground space-y-1">
          <li class="flex items-center">
            <div :class="[
              'w-2 h-2 rounded-full mr-2',
              form.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'
            ]"></div>
            At least 8 characters
          </li>
          <li class="flex items-center">
            <div :class="[
              'w-2 h-2 rounded-full mr-2',
              /[A-Z]/.test(form.password) ? 'bg-green-500' : 'bg-gray-300'
            ]"></div>
            One uppercase letter
          </li>
          <li class="flex items-center">
            <div :class="[
              'w-2 h-2 rounded-full mr-2',
              /[a-z]/.test(form.password) ? 'bg-green-500' : 'bg-gray-300'
            ]"></div>
            One lowercase letter
          </li>
          <li class="flex items-center">
            <div :class="[
              'w-2 h-2 rounded-full mr-2',
              /\d/.test(form.password) ? 'bg-green-500' : 'bg-gray-300'
            ]"></div>
            One number
          </li>
        </ul>
      </div>

      <Button 
        type="submit" 
        class="w-full" 
        :disabled="loading || !isPasswordValid"
      >
        <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
        {{ loading ? $t('common.loading') : $t('auth.resetPassword') }}
      </Button>
    </form>

    <!-- Success Message -->
    <div v-else class="text-center space-y-4">
      <div class="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
        <CheckCircle class="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <div class="space-y-2">
        <h2 class="text-lg font-medium">Password reset successful!</h2>
        <p class="text-sm text-muted-foreground">
          Your password has been successfully updated. You can now sign in with your new password.
        </p>
      </div>
      <Button @click="navigateTo('/auth/login')">
        {{ $t('auth.signIn') }}
      </Button>
    </div>

    <!-- Demo Note -->
    <Card class="p-4 bg-muted/50">
      <CardContent class="p-0">
        <p class="text-sm text-muted-foreground">
          <strong>Demo Mode:</strong> In a real application, this page would be accessed 
          via a secure token from the reset email. For demo purposes, you can test the form here.
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
  password: '',
  confirmPassword: ''
})

const errors = ref({
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const passwordReset = ref(false)

// Computed properties
const isPasswordValid = computed(() => {
  return form.value.password.length >= 8 &&
         /[A-Z]/.test(form.value.password) &&
         /[a-z]/.test(form.value.password) &&
         /\d/.test(form.value.password) &&
         form.value.password === form.value.confirmPassword
})

// Validation functions
const validatePassword = () => {
  if (!form.value.password) {
    errors.value.password = $t('auth.passwordRequired')
  } else if (form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
  } else if (!/[A-Z]/.test(form.value.password)) {
    errors.value.password = 'Password must contain at least one uppercase letter'
  } else if (!/[a-z]/.test(form.value.password)) {
    errors.value.password = 'Password must contain at least one lowercase letter'
  } else if (!/\d/.test(form.value.password)) {
    errors.value.password = 'Password must contain at least one number'
  } else {
    errors.value.password = ''
  }
}

const validateConfirmPassword = () => {
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password'
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = $t('auth.passwordMismatch')
  } else {
    errors.value.confirmPassword = ''
  }
}

const validateForm = () => {
  validatePassword()
  validateConfirmPassword()
  
  return !errors.value.password && 
         !errors.value.confirmPassword &&
         isPasswordValid.value
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
    
    // In a real app, this would call your password reset API with the token
    // await $fetch('/api/auth/reset-password', {
    //   method: 'POST',
    //   body: { 
    //     token: route.query.token,
    //     password: form.value.password 
    //   }
    // })

    passwordReset.value = true
    toast.success($t('auth.passwordReset'))
  } catch (error: any) {
    console.error('Reset password error:', error)
    toast.error('Failed to reset password. Please try again.')
  } finally {
    loading.value = false
  }
}

// SEO
useHead({
  title: 'Reset Password - Nuxt Starter Kit',
  meta: [
    {
      name: 'description', 
      content: 'Enter your new password to complete the password reset process.'
    }
  ]
})
</script>
