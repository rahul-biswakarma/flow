import { useState } from "react";
import { ComponentBuilderProvider } from "./context/component-builder.context";
import { ComponentBuilderHeader } from "./header";
import { ComponentManager } from "./manager/component-manager";

import "./styles.css";
import { ComponentBuilderEditor } from "./editor/component-builder-editor";

export const ComponentBuilder = () => {
  const [viewState, setViewState] = useState<"editor" | "manager">("manager");
  const [showHeaderCreateButton, setShowHeaderCreateButton] = useState(true);

  return (
    <ComponentBuilderProvider>
      <div className="w-full grid grid-rows-[auto_1fr] h-full max-h-full">
        <ComponentBuilderHeader
          showHeaderCreateButton={showHeaderCreateButton}
          setViewState={setViewState}
          viewState={viewState}
        />
        {viewState === "editor" ? (
          <ComponentBuilderEditor />
        ) : (
          <ComponentManager
            setViewState={setViewState}
            setShowHeaderCreateButton={setShowHeaderCreateButton}
          />
        )}
      </div>
    </ComponentBuilderProvider>
  );
};
