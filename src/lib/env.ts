import { z } from "zod";
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    // አሁን የተጠቀምክበት የዳታቤዝ አድራሻ መኖሩን ያረጋግጣል
    DATABASE_URL: z.string().url().min(1), 
  },
  client: {
    // ለወደፊቱ እዚህ ጋር ትጨምራለህ
  },
  // Next.js 13.4+ ለሆኑ ስሪቶች ይህ የግድ ያስፈልጋል
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});