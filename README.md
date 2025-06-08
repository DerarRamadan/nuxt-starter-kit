# Nuxt 3 Starter Kit with Drizzle ORM

A comprehensive, production-ready Nuxt.js 3 starter kit with a robust backend powered by Drizzle ORM and PostgreSQL. It includes TypeScript, Tailwind CSS, Shadcn-vue, internationalization, and authentication. Built with modern development practices and tools for the best developer experience.

✨ Features

🚀 Nuxt 3 - The latest version of Nuxt with full TypeScript support

💾 Drizzle ORM - A modern, lightweight, and blazing-fast TypeScript ORM for your database.

🐘 PostgreSQL - The world's most advanced open-source relational database.

🐳 Docker Integration - Get your PostgreSQL database running with a single command via Docker Compose.

📱 Tailwind CSS - Utility-first CSS framework for rapid UI development

🎨 Shadcn-vue - Beautiful and accessible UI components

🌍 Internationalization (i18n) - Multi-language support with @nuxtjs/i18n

🔐 Authentication System - Complete auth flow with login, register, and password reset

🌙 Dark Mode - Built-in dark mode support with smooth transitions

🔧 TypeScript - Full TypeScript support with strict mode

📏 ESLint & Prettier - Code linting and formatting

🧪 Production Ready - Optimized for production deployment

🚀 Quick Start
Prerequisites

Node.js 18+

PNPM 8+ (or your preferred package manager)

Docker and Docker Compose

Installation

Clone or download the project:

git clone <repository-url>
cd nuxt-starter-kit


Install dependencies:

pnpm install


Copy environment variables:

cp .env.example .env


The default values in the .env file are already configured to work with the Docker setup. You don't need to change anything to get started.

Start the Database Container:
This command starts the PostgreSQL database in a Docker container, running in the background.

docker-compose up -d


Run Database Migrations:
This crucial step creates the necessary tables in your new database based on the schema defined in server/db/schema.ts.

pnpm run db:migrate


Start the Development Server:
You're all set! This starts the Nuxt 3 development server.

pnpm dev


Open http://localhost:3000 in your browser.

📁 Project Structure
nuxt-starter-kit/
├── assets/
│   └── css/
├── components/
│   ├── ui/
│   └── ...
├── server/
│   ├── api/
│   │   └── auth/
│   ├── db/                      # Drizzle ORM configuration
│   │   ├── migrations/          # SQL migration files
│   │   ├── schema.ts            # Database schema definition
│   │   └── migrate.ts           # Script to run migrations
│   └── ...
├── .env                         # Environment variables
├── docker-compose.yml           # Docker configuration for PostgreSQL
├── drizzle.config.ts            # Drizzle Kit configuration
└── ...

🛠️ Development
Available Scripts
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build

# Database
pnpm db:generate  # Generate a new migration file from schema changes
pnpm db:migrate   # Apply all pending migrations to the database

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm type-check   # TypeScript type checking

Database Workflow

When you need to change your database schema, follow this three-step process:

Modify Your Schema:
Edit the schema file at server/db/schema.ts. For example, add a new column or a new table.

Generate a New Migration:
Let Drizzle create the SQL file for your changes.

pnpm run db:generate


Apply the Migration:
Run the migration script to update your database.

pnpm run db:migrate

Connecting with a Database GUI

While you can manage the database from the command line, using a GUI client like DBeaver (free) or TablePlus is much easier.

Use the following credentials (from your .env file) to connect:

Host: localhost

Port: 5432

Database: mydatabase

User: myuser

Password: mypassword

🎨 Theming & Customization

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

🌍 Internationalization

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

🔐 Authentication System

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

🚀 Deployment
Building for Production
pnpm build

Environment Setup

Set secure environment variables on your hosting platform:

# A strong, random string for auth
NUXT_AUTH_SECRET=your-production-secret-key

# The full URL of your deployed application
NUXT_PUBLIC_AUTH_URL=https://yourdomain.com/api/auth

# Connection string for your production database (e.g., from Vercel Postgres, Supabase, etc.)
DATABASE_URL=postgres://user:password@host:port/database


Configure your hosting platform (Vercel, Netlify, etc.) to run the build command and deploy the .output directory.

Run migrations on your production database before starting the application. Most hosting providers have a way to run a startup script.

🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

🙏 Acknowledgments

- [Nuxt.js](https://nuxt.com/) - The Intuitive Vue Framework
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn-vue](https://www.shadcn-vue.com/) - Beautifully designed components
- [Radix Vue](https://www.radix-vue.com/) - Unstyled, accessible components
- [Lucide](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [VueUse](https://vueuse.org/) - Collection of essential Vue composition utilities

🐛 Troubleshooting

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

Git Commands to Commit and Push Your Changes

Here are the commands to save your updated README and all the new database configuration files to your repository.

# Step 1: Stage all the new and updated files for commit
git add .

# Step 2: Commit the changes with a clear, descriptive message
git commit -m "docs: Overhaul README and integrate Drizzle DB setup"

# Step 3: Push the commit to your remote repository on GitHub
git push origin main
