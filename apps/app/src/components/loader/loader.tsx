"use client";
import { useEffect, useRef } from "react";

export const Loader = ({
  width = 50,
  height = 50,
}: {
  width?: number;
  height?: number;
}) => {
  const wave1Ref = useRef<SVGPathElement>(null);
  const wave2Ref = useRef<SVGPathElement>(null);
  const wave3Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const waves = [wave1Ref.current, wave2Ref.current, wave3Ref.current];
    const amplitude = 1.5; // Reduced amplitude for thicker waves
    const frequency = 0.2;
    const speed = 0.05;
    let phase = 0;

    const waveThickness = 10; // Thickness of each wave
    const gapThickness = 1; // Gap is half of the wave thickness

    function createPath(
      yOffset: number,
      amplitude: number,
      waveHeight: number,
    ) {
      let d = `M0 ${yOffset + amplitude}`;

      // Top curve
      for (let x = 0; x <= 40; x++) {
        const y =
          yOffset + amplitude + Math.sin(x * frequency + phase) * amplitude;
        d += ` L${x} ${y}`;
      }

      // Bottom curve (inverted sine wave)
      for (let x = 40; x >= 0; x--) {
        const y =
          yOffset +
          waveHeight -
          amplitude +
          Math.sin(x * frequency + phase) * amplitude;
        d += ` L${x} ${y}`;
      }

      d += " Z"; // Close the path
      return d;
    }

    function animateWaves() {
      phase += speed;
      waves.forEach((wave, index) => {
        if (wave) {
          const yOffset = index * (waveThickness + gapThickness);
          const waveHeight = waveThickness;
          wave.setAttribute("d", createPath(yOffset, amplitude, waveHeight));
        }
      });
      requestAnimationFrame(animateWaves);
    }

    animateWaves();
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-1">
      <svg
        width={width}
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={wave1Ref}
          fill="var(--gray-6)"
          stroke="var(--gray-6)"
          strokeWidth="0.5"
        />
        <path
          ref={wave2Ref}
          fill="var(--gray-6)"
          stroke="var(--gray-6)"
          strokeWidth="0.5"
        />
        <path
          ref={wave3Ref}
          fill="var(--gray-6)"
          stroke="var(--gray-6)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
};
