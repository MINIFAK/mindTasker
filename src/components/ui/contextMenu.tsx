"use client"
import { cn } from "@/lib/utils";
import React, { useState, useRef, useEffect, RefObject } from "react";

interface ContextMenuProps {
  children: React.ReactNode
  visible: boolean
  position: { x: number, y: number }
  menuRef: RefObject<any>
  className?: string
}

const ContextMenu = ({ children, visible, position, menuRef,className }: ContextMenuProps) => {

  return (
  <>
    {visible && (
      <div 
        className={cn("absolute bg-white shadow-lg rounded-lg border border-gray-200 *:w-full *:py-2 *:px-2 *:text-left *:rounded-lg *:font-inter *:text-sm *:font-medium ",className)}
        ref={menuRef}
        style={{
          top: position.y,
          left: position.x,
        }}
      >
      {children}
      </div>
    )}
  </>
  )
};

export default ContextMenu;
