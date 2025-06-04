<template>
  <div class="min-h-screen bg-background">
    <!-- Navigation -->
    <nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto px-4">
        <div class="flex h-16 items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center space-x-4">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <div class="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span class="text-primary-foreground font-bold text-sm">N</span>
              </div>
              <span class="font-bold text-xl">{{ $t('pages.home.title') }}</span>
            </NuxtLink>
          </div>

          <!-- Navigation Links -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink 
              to="/" 
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              :class="{ 'text-foreground': $route.path === '/' }"
            >
              {{ $t('navigation.home') }}
            </NuxtLink>
            <NuxtLink 
              v-if="status === 'authenticated'"
              to="/dashboard" 
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              :class="{ 'text-foreground': $route.path === '/dashboard' }"
            >
              {{ $t('navigation.dashboard') }}
            </NuxtLink>
          </div>

          <!-- Right Side -->
          <div class="flex items-center space-x-4">
            <!-- Language Switcher -->
            <LanguageSwitcher />
            
            <!-- Theme Toggle -->
            <ThemeToggle />

            <!-- User Menu or Login -->
            <div v-if="status === 'authenticated' && data?.user">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="relative h-9 w-9 rounded-full">
                    <Avatar class="h-9 w-9">
                      <AvatarImage :src="data.user.image || ''" :alt="data.user.name || ''" />
                      <AvatarFallback>
                        {{ getInitials(data.user.name || 'U') }}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56" align="end">
                  <div class="flex items-center justify-start gap-2 p-2">
                    <div class="flex flex-col space-y-1 leading-none">
                      <p class="font-medium">{{ data.user.name }}</p>
                      <p class="w-[200px] truncate text-sm text-muted-foreground">
                        {{ data.user.email }}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem @click="navigateTo('/dashboard')">
                    <User class="mr-2 h-4 w-4" />
                    {{ $t('navigation.dashboard') }}
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="navigateTo('/profile')">
                    <Settings class="mr-2 h-4 w-4" />
                    {{ $t('navigation.profile') }}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem @click="handleLogout">
                    <LogOut class="mr-2 h-4 w-4" />
                    {{ $t('auth.signOut') }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div v-else class="flex items-center space-x-2">
              <Button variant="ghost" size="sm" @click="navigateTo('/auth/login')">
                {{ $t('auth.signIn') }}
              </Button>
              <Button size="sm" @click="navigateTo('/auth/register')">
                {{ $t('auth.signUp') }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Toast Notifications -->
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { User, Settings, LogOut } from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'
import Avatar from '~/components/ui/avatar/Avatar.vue'
import AvatarImage from '~/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '~/components/ui/avatar/AvatarFallback.vue'
import DropdownMenu from '~/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '~/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '~/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from '~/components/ui/dropdown-menu/DropdownMenuItem.vue'
import DropdownMenuSeparator from '~/components/ui/dropdown-menu/DropdownMenuSeparator.vue'
import ThemeToggle from '~/components/common/ThemeToggle.vue'
import LanguageSwitcher from '~/components/common/LanguageSwitcher.vue'
import Toaster from '~/components/ui/toast/Toaster.vue'

const { data, status, signOut } = useAuth()
const { toast } = useToast()
const { t: $t } = useI18n()

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const handleLogout = async () => {
  try {
    await signOut({ callbackUrl: '/' })
    toast.success($t('auth.logoutSuccess'))
  } catch (error) {
    toast.error('Logout failed')
  }
}
</script>
