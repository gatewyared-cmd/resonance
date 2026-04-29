import { WavyBackground } from "@/components/ui/wavy-background";

export function HeroPattern() {
  return (
    <WavyBackground
      colors={["#2DD4BF", "#22D3EE", "#38BDF8", "#818CF8"]}
      backgroundFill="white"
      blur={3}
      speed="slow"
      waveOpacity={0.1}
      waveWidth={60}
      waveYOffset={150} // ሞገዱን ከፍ ለማድረግ
      containerClassName="absolute inset-0 h-full w-full" // Removed "hidden" so content shows up
    />
  );
}
