// drizzle.config.ts
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: '.env' }); // Explicitly tell dotenv where to find the .env file

export default {
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations",
  dialect: "postgresql", // <-- THIS IS THE FIX: 'driver' is now 'dialect'
  dbCredentials: {
    url: process.env.DATABASE_URL!, // <-- Use 'url' instead of 'connectionString'
  },
} satisfies Config;