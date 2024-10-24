"use client";
import type { Theme } from "@/types";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SetupBackButton } from "./actions/back";
import { SkipAll } from "./actions/skip-all";
import { FinalPage } from "./final/final-page";
import { TemplatePage } from "./template-page";
import { ThemePage } from "./theme-page/theme-page";
import type { TemplateType } from "./types";
import { WelcomePage } from "./welcome-page";

type View = "1" | "2" | "3";

const Dot = () => (
  <div className="w-2.5 h-2.5 bg-gray-a3 rounded-full hover:bg-gray-a8" />
);

type BasePageProps = {
  onNext: () => void;
  onPrev: () => void;
};

export const SetupFlow = () => {
  const [view, setView] = useState<View>("1");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(
    null,
  );
  const [theme, setTheme] = useState<Theme>({
    appearance: "dark",
    panelBackground: "translucent",
    scale: "100%",
    accentColor: "indigo",
    grayColor: "sage",
  });

  useEffect(() => {
    // Set isInitialRender to false after the component mounts
    setIsInitialRender(false);
  }, []);

  const pages = [
    {
      id: "1",
      component: (props: BasePageProps) => <WelcomePage {...props} />,
      icon: <Icons.Handshake />,
    },
    {
      id: "2",
      component: (props: BasePageProps) => (
        <ThemePage {...props} {...{ theme, setTheme }} />
      ),
      icon: <Icons.Brush />,
    },
    {
      id: "3",
      component: (props: BasePageProps) => (
        <TemplatePage
          {...props}
          {...{ selectedTemplate, setSelectedTemplate }}
        />
      ),
      icon: <Icons.Puzzle />,
    },
    {
      id: "4",
      component: (props: BasePageProps) => (
        <FinalPage
          {...props}
          onComplete={() => {
            console.log("Entering the app!");
          }}
        />
      ),
      icon: <Icons.LandPlot />,
    },
  ];

  const handleViewChange = (newView: View) => {
    setDirection(
      Number.parseInt(newView) > Number.parseInt(view) ? "forward" : "backward",
    );
    setView(newView);
  };

  const pageVariants = {
    initial: (direction: string) => ({
      opacity: 0,
      x: isInitialRender ? 0 : direction === "forward" ? 20 : -20,
      y: isInitialRender ? 20 : 0,
    }),
    in: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    out: (direction: string) => ({
      opacity: 0,
      x: direction === "forward" ? -20 : 20,
      y: 0,
    }),
  };

  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3,
  };

  const initialTransition = {
    type: "tween",
    ease: "easeOut",
    duration: 0.5,
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col">
      <AnimatePresence initial={true} mode="wait" custom={direction}>
        {pages.map(
          ({ id, component: PageComponent }) =>
            view === id && (
              <motion.div
                key={id}
                custom={direction}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={
                  isInitialRender ? initialTransition : pageTransition
                }
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                }}
              >
                <PageComponent
                  onNext={() =>
                    handleViewChange(
                      (Number.parseInt(id) + 1).toString() as View,
                    )
                  }
                  onPrev={() =>
                    handleViewChange(
                      (Number.parseInt(id) - 1).toString() as View,
                    )
                  }
                />
              </motion.div>
            ),
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        style={{
          position: "absolute",
          bottom: "25px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "var(--gray-a9)",
          padding: "0 36px",
        }}
      >
        {Number.parseInt(view) !== 1 ? (
          <SetupBackButton
            onClick={() => {
              handleViewChange((Number.parseInt(view) - 1).toString() as View);
            }}
          />
        ) : (
          <div />
        )}
        <div className="px-5 py-3 rounded-3xl flex justify-center items-center gap-4 border border-transparent backdrop-blur hover:border:outline-03 hover:bg-gray-4 transition-all">
          {pages.map(({ id, icon }) => (
            <IconButton
              key={id}
              variant="ghost"
              className="!bg-transparent text-gray-a9"
              onClick={() => handleViewChange(id as View)}
            >
              {view === id ? icon : <Dot />}
            </IconButton>
          ))}
        </div>
        {Number.parseInt(view) !== 4 ? (
          <SkipAll onSkipAll={() => handleViewChange("4" as View)} />
        ) : (
          <div />
        )}
      </motion.div>
    </div>
  );
};
