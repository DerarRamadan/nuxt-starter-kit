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
- Docker Desktop (or Docker Engine) - *Required for Prisma/PostgreSQL local development database*

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

## 💾 Database Setup (Optional - Prisma & PostgreSQL)

This starter kit includes an optional setup for Prisma ORM with a PostgreSQL database running in Docker. This is useful if you plan to build features requiring a database.

### Enabling Prisma

To enable Prisma integration:
1.  Set `PRISMA_ENABLED=true` in your `.env` file.
    ```env
    PRISMA_ENABLED=true
    ```
2.  If you change this value while the development server is running, you may need to restart it for the changes to take full effect (especially for server-side Prisma client availability).

If `PRISMA_ENABLED` is set to `false` or is not present, the Prisma-related functionalities and database connections will not be active.

### Environment Configuration for Database

Before starting the database, ensure your `.env` file is configured with the PostgreSQL connection details. Copy from `.env.example` if needed:

```env
# PostgreSQL Configuration for Docker (used if PRISMA_ENABLED is true)
POSTGRES_USER=admin
POSTGRES_PASSWORD=password
POSTGRES_DB=nuxtstarter
POSTGRES_PORT=5432 # Ensure this port is free on your host machine

# Prisma Configuration (used if PRISMA_ENABLED is true)
# This URL is constructed using the PostgreSQL variables above
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
```

### Managing the Database Container

-   **Start the database:**
    ```bash
    pnpm db:up
    ```
    This command starts the PostgreSQL container in detached mode.

-   **View database logs:**
    ```bash
    pnpm db:logs
    ```

-   **Stop the database:**
    ```bash
    pnpm db:down
    ```
    This stops and removes the container. Your data will persist in the `./.pgdata` directory (which is gitignored).

### Basic Prisma Workflow

Once the database is running and Prisma is enabled:

1.  **Define your schema:** Edit `prisma/schema.prisma` to define your database models.
2.  **Create and apply migrations:**
    ```bash
    pnpm prisma:migrate:dev
    ```
    This command creates a new migration based on changes to your schema and applies it to the database. You'll be prompted for a migration name.
3.  **Generate Prisma Client:** Prisma Client is usually generated automatically when you install dependencies or run a migration. You can also run it manually:
    ```bash
    pnpm prisma:generate
    ```
4.  **Browse your database (Prisma Studio):**
    ```bash
    pnpm prisma:studio
    ```
    This opens a web interface to view and manage your data.

5.  **Seed the database (Optional):** To populate your database with initial data, you can run the seed script:
    ```bash
    pnpm prisma:db:seed
    ```
    This executes the script defined in `prisma/seed.js`. You can customize this file to seed your specific models.

6.  **Using Prisma Client in Nuxt:** You can now import and use the Prisma Client in your Nuxt server routes or API handlers.
    ```typescript
    // server/api/some-route.ts
    import { PrismaClient } from '@prisma/client'
    const prisma = new PrismaClient()

    export default defineEventHandler(async (event) => {
      if (process.env.PRISMA_ENABLED !== 'true') {
        throw createError({ statusCode: 503, statusMessage: 'Database service is not enabled.' })
      }
      // Your database logic here
      // const users = await prisma.user.findMany()
      // return { users }
      return { message: 'Prisma is ready (example route).' }
    })
    ```

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

# Database & Prisma (if PRISMA_ENABLED=true)
pnpm db:up          # Start PostgreSQL Docker container
pnpm db:down        # Stop PostgreSQL Docker container
pnpm db:logs        # View PostgreSQL container logs
pnpm prisma:generate # Generate Prisma Client
pnpm prisma:migrate:dev # Create and apply database migrations
pnpm prisma:studio  # Open Prisma Studio
pnpm prisma:db:seed # Seed the database with initial data (via prisma/seed.js)
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Authentication secret (change in production!)
NUXT_AUTH_SECRET=your-super-secret-key-here

# Public auth URL
NUXT_PUBLIC_AUTH_URL=http://localhost:3000/api/auth

# Prisma & Database Configuration
PRISMA_ENABLED=true                 # Set to true to enable Prisma and database features
POSTGRES_USER=admin                 # PostgreSQL database user
POSTGRES_PASSWORD=password          # PostgreSQL database password
POSTGRES_DB=nuxtstarter             # PostgreSQL database name
POSTGRES_PORT=5432                  # Port for PostgreSQL container
DATABASE_URL="postgresql://admin:password@localhost:5432/nuxtstarter?schema=public" # Full DB connection string for Prisma
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
- **Database**: If using Prisma, ensure your production environment has a PostgreSQL database. Update `DATABASE_URL` (and related `POSTGRES_*` variables if you use them to construct it) in your production environment variables to point to your production database instance. Do not use the Docker setup for production.
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
