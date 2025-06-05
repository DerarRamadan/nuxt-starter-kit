<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">{{ $t('pages.dashboard.title') }}</h1>
      <AuthClientOnlyAuthenticated>
        <p class="text-muted-foreground">
          {{ $t('pages.dashboard.welcome') }}, {{ data?.user?.name || 'User' }}!
        </p>
      </AuthClientOnlyAuthenticated>
    </div>

    <!-- Stats Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            {{ $t('pages.dashboard.projects') }}
          </CardTitle>
          <FolderOpen class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">12</div>
          <p class="text-xs text-muted-foreground">
            +2 from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            {{ $t('pages.dashboard.tasks') }}
          </CardTitle>
          <CheckSquare class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">24</div>
          <p class="text-xs text-muted-foreground">
            +4 completed today
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            {{ $t('pages.dashboard.notifications') }}
          </CardTitle>
          <Bell class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">8</div>
          <p class="text-xs text-muted-foreground">
            3 unread
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-sm font-medium">
            {{ $t('pages.dashboard.stats') }}
          </CardTitle>
          <TrendingUp class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2xl font-bold">94%</div>
          <p class="text-xs text-muted-foreground">
            +5% from last week
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Main Content Grid -->
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- User Information -->
      <Card class="lg:col-span-1">
        <CardHeader>
          <CardTitle>{{ $t('pages.dashboard.userInfo') }}</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <AuthClientOnlyAuthenticated>
            <div class="flex items-center space-x-4">
              <Avatar class="h-12 w-12">
                <AvatarImage :src="data?.user?.image || ''" :alt="data?.user?.name || ''" />
                <AvatarFallback>
                  {{ getInitials(data?.user?.name || 'U') }}
                </AvatarFallback>
              </Avatar>
              <div>
                <p class="font-medium">{{ data?.user?.name }}</p>
                <p class="text-sm text-muted-foreground">{{ data?.user?.email }}</p>
              </div>
            </div>
          </AuthClientOnlyAuthenticated>
          
          <ClientOnly>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Member since</span>
                <span>{{ memberSince }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Last login</span>
                <span>{{ lastLogin }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-muted-foreground">Status</span>
                <span class="text-green-600 dark:text-green-400">Active</span>
              </div>
            </div>
          </ClientOnly>
        </CardContent>
      </Card>

      <!-- Recent Activity -->
      <Card class="lg:col-span-2">
        <CardHeader>
          <CardTitle>{{ $t('pages.dashboard.recentActivity') }}</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center space-x-4">
              <div class="h-2 w-2 bg-primary rounded-full"></div>
              <div class="flex-1">
                <p class="text-sm font-medium">{{ activity.title }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.description }}</p>
              </div>
              <div class="text-xs text-muted-foreground">
                {{ activity.time }}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Actions -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Quick Actions</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          class="h-20 flex flex-col items-center justify-center space-y-2"
          @click="handleQuickAction('new-project')"
        >
          <Plus class="h-5 w-5" />
          <span class="text-sm">New Project</span>
        </Button>
        
        <Button 
          variant="outline" 
          class="h-20 flex flex-col items-center justify-center space-y-2"
          @click="handleQuickAction('invite-user')"
        >
          <UserPlus class="h-5 w-5" />
          <span class="text-sm">Invite User</span>
        </Button>
        
        <Button 
          variant="outline" 
          class="h-20 flex flex-col items-center justify-center space-y-2"
          @click="handleQuickAction('view-analytics')"
        >
          <BarChart3 class="h-5 w-5" />
          <span class="text-sm">View Analytics</span>
        </Button>
        
        <Button 
          variant="outline" 
          class="h-20 flex flex-col items-center justify-center space-y-2"
          @click="handleQuickAction('settings')"
        >
          <Settings class="h-5 w-5" />
          <span class="text-sm">Settings</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  FolderOpen, 
  CheckSquare, 
  Bell, 
  TrendingUp, 
  Plus, 
  UserPlus, 
  BarChart3, 
  Settings 
} from 'lucide-vue-next'
import Button from '~/components/ui/button/Button.vue'
import Card from '~/components/ui/card/Card.vue'
import CardHeader from '~/components/ui/card/CardHeader.vue'
import CardTitle from '~/components/ui/card/CardTitle.vue'
import CardContent from '~/components/ui/card/CardContent.vue'
import Avatar from '~/components/ui/avatar/Avatar.vue'
import AvatarImage from '~/components/ui/avatar/AvatarImage.vue'
import AvatarFallback from '~/components/ui/avatar/AvatarFallback.vue'

// Protect this page with authentication
definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const { data } = useAuth()
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

// Mock data
const memberSince = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() - 6)
  return date.toLocaleDateString()
})

const lastLogin = computed(() => {
  const date = new Date()
  date.setHours(date.getHours() - 2)
  return date.toLocaleString()
})

const recentActivities = ref([
  {
    id: 1,
    title: 'Project "Website Redesign" created',
    description: 'New project added to your workspace',
    time: '2 hours ago'
  },
  {
    id: 2,
    title: 'Task "Update documentation" completed',
    description: 'Documentation has been successfully updated',
    time: '4 hours ago'
  },
  {
    id: 3,
    title: 'New team member invited',
    description: 'sarah@example.com has been invited to join',
    time: '1 day ago'
  },
  {
    id: 4,
    title: 'Weekly report generated',
    description: 'Your weekly activity report is ready',
    time: '2 days ago'
  }
])

const handleQuickAction = (action: string) => {
  toast.info(`${action} feature coming soon!`, 'Quick Action')
}

// SEO
useHead({
  title: 'Dashboard - Nuxt Starter Kit',
  meta: [
    {
      name: 'description', 
      content: 'Your personal dashboard with project overview, recent activities, and quick actions.'
    }
  ]
})
</script>
