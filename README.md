# Nuxt 3 Starter Kit

A comprehensive, production-ready Nuxt.js 3 starter kit with TypeScript, Tailwind CSS, Shadcn-vue, internationalization, and authentication. Built with modern development practices and tools for the best developer experience.

## ✨ Features

- **🚀 Nuxt 3** - The latest version of Nuxt with full TypeScript support
- **📱 Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **🎨 Shadcn-vue** - Beautiful and accessible UI components
- **🌍 Internationalization (i18n)** - Multi-language support with @nuxtjs/i18n
- **🔐 Authentication System** - Complete auth flow with login, register, and password reset
- **🌙 Dark Mode** - Built-in dark mode support with smooth transitions
- **📱 Responsive Design** - Mobile-first responsive design
- **🔧 TypeScript** - Full TypeScript support with strict mode
- **📏 ESLint & Prettier** - Code linting and formatting
- **🧪 Production Ready** - Optimized for production deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PNPM 8+ (recommended package manager)

### Installation

1. Clone or download the project:
```bash
# If you have git access to this repo
git clone <repository-url>
cd nuxt-starter-kit

# Or extract from zip/folder
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
nuxt-starter-kit/
├── assets/
│   └── css/
│       └── tailwind.css          # Tailwind CSS styles and theme variables
├── components/
│   ├── ui/                       # Shadcn-vue UI components
│   ├── common/                   # Shared components (ThemeToggle, LanguageSwitcher)
│   └── auth/                     # Authentication-specific components
├── composables/
│   ├── useAuth.ts               # Authentication composable
│   └── useToast.ts              # Toast notification composable
├── layouts/
│   ├── default.vue              # Main layout with navigation
│   └── auth.vue                 # Authentication pages layout
├── lib/
│   └── utils.ts                 # Utility functions for Shadcn-vue
├── locales/
│   ├── en.json                  # English translations
│   └── fr.json                  # French translations
├── middleware/
│   ├── auth.ts                  # Authentication middleware
│   └── guest.ts                 # Guest-only middleware
├── pages/
│   ├── auth/
│   │   ├── login.vue           # Login page
│   │   ├── register.vue        # Registration page
│   │   ├── forgot-password.vue # Forgot password page
│   │   └── reset-password.vue  # Reset password page
│   ├── dashboard.vue           # Protected dashboard page
│   └── index.vue               # Homepage
├── plugins/
│   └── auth.client.ts          # Auth initialization plugin
├── server/
│   └── api/
│       └── auth/               # Authentication API endpoints
│           ├── login.post.ts   # Login endpoint
│           ├── register.post.ts # Register endpoint
│           ├── logout.post.ts  # Logout endpoint
│           └── me.get.ts       # Get current user endpoint
└── public/                     # Static assets
```

## 🎨 Theming & Customization

### Color Theme Customization

The project uses a CSS variable-based theming system compatible with Shadcn-vue. You can customize colors by editing `assets/css/tailwind.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  /* ... more variables */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  /* ... dark mode variables */
}
```

### Available CSS Variables

- `--background` / `--foreground` - Main background and text colors
- `--primary` / `--primary-foreground` - Primary brand colors
- `--secondary` / `--secondary-foreground` - Secondary colors
- `--accent` / `--accent-foreground` - Accent colors
- `--destructive` / `--destructive-foreground` - Error/danger colors
- `--muted` / `--muted-foreground` - Muted/subtle colors
- `--card` / `--card-foreground` - Card background colors
- `--border` / `--input` / `--ring` - Border and form colors

### Adding New UI Components

The project uses Shadcn-vue components. To add new components:

1. Check available components: [Shadcn-vue Documentation](https://www.shadcn-vue.com/)
2. Add components to `components/ui/` directory
3. Follow the existing component patterns for consistent styling

## 🌍 Internationalization

### Adding New Languages

1. Create a new locale file in `locales/` (e.g., `es.json` for Spanish)
2. Add the locale configuration in `nuxt.config.ts`:

```typescript
i18n: {
  locales: [
    { code: 'en', name: 'English', file: 'en.json' },
    { code: 'fr', name: 'Français', file: 'fr.json' },
    { code: 'es', name: 'Español', file: 'es.json' }, // New language
  ],
}
```

### Using Translations

```vue
<template>
  <div>
    <!-- In templates -->
    <h1>{{ $t('common.welcome') }}</h1>
    
    <!-- With interpolation -->
    <p>{{ $t('auth.welcome', { name: user.name }) }}</p>
  </div>
</template>

<script setup>
// In composition API
const { $t } = useI18n()
const message = $t('common.loading')
</script>
```

## 🔐 Authentication System

### Authentication Flow

The starter kit includes a complete authentication system with:

- **Login/Register** - Email and password authentication
- **Password Reset** - Forgot/reset password flow
- **Session Management** - JWT-based sessions with HTTP-only cookies
- **Route Protection** - Middleware for protecting routes
- **User Management** - User profile and session handling

### Demo Credentials

For testing purposes, use these demo credentials:

- **Email**: `admin@example.com`
- **Password**: `password`

### API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Using Authentication

```vue
<script setup>
const { data, status, signIn, signOut } = useAuth()

// Check if user is authenticated
if (status.value === 'authenticated') {
  console.log('User:', data.value.user)
}

// Sign in
await signIn('credentials', {
  email: 'user@example.com',
  password: 'password'
})

// Sign out
await signOut({ callbackUrl: '/' })
</script>
```

### Protecting Routes

Use middleware to protect routes:

```vue
<!-- pages/dashboard.vue -->
<script setup>
definePageMeta({
  middleware: 'auth' // Requires authentication
})
</script>
```

```vue
<!-- pages/auth/login.vue -->
<script setup>
definePageMeta({
  middleware: 'guest' // Redirects authenticated users
})
</script>
```

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm generate     # Generate static site

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting
pnpm type-check   # TypeScript type checking
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Authentication secret (change in production!)
NUXT_AUTH_SECRET=your-super-secret-key-here

# Public auth URL
NUXT_PUBLIC_AUTH_URL=http://localhost:3000/api/auth
```

### VS Code Setup

Recommended VS Code extensions:

- **Vue Language Features (Volar)** - Vue 3 and TypeScript support
- **TypeScript Vue Plugin (Volar)** - Enhanced TypeScript support
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind class suggestions
- **Auto Rename Tag** - Automatically rename paired HTML/XML tags

## 🚀 Deployment

### Building for Production

```bash
pnpm build
```

### Environment Setup

1. Set secure environment variables:
```env
NUXT_AUTH_SECRET=your-production-secret-key
NUXT_PUBLIC_AUTH_URL=https://yourdomain.com/api/auth
```

2. Configure your hosting platform (Vercel, Netlify, etc.)

3. Deploy the `.output` directory

### Production Considerations

- **Security**: Change `NUXT_AUTH_SECRET` to a strong, random string
- **Database**: Replace mock API with real database integration
- **Email**: Configure SMTP for real email sending
- **Error Tracking**: Add error monitoring (Sentry, etc.)
- **Analytics**: Add analytics if needed

## 🧩 Customization Examples

### Adding a New Page

1. Create `pages/about.vue`:
```vue
<template>
  <div class="container mx-auto px-4 py-8">
    <h1>{{ $t('pages.about.title') }}</h1>
    <p>{{ $t('pages.about.description') }}</p>
  </div>
</template>

<script setup>
useHead({
  title: 'About - Nuxt Starter Kit'
})
</script>
```

2. Add translations in `locales/en.json`:
```json
{
  "pages": {
    "about": {
      "title": "About Us",
      "description": "Learn more about our company."
    }
  }
}
```

### Creating a Custom Component

```vue
<!-- components/common/CustomButton.vue -->
<template>
  <Button 
    :variant="variant" 
    :class="cn('custom-button', props.class)"
    @click="$emit('click')"
  >
    <slot />
  </Button>
</template>

<script setup>
import Button from '~/components/ui/Button.vue'
import { cn } from '~/lib/utils'

interface Props {
  variant?: 'default' | 'destructive' | 'outline'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default'
})

defineEmits<{
  click: []
}>()
</script>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com/) - The Intuitive Vue Framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn-vue](https://www.shadcn-vue.com/) - Beautifully designed components
- [Radix Vue](https://www.radix-vue.com/) - Unstyled, accessible components
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [VueUse](https://vueuse.org/) - Collection of essential Vue composition utilities

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
pnpm dev --port 3001
```

**Dependencies issues:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**TypeScript errors:**
```bash
pnpm type-check
```

**Build issues:**
```bash
rm -rf .nuxt .output
pnpm build
```

For more help, please open an issue in the repository.
