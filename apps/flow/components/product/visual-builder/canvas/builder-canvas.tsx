import clsx from "clsx";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useVisualBuilderContext } from "../context/visual-builder.context";
import type { VisualBuilderComponent } from "../types";
import { BuilderContainer } from "./container";

export const BuilderCanvas = () => {
  const { vbData, setVbData } = useVisualBuilderContext();
  const canvasRef = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item: { componentCode: string }, monitor) => {
      // Only handle drop if it wasn't handled by a child
      if (monitor.didDrop()) return;

      const newComponent: VisualBuilderComponent = {
        id: nanoid(),
        code: item.componentCode,
        styles: {},
        props: [],
      };

      // Create new container if dropping directly on canvas
      setVbData((prevData) => [
        ...prevData,
        {
          id: nanoid(),
          children: [newComponent],
          styles: {},
          layout: {
            direction: "column",
            justifyContent: "start",
            alignItems: "start",
            gap: "1rem",
          },
        },
      ]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  return (
    <div
      ref={(node) => {
        canvasRef.current = node;
        drop(node);
      }}
      className={clsx("h-full", {})}
    >
      {vbData.map((container) => (
        <BuilderContainer key={container.id} container={container} />
      ))}
    </div>
  );
};
