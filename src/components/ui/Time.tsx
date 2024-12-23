"use client";

import React, { Children } from "react";

interface TimerProps {
  max: number;
  current: number;
  size?: number;
  children?: React.ReactNode;
}

const Timer: React.FC<TimerProps> = ({
  max,
  current,
  size = 192,
  children,
}) => {
  const progress = (current / max) * 100;
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className="relative flex flex-col items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={size * 0.05}
          className="text-neutral-400"
          fill="transparent"
          stroke="currentColor"
        />
        {/* Progresso */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={size * 0.05}
          fill="transparent"
          className="text-primary-500"
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * progress) / 100}
          style={{
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />
      </svg>
      <div className="absolute text-black">{children}</div>
    </div>
  );
};

export default Timer;
