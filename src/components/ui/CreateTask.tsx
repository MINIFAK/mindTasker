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
import { FormEvent, useRef, useState } from "react";

import Input from "./Input";
import { Button } from "./Button";

interface CreateTaskProps{
  children: React.ReactNode;
  createTask: (e: FormEvent, name: string) => void;
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
        <form onSubmit={(e: FormEvent)=> createTask(e, name.current?.value ?? "")} className="*:mt-1  ">
          <Input
              id="name"
              placeholder={placeholder}
              ref={name}
              />
          <DialogFooter>
            <Button type="buttonSubmit">Criar Projeto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}