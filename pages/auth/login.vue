<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">
        {{ $t('auth.signIn') }}
      </h1>
      <p class="text-sm text-muted-foreground">
        Enter your email and password to access your account
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
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

      <div class="space-y-2">
        <Label for="password">{{ $t('common.password') }}</Label>
        <Input
          id="password"
          v-model="form.password"
          type="password"
          :placeholder="$t('common.password')"
          required
          :disabled="loading"
          @blur="validatePassword"
        />
        <p v-if="errors.password" class="text-sm text-destructive">
          {{ errors.password }}
        </p>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <input
            id="remember"
            v-model="form.remember"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300"
          />
          <Label for="remember" class="text-sm">
            Remember me
          </Label>
        </div>
        <NuxtLink 
          to="/auth/forgot-password" 
          class="text-sm text-primary hover:underline"
        >
          {{ $t('auth.forgotPassword') }}?
        </NuxtLink>
      </div>

      <Button 
        type="submit" 
        class="w-full" 
        :disabled="loading"
      >
        <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
        {{ loading ? $t('common.loading') : $t('auth.signIn') }}
      </Button>
    </form>

    <!-- Demo Credentials -->
    <Card class="p-4 bg-muted/50">
      <CardContent class="p-0">
        <p class="text-sm font-medium mb-2">Demo Credentials:</p>
        <div class="text-xs text-muted-foreground space-y-1">
          <p><strong>Email:</strong> admin@example.com</p>
          <p><strong>Password:</strong> password</p>
          <Button 
            variant="ghost" 
            size="sm" 
            @click="fillDemoCredentials"
            class="mt-2 h-7 text-xs"
          >
            Fill Demo Credentials
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Register Link -->
    <div class="text-center">
      <p class="text-sm text-muted-foreground">
        {{ $t('auth.dontHaveAccount') }}
        <NuxtLink 
          to="/auth/register" 
          class="text-primary hover:underline font-medium"
        >
          {{ $t('auth.signUp') }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
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

const { signIn } = useAuth()
const { toast } = useToast()
const { t: $t } = useI18n()

// Form state
const form = ref({
  email: '',
  password: '',
  remember: false
})

const errors = ref({
  email: '',
  password: ''
})

const loading = ref(false)

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

const validatePassword = () => {
  if (!form.value.password) {
    errors.value.password = $t('auth.passwordRequired')
  } else {
    errors.value.password = ''
  }
}

const validateForm = () => {
  validateEmail()
  validatePassword()
  return !errors.value.email && !errors.value.password
}

// Fill demo credentials
const fillDemoCredentials = () => {
  form.value.email = 'admin@example.com'
  form.value.password = 'password'
  toast.info('Demo credentials filled!')
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const result = await signIn('credentials', {
      email: form.value.email,
      password: form.value.password,
      redirect: false
    })

    if (result?.error) {
      toast.error($t('auth.invalidCredentials'))
    } else {
      toast.success($t('auth.loginSuccess'))
      await navigateTo('/dashboard')
    }
  } catch (error) {
    console.error('Login error:', error)
    toast.error('An error occurred during login')
  } finally {
    loading.value = false
  }
}

// SEO
useHead({
  title: 'Sign In - Nuxt Starter Kit',
  meta: [
    {
      name: 'description', 
      content: 'Sign in to your account to access your dashboard and manage your projects.'
    }
  ]
})
</script>
