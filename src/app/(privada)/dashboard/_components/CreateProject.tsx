"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog"
import { useCallback, useRef, useState } from "react";

import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { toast } from "sonner";
import { Project } from "@/shader/entities/projects";

interface CreateProjectProps {
  title: string;
  description?: string;
  placeholder?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void
  setData: React.Dispatch<React.SetStateAction<Project[]>>
}
export function CreateProject({ title, description, placeholder, setData, open, onOpenChange }: CreateProjectProps) {
  const name = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  const createProject = useCallback(async (name: string) => {
    fetch("/api/projects", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name
      }),
    }).then(res => res.json())
      .then(project => {
        if (project.message) return setError(project.message)
        toast("O projeto foi criado com sucesso")
        setData((oldData) => [project, ...oldData])
      })
      .catch(() => setError("Ocorreu um erro ao criar o projeto, tente novamente"));
  }, [setData])

  return (
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
          error={error}
        />
        <DialogFooter>
          <Button onClick={() => createProject(name.current?.value ?? "")} type="buttonSubmit">Criar Projeto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}