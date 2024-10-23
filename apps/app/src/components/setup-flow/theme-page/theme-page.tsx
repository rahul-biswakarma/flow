import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { CanvasRevealEffect } from "@v1/ui/canvas-reveal-effect";
import { Heading } from "@v1/ui/heading";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { clsx } from "clsx";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export const ThemePage = ({ onNext }: { onNext: () => void }) => {
  const scopedT = useScopedI18n("setup");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  const themeCardContainerClassName =
    "w-full max-w-[250px] rounded-xl p-1 gap-4 h-full border-[3px] border-outline-00 hover:border-accent-9";
  const themeCardClassName =
    "rounded-md group/canvas-card flex items-center justify-center p-4 relative h-full w-full overflow-hidden";

  return (
    <div className="w-full h-full flex flex-col gap-7 justify-center items-center">
      <Heading size="9">{scopedT("theme_page_heading")}</Heading>
      <Text className="text-gray-10" size="3">
        {scopedT("theme_page_description")}
      </Text>
      <div className="flex items-center justify-center gap-5 w-full h-full max-h-[300px]">
        <div
          className={clsx(themeCardContainerClassName, {
            "grayscale opacity-50": theme === "dark",
            "border-accent-9": theme === "light",
          })}
          typeof="button"
          onClick={() => setTheme("light")}
          onKeyUp={(event) => {
            if (event.key === "Enter") setTheme("light");
          }}
        >
          <div className={themeCardClassName}>
            <AnimatePresence>
              <div className="h-full w-full absolute inset-0">
                <CanvasRevealEffect
                  animationSpeed={0.3}
                  containerClassName="bg-white/90"
                  colors={[
                    [65, 105, 225], // Royal Blue
                    [138, 43, 226], // Blue Violet
                    [233, 150, 122], // Dark Salmon
                  ]}
                  dotSize={1}
                  opacities={[0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.7, 0.7, 0.7, 0.9]}
                  showGradient={false}
                />
              </div>
            </AnimatePresence>
            <div className="relative z-20">
              <Icons.Sun />
            </div>
          </div>
        </div>
        <div
          typeof="button"
          onClick={() => setTheme("dark")}
          onKeyUp={(event) => {
            if (event.key === "Enter") setTheme("dark");
          }}
          className={clsx(themeCardContainerClassName, {
            "grayscale opacity-50": theme === "light",
            "border-accent-9": theme === "dark",
          })}
        >
          <div className={themeCardClassName}>
            <AnimatePresence>
              <div className="h-full w-full absolute inset-0">
                <CanvasRevealEffect
                  animationSpeed={0.3}
                  containerClassName="bg-black"
                  colors={[
                    [100, 149, 237], // Cornflower Blue
                    [147, 112, 219], // Medium Purple
                    [255, 160, 122], // Light Salmon
                  ]}
                  opacities={[0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.6, 0.6, 0.6, 0.8]}
                  showGradient={false}
                  dotSize={1}
                />
              </div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Button onClick={onNext} size="3" className="w-full max-w-[300px]">
        {scopedT("theme_page_next_button")}
        <Icons.MoveRight />
      </Button>
    </div>
  );
};
