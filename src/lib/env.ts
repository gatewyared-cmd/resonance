import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url().min(1),
    APP_URL: z.string().url().min(1),
    // የ R2 ስሞችን በእነዚህ ተክተናል
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
    SUPABASE_BUCKET_NAME: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  },

  experimental__runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    SUPABASE_BUCKET_NAME: process.env.SUPABASE_BUCKET_NAME,
    APP_URL: process.env.APP_URL,
  } as Record<string, string | undefined>,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
