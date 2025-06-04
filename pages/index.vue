<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 px-4">
      <div class="container mx-auto text-center">
        <div class="max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {{ $t('pages.home.title') }}
          </h1>
          <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {{ $t('pages.home.subtitle') }}
          </p>
          <p class="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            {{ $t('pages.home.description') }}
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              @click="navigateTo(status === 'authenticated' ? '/dashboard' : '/auth/register')"
              class="px-8"
            >
              {{ $t('pages.home.getStarted') }}
              <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" @click="scrollToFeatures" class="px-8">
              {{ $t('pages.home.learnMore') }}
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4 bg-muted/50">
      <div class="container mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            {{ $t('pages.home.features.title') }}
          </h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build modern web applications with the best developer experience.
          </p>
        </div>
        
        <!-- Features Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- TypeScript -->
          <Card class="p-6 hover:shadow-lg transition-shadow">
            <CardHeader class="p-0 mb-4">
              <div class="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                <Code class="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle class="text-xl mb-2">
                {{ $t('pages.home.features.typescript') }}
              </CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <p class="text-muted-foreground">
                {{ $t('pages.home.features.typescriptDesc') }}
              </p>
            </CardContent>
          </Card>

          <!-- Authentication -->
          <Card class="p-6 hover:shadow-lg transition-shadow">
            <CardHeader class="p-0 mb-4">
              <div class="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                <Shield class="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle class="text-xl mb-2">
                {{ $t('pages.home.features.authentication') }}
              </CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <p class="text-muted-foreground">
                {{ $t('pages.home.features.authenticationDesc') }}
              </p>
            </CardContent>
          </Card>

          <!-- Internationalization -->
          <Card class="p-6 hover:shadow-lg transition-shadow">
            <CardHeader class="p-0 mb-4">
              <div class="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                <Globe class="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle class="text-xl mb-2">
                {{ $t('pages.home.features.i18n') }}
              </CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <p class="text-muted-foreground">
                {{ $t('pages.home.features.i18nDesc') }}
              </p>
            </CardContent>
          </Card>

          <!-- UI Components -->
          <Card class="p-6 hover:shadow-lg transition-shadow">
            <CardHeader class="p-0 mb-4">
              <div class="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                <Palette class="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle class="text-xl mb-2">
                {{ $t('pages.home.features.ui') }}
              </CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <p class="text-muted-foreground">
                {{ $t('pages.home.features.uiDesc') }}
              </p>
            </CardContent>
          </Card>

          <!-- Dark Mode -->
          <Card class="p-6 hover:shadow-lg transition-shadow">
            <CardHeader class="p-0 mb-4">
              <div class="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
                <Moon class="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle class="text-xl mb-2">
                {{ $t('pages.home.features.darkMode') }}
              </CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <p class="text-muted-foreground">
                {{ $t('pages.home.features.darkModeDesc') }}
              </p>
            </CardContent>
          </Card>

          <!-- Responsive Design -->
          <Card class="p-6 hover:shadow-lg transition-shadow">
            <CardHeader class="p-0 mb-4">
              <div class="h-12 w-12 rounded-lg bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4">
                <Smartphone class="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <CardTitle class="text-xl mb-2">
                {{ $t('pages.home.features.responsive') }}
              </CardTitle>
            </CardHeader>
            <CardContent class="p-0">
              <p class="text-muted-foreground">
                {{ $t('pages.home.features.responsiveDesc') }}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4">
      <div class="container mx-auto text-center">
        <div class="max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Ready to get started?
          </h2>
          <p class="text-lg text-muted-foreground mb-8">
            Join thousands of developers building amazing applications with our starter kit.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              @click="navigateTo('/auth/register')"
              class="px-8"
            >
              {{ $t('auth.signUp') }}
            </Button>
            <Button variant="outline" size="lg" @click="navigateTo('/auth/login')" class="px-8">
              {{ $t('auth.signIn') }}
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowRight, 
  Code, 
  Shield, 
  Globe, 
  Palette, 
  Moon, 
  Smartphone 
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardTitle from '~/components/ui/card/CardTitle.vue'
import CardContent from '~/components/ui/card/CardContent.vue'

const { status } = useAuth()
const { t: $t } = useI18n()

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ 
    behavior: 'smooth' 
  })
}

// SEO
useHead({
  title: 'Modern Web Development Starter - Nuxt 3 Starter Kit',
  meta: [
    {
      name: 'description', 
      content: 'A comprehensive Nuxt.js 3 starter kit with TypeScript, Tailwind CSS, authentication, and internationalization. Get started building your next web application today.'
    }
  ]
})
</script>
