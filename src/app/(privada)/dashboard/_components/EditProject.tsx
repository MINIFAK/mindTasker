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

interface EditProjectProps {
  open: boolean;
  currentProject: string | null
  title: string;
  description?: string;
  placeholder?: string
  setData: React.Dispatch<React.SetStateAction<Project[]>>
  onOpenChange: (open: boolean) => void
}
export function EditProject({ title, description, placeholder, open, onOpenChange, setData, currentProject
}: EditProjectProps) {
  const name = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  const editProject = useCallback(async (name: string) => {
    fetch(`/api/projects/${currentProject}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name
      }),
    }).then(res => res.json())
      .then(project => {
        if (project.message) return setError(project.message)

        toast("O nome do projeto foi alterado com sucesso")
        setData((oldData) => {
          const index = oldData.findIndex((data) => data.id === currentProject)
          oldData[index].name = name
          return oldData
        })
        onOpenChange(false)
      })
      .catch(() => setError("Ocorreu um erro ao editar o projeto, tente novamente"))
  }, [setData, currentProject])

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
          <Button onClick={() => editProject(name.current?.value ?? "")} type="button">Alterar Nome</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}