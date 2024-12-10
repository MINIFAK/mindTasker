"use client";
import { useRef } from "react";

interface HorizontalScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
const HorizontalScroller: React.FC<HorizontalScrollerProps> = ({
  children,
  className,
  ...props
}: HorizontalScrollerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    let startX = e.pageX - container.offsetLeft;
    let scrollLeft = container.scrollLeft;

    const handleMouseMove = (event: MouseEvent) => {
      const x = event.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Ajuste de velocidade
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className={`flex gap-4 overflow-x-auto scrollbar-hide cursor-grab px-1 ${className}`}
      onMouseDown={handleMouseDown}
      {...props}
    >
      {children}
    </div>
  );
};

export default HorizontalScroller;
