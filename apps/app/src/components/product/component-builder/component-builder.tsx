import {} from "@codesandbox/sandpack-themes";
import {} from "@v1/ui/resizable";
import { ComponentBuilderHeader } from "./header";
import "./styles.css";
import { useState } from "react";
import {
  ComponentBuilderProvider,
  useComponentBuilderContext,
} from "./context/component-builder.context";
import { ComponentBuilderEditor } from "./editor/component-builder-editor";
import { ComponentManager } from "./manager/component-manager";

export const ComponentBuilder = () => {
  const { isConfigValid } = useComponentBuilderContext();

  const [viewState, setViewState] = useState<"editor" | "manager">("manager");

  return (
    <ComponentBuilderProvider>
      <div className="w-full grid grid-rows-[auto_1fr] h-full max-h-full">
        <ComponentBuilderHeader
          setViewState={setViewState}
          viewState={viewState}
        />
        {viewState === "editor" ? (
          <ComponentBuilderEditor />
        ) : (
          <ComponentManager />
        )}
      </div>
    </ComponentBuilderProvider>
  );
};
