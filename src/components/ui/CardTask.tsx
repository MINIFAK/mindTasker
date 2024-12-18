"use client";

import { HTMLAttributes } from "react";

interface CardTaskProps extends HTMLAttributes<HTMLDivElement>{
  name: string
  select?: boolean
} 

const CardTask = ({ name, select, ...props }: CardTaskProps) => {
  return (
    <div 
    className={`card min-w-48 min-h-24 bg-neutral-300 rounded-xl hover:bg-neutral-300/85 active:bg-neutral-200 cursor-pointer ${select ? "border-[1px] border-primary-500 bg-neutral-400/50" : ""}`}
    {...props}
    >
      <p className="font-inter p-2 font-medium select-none ">{name}</p>
    </div>
  );
};

export default CardTask;
