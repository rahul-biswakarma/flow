"use client";
import type { Theme } from "@/types";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { type ComponentType, useEffect, useState } from "react";
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

type ThemePageProps = BasePageProps & {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

type TemplatePageProps = BasePageProps & {
  selectedTemplate: TemplateType | null;
  setSelectedTemplate: (template: TemplateType | null) => void;
};

type FinalPageProps = BasePageProps & {
  onComplete: () => void;
};

type PageConfig =
  | {
      id: "1";
      component: ComponentType<BasePageProps>;
      icon: React.ReactElement;
    }
  | {
      id: "2";
      component: ComponentType<ThemePageProps>;
      icon: React.ReactElement;
    }
  | {
      id: "3";
      component: ComponentType<TemplatePageProps>;
      icon: React.ReactElement;
    }
  | {
      id: "4";
      component: ComponentType<FinalPageProps>;
      icon: React.ReactElement;
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

export const SetupFlow = ({
  toggleSetupFlow,
}: {
  toggleSetupFlow: (e: boolean) => void;
}) => {
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

  const pages: PageConfig[] = [
    {
      id: "1",
      component: (props) => <WelcomePage {...props} />,
      icon: <Icons.Comet />,
    },
    {
      id: "2",
      component: (props) => <ThemePage {...props} />,
      icon: <Icons.Brush />,
    },
    {
      id: "3",
      component: (props) => <TemplatePage {...props} />,
      icon: <Icons.Puzzle />,
    },
    {
      id: "4",
      component: (props) => <FinalPage {...props} />,
      icon: <Icons.Golf />,
    },
  ];

  const handleViewChange = (newView: View) => {
    setDirection(
      Number.parseInt(newView) > Number.parseInt(view) ? "forward" : "backward",
    );
    setView(newView);
  };

  const renderPageComponent = (page: PageConfig) => {
    const baseProps = {
      onNext: () => handleViewChange((Number(page.id) + 1).toString() as View),
      onPrev: () => handleViewChange((Number(page.id) - 1).toString() as View),
    };

    switch (page.id) {
      case "1":
        return <page.component {...baseProps} />;
      case "2":
        return (
          <page.component {...baseProps} theme={theme} setTheme={setTheme} />
        );
      case "3":
        return (
          <page.component
            {...baseProps}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        );
      case "4":
        return (
          <page.component
            {...baseProps}
            onComplete={() => toggleSetupFlow(false)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col">
      <AnimatePresence initial={true} mode="wait" custom={direction}>
        {pages.map(
          (page) =>
            view === page.id && (
              <motion.div
                key={page.id}
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
                {renderPageComponent(page)}
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
        <div
          className={clsx({
            "invisible pointer-events-none": Number.parseInt(view) === 1,
          })}
        >
          <SetupBackButton
            onClick={() => {
              handleViewChange((Number.parseInt(view) - 1).toString() as View);
            }}
          />
        </div>
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
        <div
          className={clsx({
            "invisible pointer-events-none": Number.parseInt(view) === 4,
          })}
        >
          <SkipAll onSkipAll={() => handleViewChange("4" as View)} />
        </div>
      </motion.div>
    </div>
  );
};
