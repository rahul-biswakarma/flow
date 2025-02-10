import type React from "react";
import "./flow-arc-2.css";

export const FlowArc2: React.FC = () => {
  return (
    <svg viewBox="0 0 400 435" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g className="cube1">
        <path d="M100 50L200 0L300 50V150L200 200L100 150V50Z" fill="#145AF2" />
        <path d="M100 50V150L200 200V100L100 50Z" fill="#447CF5" />
        <path d="M100 50L200 0L300 50L200 100L100 50Z" fill="#5C8DF6" />
      </g>

      <g className="cube2">
        <path
          d="M200 167L300 117L400 167V267L300 317L200 267V167Z"
          fill="#145AF2"
        />
        <path d="M200 167V267L300 317V217L200 167Z" fill="#447CF5" />
        <path d="M200 167L300 117L400 167L300 217L200 167Z" fill="#5C8DF6" />
      </g>

      <g className="cube3">
        <path
          d="M0 191L100 141L200 191V291L100 341L0 291V191Z"
          fill="#145AF2"
        />
        <path d="M0 191V291L100 341V241L0 191Z" fill="#447CF5" />
        <path d="M0 191L100 141L200 191L100 241L0 191Z" fill="#5C8DF6" />
      </g>

      <g className="cube4">
        <path
          d="M100 285L200 235L300 285V385L200 435L100 385V285Z"
          fill="#145AF2"
        />
        <path d="M100 285V385L200 435V335L100 285Z" fill="#447CF5" />
        <path d="M100 285L200 235L300 285L200 335L100 285Z" fill="#5C8DF6" />
      </g>
    </svg>
  );
};
