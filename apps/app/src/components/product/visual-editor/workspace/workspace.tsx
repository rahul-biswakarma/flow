import { useCallback } from "react";
import { useDrop } from "react-dnd";
import type { ComponentDefinition } from "../types";
// import { Canvas } from "./canvas";
// import { WorkspaceToolbar } from "./workspace-toolbar";

export const Workspace = () => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleDrop = useCallback((item: ComponentDefinition) => {
    // Handle component drop logic
  }, []);

  return (
    <div className="flex h-full flex-col">
      {/* <WorkspaceToolbar />
      <div ref={drop} className="flex-1 overflow-auto bg-gray-2 p-4">
        <Canvas />
      </div> */}
    </div>
  );
};
