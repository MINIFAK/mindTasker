
"use client"
import { useRef } from 'react';

interface CardTaskProps {
  data: string[]
}
const CardTask: React.FC<CardTaskProps> = ({
  data
}: CardTaskProps) => {

 const containerRef = useRef<HTMLDivElement>(null);

 const handleMouseDown = (e: React.MouseEvent) => {
   const container = containerRef.current;
   if (!container) return;

   let startX = e.pageX - container.offsetLeft;
   let scrollLeft = container.scrollLeft;

   const handleMouseMove = (event: MouseEvent) => {
     const x = event.pageX - container.offsetLeft;
     const walk = (x - startX) * 2; // Ajuste de velocidade
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
     className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab px-1"
     onMouseDown={handleMouseDown}
   >
    {data.map((name, index) => (
      <div key={index} className='card min-w-48 min-h-24 bg-neutral-300 rounded-xl'>
        <p className='font-inter p-2 font-medium select-none '>{name}</p>
      </div>
     ))}
   </div>
 );

};

export default CardTask;
