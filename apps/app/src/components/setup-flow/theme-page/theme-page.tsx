import { useScopedI18n } from "@/locales/client";
import { Button } from "@v1/ui/button";
import { CanvasRevealEffect } from "@v1/ui/canvas-reveal-effect";
import { Heading } from "@v1/ui/heading";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const themeCardContainerClassName =
  "w-full max-w-[250px] rounded-xl p-1 gap-4 h-full border-[3px] border-outline-00 hover:border-accent-9";
const themeCardClassName =
  "relative rounded-md group/canvas-card flex items-center justify-center p-4 relative h-full w-full overflow-hidden";

export const ThemePage = ({ onNext }: { onNext: () => void }) => {
  const scopedT = useScopedI18n("setup");
  const { setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark" | null>(
    null,
  );
  const [renderKey, setRenderKey] = useState("0");

  useEffect(() => {
    // Force re-render of CanvasRevealEffect on mount
    if (renderKey === "0") {
      console.log("force re-render");
      setRenderKey(new Date().getTime().toString());
    }
  }, []);

  const selectLightTheme = () => {
    setTheme("light");
    setSelectedTheme("light");
  };

  const selectDarkTheme = () => {
    setTheme("dark");
    setSelectedTheme("dark");
  };

  return (
    <div className="w-full h-full flex flex-col gap-7 justify-center items-center">
      <Heading size="9">{scopedT("theme_page_heading")}</Heading>
      <Text className="text-gray-10" size="3">
        {scopedT("theme_page_description")}
      </Text>
      <div className="flex items-center justify-center gap-5 w-full h-full max-h-[300px]">
        <div
          className={clsx(themeCardContainerClassName, {
            "grayscale opacity-20": selectedTheme === "dark",
            "!border-accent-9": selectedTheme === "light",
          })}
          typeof="button"
          onClick={selectLightTheme}
          onKeyUp={selectLightTheme}
        >
          <Card selectedTheme={selectedTheme} theme="light">
            <CanvasRevealEffect
              animationSpeed={1}
              containerClassName="bg-white/90"
              colors={[
                [65, 105, 225], // Royal Blue
                [138, 43, 226], // Blue Violet
                [233, 150, 122], // Dark Salmon
              ]}
              dotSize={2}
              opacities={[0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.7, 0.7, 0.7, 0.9]}
              showGradient={false}
            />
          </Card>
        </div>
        <div
          typeof="button"
          onClick={selectDarkTheme}
          onKeyUp={selectDarkTheme}
          className={clsx(themeCardContainerClassName, {
            "grayscale opacity-20": selectedTheme === "light",
            "!border-accent-9": selectedTheme === "dark",
          })}
        >
          <Card selectedTheme={selectedTheme} theme="dark">
            <CanvasRevealEffect
              animationSpeed={1}
              containerClassName="bg-black"
              colors={[
                [100, 149, 237], // Cornflower Blue
                [147, 112, 219], // Medium Purple
                [255, 160, 122], // Light Salmon
              ]}
              opacities={[0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.6, 0.6, 0.6, 0.8]}
              showGradient={false}
              dotSize={2}
            />
          </Card>
        </div>
      </div>
      <Button onClick={onNext} size="3" className="w-full max-w-[300px]">
        {scopedT("theme_page_next_button")}
        <Icons.MoveRight />
      </Button>
    </div>
  );
};

const Card = ({
  children,
  theme,
  selectedTheme,
}: {
  children: React.ReactNode;
  theme: "light" | "dark";
  selectedTheme: "light" | "dark" | null;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={themeCardClassName}
      style={{
        background: theme === "light" ? "white" : "black",
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="h-full w-full absolute inset-0"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
