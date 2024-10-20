"use client";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TemplatePage } from "./template-page";
import type { TemplateType } from "./types";
import { WelcomePage } from "./welcome-page";

type View = "1" | "2" | "3" | "4" | "5" | "6";
const totalViews = 6;

const getIcon = (view: View) => {
  switch (view) {
    case "1":
      return <Icons.Handshake />;
    case "2":
      return <Icons.Puzzle />;
    case "3":
    case "4":
    case "5":
    case "6":
      return "👋";
    default:
      return null;
  }
};

const Dot = () => (
  <div className="w-2.5 h-2.5 bg-gray-a3 rounded-full hover:bg-gray-a8" />
);

const pageVariants = {
  initial: { opacity: 0, scale: 1.1 },
  in: { opacity: 1, scale: 1 },
  out: { opacity: 0, scale: 0.9 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export const SetupFlow = () => {
  const [view, setView] = useState<View>("1");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(
    null,
  );

  const handleViewChange = (newView: View) => {
    setView(newView);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        {view === "1" && (
          <motion.div
            key="welcome"
            initial="initial"
            animate="in"
            exit="out"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            variants={pageVariants}
            transition={pageTransition}
          >
            <WelcomePage onNext={() => setView("2")} />
          </motion.div>
        )}
        {view === "2" && (
          <motion.div
            key="template"
            initial="initial"
            animate="in"
            exit="out"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            variants={pageVariants}
            transition={pageTransition}
          >
            <TemplatePage
              {...{ selectedTemplate, setSelectedTemplate }}
              onPrev={() => setView("1")}
              onNext={() => setView("3")}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        style={{
          width: "100%",
          position: "absolute",
          bottom: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "var(--color-gray-a9)",
        }}
      >
        <div className="px-5 py-3 rounded-3xl flex justify-center items-center gap-4 border border-transparent backdrop-blur hover:border:outline-03 hover:bg-gray-4 transition-all">
          {[...Array(totalViews)].map((_, index) => {
            const viewNumber = (index + 1).toString() as View;
            return (
              <IconButton
                key={viewNumber}
                variant="ghost"
                className="!bg-transparent text-gray-a9"
                onClick={() => handleViewChange(viewNumber)}
              >
                {view === viewNumber ? getIcon(viewNumber) : <Dot />}
              </IconButton>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
