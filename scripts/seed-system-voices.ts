import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { PrismaPg } from "@prisma/adapter-pg";
import { createClient } from "@supabase/supabase-js";
import {
  PrismaClient,
  type VoiceCategory,
} from "../src/generated/prisma/client";
import { CANONICAL_SYSTEM_VOICE_NAMES } from "../src/features/voices/data/vocies-scoping";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SUPABASE_BUCKET_NAME: z.string().min(1),
});

const env = envSchema.parse(process.env);

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
});
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
);

type VoiceMetadata = {
  description: string;
  category: VoiceCategory;
  language: string;
};

const systemVoiceMetadata: Record<string, VoiceMetadata> = {
  Aaron: {
    description: "Soothing and calm, like a self-help audiobook narrator",
    category: "AUDIOBOOK",
    language: "en-US",
  },
  Abigail: {
    description: "Warm, conversational, and approachable for everyday speech",
    category: "GENERAL",
    language: "en-GB",
  },
  Anaya: {
    description: "Bright and friendly with a modern narrative cadence",
    category: "NARRATIVE",
    language: "en-US",
  },
  Andy: {
    description:
      "Casual and upbeat, ideal for customer-facing assistive voice apps",
    category: "CUSTOMER_SERVICE",
    language: "en-US",
  },
  Archer: {
    description:
      "Confident and authoritative, great for advertising and announcements",
    category: "ADVERTISING",
    language: "en-US",
  },
  Brian: {
    description:
      "Smooth, professional tone for corporate or business narration",
    category: "CORPORATE",
    language: "en-US",
  },
  Chloe: {
    description:
      "Friendly and expressive, perfect for podcast hosts and guides",
    category: "PODCAST",
    language: "en-US",
  },
  Dylan: {
    description:
      "Relaxed and conversational, suited for lifestyle and wellness content",
    category: "GENERAL",
    language: "en-US",
  },
  Emmanuel: {
    description: "Rich, articulate, and engaging for narrative storytelling",
    category: "NARRATIVE",
    language: "en-US",
  },
  Ethan: {
    description:
      "Clear and dependable, ideal for spoken instructions and guides",
    category: "VOICEOVER",
    language: "en-US",
  },
  Evelyn: {
    description: "Warm and empathetic tone for meditation and wellness scenes",
    category: "MEDITATION",
    language: "en-US",
  },
  Gavin: {
    description:
      "Energetic and commanding, suited for advertising and product intros",
    category: "ADVERTISING",
    language: "en-US",
  },
  Gordon: {
    description:
      "Deep and reassuring, strong for corporate or formal voiceovers",
    category: "CORPORATE",
    language: "en-US",
  },
  Ivan: {
    description:
      "Crisp and confident, great for technology or tutorial narration",
    category: "GENERAL",
    language: "en-US",
  },
  Laura: {
    description:
      "Bright and polished, ideal for lifestyle and conversational content",
    category: "VOICEOVER",
    language: "en-US",
  },
  Lucy: {
    description: "Warm, inviting, and personable for storytelling and podcasts",
    category: "PODCAST",
    language: "en-US",
  },
  Madison: {
    description:
      "Smooth and professional, perfect for corporate training and summaries",
    category: "CORPORATE",
    language: "en-US",
  },
  Marisol: {
    description:
      "Elegant and expressive, great for branded content and narration",
    category: "VOICEOVER",
    language: "en-US",
  },
  Meera: {
    description:
      "Calm, grounded, and supportive for meditation and wellness experiences",
    category: "MEDITATION",
    language: "en-US",
  },
  Walter: {
    description:
      "Steady and reassuring, ideal for audiobook and narrative voiceovers",
    category: "AUDIOBOOK",
    language: "en-US",
  },
};

async function seedVoices() {
  console.log(
    "Starting voice seeding to Supabase Storage and Neon Database...",
  );

  for (const voiceName of CANONICAL_SYSTEM_VOICE_NAMES) {
    const metadata = systemVoiceMetadata[voiceName];
    if (!metadata) {
      console.warn(`Skipping unknown voice metadata for ${voiceName}`);
      continue;
    }

    try {
      const filePath = path.join(
        __dirname,
        "system-voices",
        `${voiceName}.wav`,
      );
      const fileContent = await fs.readFile(filePath);
      const storagePath = `system-voices/${voiceName}.wav`;

      // 1. ፋይሉን ወደ Supabase Storage መጫን
      const { error: uploadError } = await supabase.storage
        .from(env.SUPABASE_BUCKET_NAME)
        .upload(storagePath, fileContent, {
          contentType: "audio/wav",
          upsert: true,
        });

      if (uploadError) throw uploadError;

     
      const {
        data: { publicUrl },
      } = supabase.storage
        .from(env.SUPABASE_BUCKET_NAME)
        .getPublicUrl(storagePath);

      const voiceId = voiceName.toLowerCase();

      await prisma.voice.upsert({
        where: { id: voiceId },
        update: {
          name: voiceName,
          description: metadata.description,
          category: metadata.category,
          language: metadata.language,
          audioUrl: publicUrl,
        },
        create: {
          id: voiceId,
          name: voiceName,
          description: metadata.description,
          category: metadata.category,
          language: metadata.language,
          audioUrl: publicUrl,
          variant: "SYSTEM", // 
        },
      });

      console.log(`✅ Successfully uploaded and DB seeded: ${voiceName}`);
    } catch (err) {
      console.error(`❌ Error processing ${voiceName}:`, err);
    }
  }

  console.log("Seeding process completed successfully.");
}

seedVoices()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
