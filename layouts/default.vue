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
              <span class="font-bold text-xl hidden md:inline">{{ $t('pages.home.title') }}</span>
              <span class="font-bold text-lg md:hidden">{{ $t('shortSiteName', 'App') }}</span>
            </NuxtLink>
          </div>

          <!-- Navigation Links (Desktop) -->
          <div class="hidden md:flex items-center space-x-6">
            <NuxtLink 
              to="/" 
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              :class="{ 'text-foreground': $route.path === '/' }"
            >
              {{ $t('navigation.home') }}
            </NuxtLink>
            <AuthClientOnlyAuthenticated>
              <NuxtLink 
                to="/dashboard" 
                class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                :class="{ 'text-foreground': $route.path === '/dashboard' }"
              >
                {{ $t('navigation.dashboard') }}
              </NuxtLink>
            </AuthClientOnlyAuthenticated>
          </div>

          <!-- Right Side & Mobile Toggle -->
          <div class="flex items-center space-x-1 md:space-x-4">
            <!-- Language Switcher -->
            <LanguageSwitcher />
            
            <!-- Simple Light/Dark Theme Toggle -->
            <ClientOnly>
              <SimpleThemeToggle />
            </ClientOnly>

            <!-- User Menu or Login -->
            <AuthClientOnlyAuthenticated>
              <div v-if="data?.user"> <!-- data?.user check is still needed as ClientOnlyAuthenticated only checks status -->
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
              <template #fallback>
                <!-- Desktop Sign In/Up Buttons -->
                <div class="hidden md:flex items-center space-x-2">
                  <Button variant="ghost" size="sm" @click="navigateTo('/auth/login')">
                    {{ $t('auth.signIn') }}
                  </Button>
                  <Button size="sm" @click="navigateTo('/auth/register')">
                    {{ $t('auth.signUp') }}
                  </Button>
                </div>
              </template>
            </AuthClientOnlyAuthenticated>

          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pb-20 md:pb-0"> <!-- Add padding-bottom for mobile to avoid overlap with bottom nav -->
      <slot />
    </main>

    <!-- Bottom Navigation (Mobile Only) -->
    <nav class="fixed bottom-0 left-0 right-0 z-40 h-16 bg-background border-t md:hidden">
      <div class="flex justify-around items-center h-full">
        <NuxtLink to="/" class="flex flex-col items-center justify-center text-xs text-muted-foreground hover:text-primary p-2 flex-1" :class="{ 'text-primary': $route.path === '/' }">
          <HomeIcon class="h-5 w-5 mb-0.5" />
          <span>{{ $t('navigation.home') }}</span>
        </NuxtLink>

        <AuthClientOnlyAuthenticated>
          <NuxtLink to="/dashboard" class="flex flex-col items-center justify-center text-xs text-muted-foreground hover:text-primary p-2 flex-1" :class="{ 'text-primary': $route.path === '/dashboard' }">
            <LayoutDashboardIcon class="h-5 w-5 mb-0.5" />
            <span>{{ $t('navigation.dashboard') }}</span>
          </NuxtLink>
          <template #fallback>
            <div class="flex-1"></div> <!-- Placeholder to maintain layout -->
          </template>
        </AuthClientOnlyAuthenticated>
        
        <AuthClientOnlyAuthenticated>
           <NuxtLink v-if="data?.user" to="/profile" class="flex flex-col items-center justify-center text-xs text-muted-foreground hover:text-primary p-2 flex-1" :class="{ 'text-primary': $route.path === '/profile' }">
            <UserIcon class="h-5 w-5 mb-0.5" />
            <span>{{ $t('navigation.profile') }}</span>
          </NuxtLink>
          <template #fallback>
             <!-- For unauthenticated users, if profile is not shown, we might show login or just a placeholder -->
            <NuxtLink to="/auth/login" class="flex flex-col items-center justify-center text-xs text-muted-foreground hover:text-primary p-2 flex-1">
              <UserIcon class="h-5 w-5 mb-0.5" /> <!-- Or a generic 'More' or 'Account' icon -->
              <span>{{ $t('auth.signIn') }}</span>
            </NuxtLink>
          </template>
          <template #loading>
            <div class="flex flex-col items-center justify-center text-xs text-muted-foreground p-2 flex-1 opacity-50">
              <UserIcon class="h-5 w-5 mb-0.5 animate-pulse" />
              <span class="h-3 w-10 animate-pulse bg-muted rounded-sm"></span>
            </div>
          </template>
        </AuthClientOnlyAuthenticated>
      </div>
    </nav>

    <!-- Toast Notifications -->
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { User, Settings, LogOut, Home as HomeIcon, LayoutDashboard as LayoutDashboardIcon, UserCircle2 as UserIcon, LogInIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import SimpleThemeToggle from '@/components/common/SimpleThemeToggle.vue'
import AvatarImage from '~/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '~/components/ui/avatar/AvatarFallback.vue'
import DropdownMenu from '~/components/ui/dropdown-menu/DropdownMenu.vue'
import DropdownMenuTrigger from '~/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuContent from '~/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuItem from '~/components/ui/dropdown-menu/DropdownMenuItem.vue'
import DropdownMenuSeparator from '~/components/ui/dropdown-menu/DropdownMenuSeparator.vue'
// import ThemeToggle from '~/components/common/ThemeToggle.vue' // Replaced with ThemeSwitcher
// ThemeSwitcher is auto-imported by Nuxt
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
