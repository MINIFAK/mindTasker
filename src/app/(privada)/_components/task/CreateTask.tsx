"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog"
import { useRef } from "react";

import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface CreateTaskProps{
  children: React.ReactNode;
  createTask: (name: string) => void;
  title: string;
  description?: string;
  placeholder?: string
}
export function CreateTask({children,title,description,placeholder, createTask}: CreateTaskProps){
  const name = useRef<HTMLInputElement>(null)

  return(
    <Dialog>
      <DialogTrigger asChild>
       {children}
      </DialogTrigger>
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
            <Button onClick={() => createTask(name.current?.value ?? "")} type="buttonSubmit">Criar Projeto</Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}