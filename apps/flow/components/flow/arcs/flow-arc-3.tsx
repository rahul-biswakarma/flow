import type React from "react";

export const FlowArc3: React.FC = () => {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M100 250L200 200L300 250V350L200 400L100 350V250Z"
        fill="#145AF2"
      />
      <path d="M100 250V350L200 400V300L100 250Z" fill="#447CF5" />
      <path d="M100 250L200 200L300 250L200 300L100 250Z" fill="#5C8DF6" />
      <path
        d="M200 100L300 50L400 100V200L300 250L200 200V100Z"
        fill="#145AF2"
      />
      <path d="M200 100V200L300 250V150L200 100Z" fill="#447CF5" />
      <path d="M200 100L300 50L400 100L300 150L200 100Z" fill="#5C8DF6" />
      <path d="M0 200L100 150L200 200V300L100 350L0 300V200Z" fill="#145AF2" />
      <path d="M0 200V300L100 350V250L0 200Z" fill="#447CF5" />
      <path d="M0 200L100 150L200 200L100 250L0 200Z" fill="#5C8DF6" />
      <path d="M100 50L200 0L300 50V150L200 200L100 150V50Z" fill="#145AF2" />
      <path d="M100 50V150L200 200V100L100 50Z" fill="#447CF5" />
      <path d="M100 50L200 0L300 50L200 100L100 50Z" fill="#5C8DF6" />
    </svg>
  );
};
