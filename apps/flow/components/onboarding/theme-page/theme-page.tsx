import { useScopedI18n } from "@flow/locales/client";
import { Button, Heading, Text } from "@ren/ui/components";
import { BackgroundGradientAnimation } from "@ren/ui/decorators";
import { Icons } from "@ren/ui/icons";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";

const lightThemeGradient = {
  gradientBackgroundStart: "rgb(240, 240, 250)",
  gradientBackgroundEnd: "rgb(255, 255, 255)",
  firstColor: "255, 225, 180",
  secondColor: "200, 230, 255",
  thirdColor: "255, 200, 220",
  fourthColor: "220, 255, 220",
  fifthColor: "255, 240, 200",
  pointerColor: "180, 220, 255",
};
const darkThemeGradient = {
  gradientBackgroundStart: "rgb(10, 10, 10)",
  gradientBackgroundEnd: "rgb(30, 30, 40)",
  firstColor: "75, 0, 130",
  secondColor: "0, 0, 128",
  thirdColor: "25, 25, 112",
  fourthColor: "47, 79, 79",
  fifthColor: "72, 61, 139",
  pointerColor: "138, 43, 226",
};

const themeCardContainerClassName =
  "w-full max-w-[250px] rounded-xl p-1 gap-4 h-full border-[3px] border-gray-4 hover:border-accent-11";
const themeCardClassName =
  "relative rounded-md group/canvas-card flex items-center justify-center p-4 relative h-full w-full overflow-hidden";

export const ThemePage = ({ onNext }: { onNext: () => void }) => {
  const scopedT = useScopedI18n("setup");
  const { setTheme, resolvedTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark" | null>(
    resolvedTheme as "light" | "dark" | null,
  );

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
            "!border-accent-10": selectedTheme === "light",
          })}
          typeof="button"
          onClick={selectLightTheme}
          onKeyUp={selectLightTheme}
        >
          <Card selectedTheme={selectedTheme} theme="light">
            <BackgroundGradientAnimation
              {...lightThemeGradient}
              containerClassName="!absolute !w-full !h-full"
            />
          </Card>
        </div>
        <div
          typeof="button"
          onClick={selectDarkTheme}
          onKeyUp={selectDarkTheme}
          className={clsx(themeCardContainerClassName, {
            "!border-accent-10": selectedTheme === "dark",
          })}
        >
          <Card selectedTheme={selectedTheme} theme="dark">
            <BackgroundGradientAnimation
              {...darkThemeGradient}
              containerClassName="!absolute !w-full !h-full"
            />
          </Card>
        </div>
      </div>
      <Button onClick={onNext} size="3" className="w-full max-w-[300px]">
        {scopedT("theme_page_next_button")}
        <Icons.ArrowNarrowRight />
      </Button>
    </div>
  );
};

const Card = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: "light" | "dark";
  selectedTheme: "light" | "dark" | null;
}) => {
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
