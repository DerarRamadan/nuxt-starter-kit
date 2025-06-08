// server/db/migrate.ts
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '.env' });

async function runMigrations() {
  console.log('Connecting to database...');
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set in the .env file');
  }

  // Create a new postgres client for the migration
  const migrationClient = postgres(connectionString, { max: 1 });
  const db = drizzle(migrationClient);

  console.log('Running migrations...');
  
  try {
    await migrate(db, { migrationsFolder: 'server/db/migrations' });
    console.log('✅ Migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    // Ensure the client connection is closed
    await migrationClient.end();
    console.log('Database connection closed.');
  }
}

runMigrations();