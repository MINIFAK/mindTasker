"use client"

import { cn } from "@/lib/utils";
import React, { RefObject, ButtonHTMLAttributes } from "react";

interface ContextMenuProps {
  children: React.ReactNode
  visible: boolean
  position: { x: number, y: number }
  menuRef: RefObject<any>
  className?: string
}

const ContextMenu = ({ children, visible, position, menuRef, className }: ContextMenuProps) => {
  return (
    <>
      {visible && (
        <div
          className={cn("absolute bg-white shadow-2xl rounded-lg flex flex-col p-1", className)}
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

interface ContextMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}
const ContextMenuButton = ({ children, className, icon, ...props }: ContextMenuButtonProps) => {
  return (
    <button
      className={cn("w-52 h-7 text-left rounded-xl font-inter text-sm font-medium align-text-top px-2 hover:bg-primary-500", `${icon ? 'flex items-center gap-2' : ''}`, className)}
      {...props}
    >
      {icon && <span className="*:size-5">{icon}</span>}
      {children}
    </button>
  )
};

interface ContextMenuDividerProps {
  className?: { hr?: string; div?: string }
}
const ContextMenuDivider = ({ className }: ContextMenuDividerProps) => {
  return (
    <div className={cn("m-1", className?.div)}>
      <hr className={cn("h-[1px] opacity-30 bg-gradient-to-r from-neutral-400 to-neutral-500/90 border-0", className?.hr)} />
    </div>
  )
};

interface ContextMenuTitle {
  children: React.ReactNode
  className?: string
}
const ContextMenuTitle = ({ children, className }: ContextMenuTitle) => {
  return (
    <h3 className={cn("cursor-default px-2 rounded-xl text-left font-inter font-semibold", className)}>{children}</h3>
  )
};




export { ContextMenu, ContextMenuButton, ContextMenuDivider, ContextMenuTitle };