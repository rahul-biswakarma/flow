"use client";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TemplatePage } from "./template-page";
import { ThemePage } from "./theme-page";
import type { TemplateType } from "./types";
import { WelcomePage } from "./welcome-page";

type View = "1" | "2" | "3" | "4" | "5" | "6";
const totalViews = 6;

const pages = [
  { id: "1", component: WelcomePage, icon: <Icons.Handshake /> },
  { id: "2", component: TemplatePage, icon: <Icons.Puzzle /> },
  { id: "3", component: ThemePage, icon: <Icons.Brush /> },
  // Add more pages here as needed
];

const Dot = () => (
  <div className="w-2.5 h-2.5 bg-gray-a3 rounded-full hover:bg-gray-a8" />
);

export const SetupFlow = () => {
  const [view, setView] = useState<View>("1");
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(
    null,
  );

  const handleViewChange = (newView: View) => {
    setDirection(
      Number.parseInt(newView) > Number.parseInt(view) ? "forward" : "backward",
    );
    setView(newView);
  };

  const pageVariants = {
    initial: (direction: string) => ({
      opacity: 0,
      scale: direction === "forward" ? 1.1 : 0.9,
    }),
    in: { opacity: 1, scale: 1 },
    out: (direction: string) => ({
      opacity: 0,
      scale: direction === "forward" ? 0.9 : 1.1,
    }),
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col">
      <AnimatePresence initial={false} mode="wait" custom={direction}>
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
                transition={pageTransition}
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
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={setSelectedTemplate}
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
          justifyContent: "center",
          alignItems: "center",
          color: "var(--gray-a9)",
        }}
      >
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
      </motion.div>
    </div>
  );
};
