import type React from "react";

export const FlowArc1: React.FC = () => {
  return (
    <svg viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 200L100 150L200 200V300L100 350L0 300V200Z" fill="#145AF2" />
      <path d="M0 200V300L100 350V250L0 200Z" fill="#447CF5" />
      <path d="M0 200L100 150L200 200L100 250L0 200Z" fill="#5C8DF6" />
      <path
        d="M200 200L300 150L400 200V300L300 350L200 300V200Z"
        fill="#145AF2"
      />
      <path d="M200 200V300L300 350V250L200 200Z" fill="#447CF5" />
      <path d="M200 200L300 150L400 200L300 250L200 200Z" fill="#5C8DF6" />
      <path d="M100 50L200 0L300 50V150L200 200L100 150V50Z" fill="#145AF2" />
      <path d="M100 50V150L200 200V100L100 50Z" fill="#447CF5" />
      <path d="M100 50L200 0L300 50L200 100L100 50Z" fill="#5C8DF6" />
      <path
        d="M100 150L200 100L300 150V250L200 300L100 250V150Z"
        fill="#145AF2"
      />
      <path d="M100 150V250L200 300V200L100 150Z" fill="#447CF5" />
      <path d="M100 150L200 100L300 150L200 200L100 150Z" fill="#88ADFD" />
    </svg>
  );
};
