"use client"

import { Button } from "@/components/ui/Button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/shadcn/alert-dialog";
import { Task } from "@/shader/entities/tasks";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";

interface DeleteTaskProps {
  open: boolean;
  currentTask: string | null
  title: string;
  description?: string;
  setData: React.Dispatch<React.SetStateAction<Task[]>>
  onOpenChange: (open: boolean) => void
}

export function DeleteTask({ title, description, open, onOpenChange, currentTask, setData }: DeleteTaskProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const deleteTask = useCallback(async () => {
    fetch(`/api/tasks/${currentTask}`, {
      method: 'DELETE',
    }).then(response => response.json())
      .then(task => {
        toast(task.message ?? "A tarefa foi deletada com sucesso")
        if (task.message) return

        setData((oldData) => oldData?.filter((project) => project.id != currentTask))

        const params = new URLSearchParams(searchParams.toString())
        params.delete("task")
        router.push(`/dashboard?${params.toString()}`)
      })
      .catch((error) => {
        toast("Não foi possível deletar a tarefa")
      });
  }, [setData, currentTask])

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="*:my-0.5">
          <Button type="button" variant="text" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button type="button" onClick={() => { onOpenChange(false); deleteTask() }}>Deletar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}