"use client";

import { z } from "zod";
import { formOptions } from "@tanstack/react-form";
import { useAppForm } from "@/hooks/use-app-form";

// 1. Schema definition
const ttsFormSchema = z.object({
  text: z.string().min(1, "Please enter some text"),
  voiceId: z.string().min(1, "Please select a voice"),
  temperature: z.number(),
  topP: z.number(),
  topK: z.number(),
  repetitionPenalty: z.number(),
});

export type TTSFormValues = z.infer<typeof ttsFormSchema>;

// 2. Default values
export const defaultTTSValues: TTSFormValues = {
  text: "",
  voiceId: "",
  temperature: 0.8,
  topK: 1000,
  repetitionPenalty: 1.2,
  topP: 0.95,
};

// 3. Form Options (ይህ ኮንፊገሬሽን ብቻ ነው)
export const ttsFormOptions = formOptions({
  defaultValues: defaultTTSValues,
});

// 4. TTSFormProvider Component (ትክክለኛው የኮምፖነንት አጻጻፍ)
export function TTSFormProvider({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues?: TTSFormValues;
}) {
  const form = useAppForm({
    ...ttsFormOptions,
    defaultValues: defaultValues ?? defaultTTSValues,
    validators: {
      onChange: ttsFormSchema,
    },
    onSubmit: async () => {
      
    },
  });

  return <form.AppForm>{children}</form.AppForm>;
}
