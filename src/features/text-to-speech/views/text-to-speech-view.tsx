"use client";

import { SettingsPanel } from "../components/settings-panal";
import { TextInputPanel } from "../components/text-input-panel";
import { VoicePreviewPlaceholder } from "../components/voice-preview-placeholder";

// Import the correct name from your form component file
import { TTSFormProvider } from "../components/text-to-speech-form";

export function TextToSpeechView() {
  return (
    // Wrap your components in the correct Provider
    <TTSFormProvider>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div className="flex min-h-0 flex-1 flex-col">
          <TextInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingsPanel />
      </div>
    </TTSFormProvider>
  );
}
