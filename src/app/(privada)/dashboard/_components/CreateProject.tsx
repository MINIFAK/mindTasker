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
  open: boolean;
  onOpenChange: (open: boolean) => void
  setData: React.Dispatch<React.SetStateAction<Project[]>>
}
export function CreateProject({ setData, open, onOpenChange }: CreateProjectProps) {
  const name = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  const createProject = useCallback(async (name: string) => {
    if (!name) return setError("O nome do projeto é obrigatório")

    setError('')
    fetch("/api/projects", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name
      }),
    })
      .then(res => res.json())
      .then(project => {
        if (project.message) return setError(project.message)
        toast("O projeto foi criado com sucesso")
        setData((oldProject) => [project, ...oldProject])
      })
      .catch(() => setError("Ocorreu um erro ao criar o projeto, tente novamente"));
  }, [])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Novo Projeto</DialogTitle>
          <DialogDescription>Crie agora o seu novo projeto! Insira o nome e comece a dar forma à organização do seu tempo.</DialogDescription>
        </DialogHeader>
        <Input
          id="name"
          placeholder="Ex: Aprender Inglês, Aprender Back End..."
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