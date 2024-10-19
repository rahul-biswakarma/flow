import type { ProjectWithPages } from "@/types";
import type React from "react";
import { createContext, useRef } from "react";

type AppContextType = {
  projectRef: React.MutableRefObject<ProjectWithPages | null>;
};

const FlowContext = createContext<AppContextType | undefined>(undefined);

export const FlowContextProvider = ({
  children,
  projectWithPages,
}: {
  children: React.ReactNode;
  projectWithPages: ProjectWithPages;
}) => {
  const projectRef = useRef<ProjectWithPages | null>(projectWithPages);
  return (
    <FlowContext.Provider value={{ projectRef }}>
      {children}
    </FlowContext.Provider>
  );
};
