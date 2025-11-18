import {defineConfig} from 'drizzle-kit'


export default defineConfig({
  schema: './database/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials:{
    url: 'file:local.db'
  }
})