import type { VoiceCategory } from "@/generated/prisma/client";

export const VOICE_CATEGORY_LABELS: Record<VoiceCategory, string> = {
  AUDIOBOOK: "Audiobook",
  CANVERSATIONAL: "Conversational",
  CUSTOMER_SERVICE: "Customer Service",
  GENERAL: "General",
  NARRATIVE: "Narrative",
  CHERACTERS: "Characters",
  MEDITATION: "Meditation",
  NOTIVATIONAL: "Motivational",
  PODCAST: "Podcast",
  ADVERTISING: "Advertising",
  VOICEOVER: "Voiceover",
  CORPORATE: "Corporate",
};

export const VOICE_CATEGORIES = Object.keys(
    VOICE_CATEGORY_LABELS,
) as VoiceCategory[];
