"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionProps } from "motion/react";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: MotionProps;
  as?: React.ElementType;
  className?: string;
}

export default function WordRotate({
  words,
  duration = 2500,
  as: Component = "h1",
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <MotionComponent
          key={words[index]}
          className={cn(className)}
          {...framerProps}
        >
          {words[index]}
        </MotionComponent>
      </AnimatePresence>
    </div>
  );
}
