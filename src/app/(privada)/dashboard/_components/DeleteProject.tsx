"use client"

import { Button } from "@/components/ui/Button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/shadcn/alert-dialog";
import { Project } from "@/shader/entities/projects";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface DeleteProjectProps {
  open: boolean;
  project: Project | undefined
  setData: React.Dispatch<React.SetStateAction<Project[]>>
  onOpenChange: (open: boolean) => void
}
export function DeleteProject({ project, open, onOpenChange, setData }: DeleteProjectProps) {
  const [error, setError] = useState("")

  const searchParams = useSearchParams()
  const router = useRouter()

  const deleteProject = useCallback(async () => {
    setError('')
    fetch(`/api/projects/${project?.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(project => {
        if (project.message) return setError(project.message)

        toast("O projeto foi deletado com sucesso")

        setData((projects) => projects?.filter((oldProject) => oldProject.id != project.id))

        const params = new URLSearchParams(searchParams.toString())

        params.delete("project")
        params.delete("task")
        router.push(`/dashboard?${params.toString()}`)

        onOpenChange(false)
      })
      .catch(() => {
        setError("Não foi possível deletar o projeto")
      });
  }, [project?.id])

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar Projeto</AlertDialogTitle>
          <AlertDialogDescription>Deseja realmente deletar esse projeto <strong className="text-primary-600">{project?.name}</strong> ?</AlertDialogDescription>
          {error && <span className="px-1.5 font-inter font-semibold text-sm text-red-500">{error}</span>}

        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button type="button" variant="text" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button type="button" onClick={() => deleteProject()}>Deletar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}