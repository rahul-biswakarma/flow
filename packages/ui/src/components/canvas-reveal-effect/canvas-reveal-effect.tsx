"use client";

import {} from "@react-three/fiber";
import { Suspense } from "react";
import { cn } from "../../utils/cn";
import DynamicCanvasContent from "./dynamic-canvas-content";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}: {
  /**
   * 0.1 - slower
   * 1.0 - faster
   */
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <Suspense fallback={<div className="h-full w-full bg-white" />}>
        <DynamicCanvasContent
          animationSpeed={animationSpeed}
          opacities={opacities}
          colors={colors}
          dotSize={dotSize}
        />
      </Suspense>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  );
};
