import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

// Supabase Client መፍጠር
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY, // Server-side ስለሆነ Service Role መጠቀም ይሻላል
);

type UploadAudioOptions = {
  buffer: Buffer;
  key: string;
  contentType?: string;
};

// 1. Audio Upload ለማድረግ
export async function uploadAudio({
  buffer,
  key,
  contentType = "audio/wav",
}: UploadAudioOptions): Promise<void> {
  const { error } = await supabase.storage
    .from(env.SUPABASE_BUCKET_NAME)
    .upload(key, buffer, {
      contentType: contentType,
      upsert: true, // ፋይሉ ካለ ደርቦ እንዲጽፈው
    });

  if (error) throw error;
}

// 2. Audio ለማጥፋት
export async function deleteAudio(key: string): Promise<void> {
  const { error } = await supabase.storage
    .from(env.SUPABASE_BUCKET_NAME)
    .remove([key]);

  if (error) throw error;
}

// 3. ጊዜያዊ ሊንክ (Signed URL) ለመፍጠር
export async function getSignedAudioUrl(key: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(env.SUPABASE_BUCKET_NAME)
    .createSignedUrl(key, 3600); // ለ 1 ሰአት የሚቆይ

  if (error) throw error;
  return data.signedUrl;
}
