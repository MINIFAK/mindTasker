"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog"
import { useRef } from "react";

import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface EditTaskProps{
  open: boolean;
  onOpenChange: (open: boolean) => void
  editTask: (name: string) => void;
  title: string;
  description?: string;
  placeholder?: string
}
export function EditTask({title,description,placeholder, open, onOpenChange,editTask}: EditTaskProps){
  const name = useRef<HTMLInputElement>(null)

  return(
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription> {description}</DialogDescription>
        </DialogHeader>
          <Input
              id="name"
              placeholder={placeholder}
              ref={name}
              />
          <DialogFooter>
            <Button onClick={()=> onOpenChange(false)} variant="outline" type="button">Cancelar</Button>
            <Button onClick={()=> editTask(name.current?.value ?? "")} type="button">Alterar Nome</Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}