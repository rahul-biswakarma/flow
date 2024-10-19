"use client";
import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
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

const Dot = () => <div className="w-2.5 h-2.5 bg-gray-a3 rounded-full" />;

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
      {view === "1" && <WelcomePage onNext={() => setView("2")} />}
      {view === "2" && (
        <TemplatePage
          {...{ selectedTemplate, setSelectedTemplate }}
          onPrev={() => setView("1")}
          onNext={() => setView("2")}
        />
      )}
      <div className="absolute w-full bottom-[25px] flex justify-center items-center text-gray-a9">
        <div className="px-5 py-3 rounded-3xl flex justify-center items-center gap-4 backdrop-blur">
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
      </div>
    </div>
  );
};
