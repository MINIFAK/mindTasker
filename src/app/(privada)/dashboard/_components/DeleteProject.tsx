"use client"

import { Button } from "@/components/ui/Button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/shadcn/alert-dialog";
import { Project } from "@/shader/entities/projects";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

interface DeleteProjectProps {
  open: boolean;
  currentProject: string | null
  title: string;
  description?: string;
  setData: React.Dispatch<React.SetStateAction<Project[]>>
  onOpenChange: (open: boolean) => void
}
export function DeleteProject({ title, description, open, onOpenChange, currentProject, setData }: DeleteProjectProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const deleteProject = useCallback(async () => {
    fetch(`/api/projects/${currentProject}`, {
      method: 'DELETE',
    }).then(response => response.json())
      .then(project => {
        toast(project.message ?? "O projeto foi deletado com sucesso")
        if (project.message) return

        setData((oldData) => oldData?.filter((project) => project.id != currentProject))



        const params = new URLSearchParams(searchParams.toString())
        params.delete("project")
        router.push(`/dashboard?${params.toString()}`)
      })
      .catch((error) => {
        toast("Não foi possível deletar o projeto")
      });

  }, [setData, currentProject])

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button type="button" variant="text" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button type="button" onClick={() => { onOpenChange(false); deleteProject() }}>Deletar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}