"use client";

import { Coins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { Textarea } from "@/components/ui/textarea";
import { COST_PER_UNIT, Text_Max_Length } from "../data/constants";
import { ttsFormOptions } from "./text-to-speech-form";
import { GenerateButton } from "./generate-button";
import { useStore } from "@tanstack/react-form";

export function TextInputPanel() {
  const form = useTypedAppFormContext(ttsFormOptions);

  // Use useStore to subscribe to form state
  const text = useStore(form.store, (s) => s.values.text) || "";
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);
  const isValid = useStore(form.store, (s) => s.isValid);

  // You MUST include the return keyword here
  return (
    <div className="flex flex-col flex-1 h-full border rounded-xl bg-card overflow-hidden">
      <div className="relative flex-1">
        <form.Field name="text">
          {(field) => (
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Start typing or paste your text here..."
              className="w-full h-full resize-none border-0 bg-transparent p-4 lg:p-6 text-base focus-visible:ring-0"
              maxLength={Text_Max_Length}
              disabled={isSubmitting}
            />
          )}
        </form.Field>
      </div>

      <div className="border-t bg-muted/50 p-4 lg:p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {text.length > 0 && (
              <Badge variant="outline" className="gap-1.5 border-dashed">
                <Coins className="size-3 text-yellow-500" />
                <span className="text-xs tabular-nums">
                  ${(text.length * COST_PER_UNIT).toFixed(4)} estimated
                </span>
              </Badge>
            )}

            <p className="text-xs tracking-tight">
              {text.length.toLocaleString()}
              <span className="text-muted-foreground">
                {" "}
                / {Text_Max_Length.toLocaleString()} characters
              </span>
            </p>
            <GenerateButton
              size="sm"
              disabled={isSubmitting || !isValid}
              isSubmitting={isSubmitting}
              onSubmit={() => form.handleSubmit()}
            />
          </div>

          <span className="text-xs text-muted-foreground">
            {text.split(/\s+/).filter(Boolean).length} words
          </span>
        </div>

        {/* Render the button only once at the bottom for better UX */}
      </div>
    </div>
  );
}
