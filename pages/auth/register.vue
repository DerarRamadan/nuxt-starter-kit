<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">
        {{ $t('auth.signUp') }}
      </h1>
      <p class="text-sm text-muted-foreground">
        Create your account to get started
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <Label for="name">{{ $t('common.name') }}</Label>
        <Input
          id="name"
          v-model="form.name"
          type="text"
          :placeholder="$t('common.name')"
          required
          :disabled="loading"
          @blur="validateName"
        />
        <p v-if="errors.name" class="text-sm text-destructive">
          {{ errors.name }}
        </p>
      </div>

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

      <div class="flex items-center space-x-2">
        <input
          id="agree"
          v-model="form.agree"
          type="checkbox"
          class="h-4 w-4 rounded border-gray-300"
          required
        />
        <Label for="agree" class="text-sm">
          I agree to the Terms of Service and Privacy Policy
        </Label>
      </div>

      <Button 
        type="submit" 
        class="w-full" 
        :disabled="loading || !form.agree"
      >
        <Loader2 v-if="loading" class="mr-2 h-4 w-4 animate-spin" />
        {{ loading ? $t('common.loading') : $t('auth.signUp') }}
      </Button>
    </form>

    <!-- Demo Note -->
    <Card class="p-4 bg-muted/50">
      <CardContent class="p-0">
        <p class="text-sm text-muted-foreground">
          <strong>Demo Mode:</strong> You can register with any email address. 
          In a real application, this would send a verification email.
        </p>
      </CardContent>
    </Card>

    <!-- Login Link -->
    <div class="text-center">
      <p class="text-sm text-muted-foreground">
        {{ $t('auth.alreadyHaveAccount') }}
        <NuxtLink 
          to="/auth/login" 
          class="text-primary hover:underline font-medium"
        >
          {{ $t('auth.signIn') }}
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

const { toast } = useToast()
const { t: $t } = useI18n()

// Form state
const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)

// Validation functions
const validateName = () => {
  if (!form.value.name.trim()) {
    errors.value.name = $t('auth.nameRequired')
  } else {
    errors.value.name = ''
  }
}

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
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
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
  validateName()
  validateEmail()
  validatePassword()
  validateConfirmPassword()
  
  return !errors.value.name && 
         !errors.value.email && 
         !errors.value.password && 
         !errors.value.confirmPassword &&
         form.value.agree
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    // Call our register API
    const response = await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password
      }
    })

    if (response.user) {
      toast.success($t('auth.registerSuccess'))
      // Redirect to login or dashboard
      await navigateTo('/auth/login')
    }
  } catch (error: any) {
    console.error('Registration error:', error)
    
    if (error.data?.statusMessage) {
      toast.error(error.data.statusMessage)
    } else {
      toast.error('Registration failed. Please try again.')
    }
  } finally {
    loading.value = false
  }
}

// SEO
useHead({
  title: 'Sign Up - Nuxt Starter Kit',
  meta: [
    {
      name: 'description', 
      content: 'Create your account to get started with our platform and access all features.'
    }
  ]
})
</script>
