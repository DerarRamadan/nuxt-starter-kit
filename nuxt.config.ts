export default defineNuxtConfig({
  compatibilityDate: '2025-06-03',
  nitro: {
    compatibilityDate: '2025-06-03'
  },
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/color-mode'
  ],
  
  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false // Disable for now to avoid issues
  },

  // Color mode configuration
  colorMode: {
    classSuffix: ''
  },

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.js', // Using the .js version created by npx tailwindcss init
    exposeConfig: false
  },

  // Shadcn-Nuxt configuration
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  // Component auto-import configuration
  components: [
    {
      path: '~/components/common', // For components like common/Button.vue -> <Button />
      prefix: ''
    },
    {
      path: '~/components/auth',    // For components like auth/ClientOnlyAuthenticated.vue -> <AuthClientOnlyAuthenticated />
      prefix: 'Auth'
    }
  ],

  // Internationalization configuration
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' }
    ],
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    bundle: {
      optimizeTranslationDirective: false
    }
  },

  // Runtime configuration
  runtimeConfig: {
    authSecret: process.env.NUXT_AUTH_SECRET || 'your-secret-here-change-this-in-production',
    public: {
      authUrl: process.env.NUXT_PUBLIC_AUTH_URL || 'http://localhost:3000/api/auth'
    }
  },

  // App configuration
  app: {
    head: {
      title: 'Nuxt Starter Kit',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'A comprehensive Nuxt.js 3 starter kit with TypeScript, Tailwind CSS, and modern development tools' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // ESLint configuration
  eslint: {
    config: {
      stylistic: true
    }
  },

  // Session configuration
  ssr: true
})
