import { prisma } from "@/lib/db";
import type { Voice } from "@/generated/prisma/client";

export default async function DbTestPage() {
  const voices = await prisma.voice.findMany();
  console.log("=== Voices in the database ===", voices);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Database Connection Test</h1>
      <p style={{ color: "green", fontSize: "18px" }}>
        ✅ connected successfully
      </p>
      <h2>Number of voices found: {voices.length}</h2>

      <div style={{ marginTop: "20px" }}>
        <h3>Voice List:</h3>
        <ul>
          {voices.map((voice: Voice) => (
            <li key={voice.id}>
              <strong>{voice.name}</strong> - {voice.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
