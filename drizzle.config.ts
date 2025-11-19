import {defineConfig} from 'drizzle-kit'

export default defineConfig({
  schema: './database/schema.ts',
  out: './drizzle',
  dialect: 'turso',
  dbCredentials:{
    url: process.env.DB_FILE_NAME!,
    authToken: process.env.DB_AUTH_TOKEN,
  }
})