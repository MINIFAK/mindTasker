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
  project: Project | undefined
  setData: React.Dispatch<React.SetStateAction<Project[]>>
  onOpenChange: (open: boolean) => void
}
export function EditProject({ project, open, onOpenChange, setData
}: EditProjectProps) {
  const [error, setError] = useState("")
  const name = useRef<HTMLInputElement>(null)

  const editProject = useCallback(async (name: string) => {
    if (!name) return setError("O novo nome do projeto é obrigatório")
    if (name === project?.name) return setError("O novo nome do projeto não pode ser igual ao antigo")

    setError('')
    fetch(`/api/projects/${project?.id}`, {
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

        setData((projects) => {
          const index = projects.findIndex((oldProject) => oldProject.id === project.id)
          projects[index].name = name
          return projects
        })
        onOpenChange(false)
      })
      .catch(() => setError("Ocorreu um erro ao alterar o nome do projeto, tente novamente"))
  }, [project?.id, project?.name])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Alterar nome</DialogTitle>
          <DialogDescription>Deseja realmente alterar o nome desse projeto <strong className="text-primary-600">{project?.name}</strong> ?</DialogDescription>
        </DialogHeader>
        <Input
          id="name"
          placeholder="Digite o novo nome..."
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