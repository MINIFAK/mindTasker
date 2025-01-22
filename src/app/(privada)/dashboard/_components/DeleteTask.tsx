"use client"

import { Button } from "@/components/ui/Button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/shadcn/alert-dialog";
import { Task } from "@/shader/entities/tasks";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

interface DeleteTaskProps {
  open: boolean;
  task: Task | undefined
  setData: React.Dispatch<React.SetStateAction<Task[]>>
  onOpenChange: (open: boolean) => void
}

export function DeleteTask({ task, open, onOpenChange, setData }: DeleteTaskProps) {
  const [error, setError] = useState("")

  const searchParams = useSearchParams()
  const router = useRouter()

  const deleteTask = useCallback(async () => {
    setError("")
    fetch(`/api/tasks/${task?.id}`, {
      method: 'DELETE',
    }).then(response => response.json())
      .then(task => {
        if (task.message) return setError(task.message)
        toast("A tarefa foi deletada com sucesso")

        setData((tasks) => tasks?.filter((oldTask) => oldTask.id != task.id))

        const params = new URLSearchParams(searchParams.toString())
        params.delete("task")
        router.push(`/dashboard?${params.toString()}`)

        onOpenChange(false)
      })
      .catch(() => {
        setError("Ocorreu um erro ao deletar a tarefa, tente novamente")
      });
  }, [task?.id])

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deletar Tarefa</AlertDialogTitle>
          <AlertDialogDescription>Deseja realmente deletar essa tarefa <strong className="text-primary-600">{task?.name}</strong> ?</AlertDialogDescription>
          {error && <span className="px-1.5 font-inter font-semibold text-sm text-red-500">{error}</span>}
        </AlertDialogHeader>
        <AlertDialogFooter className="*:my-0.5">
          <Button type="button" variant="text" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button type="button" onClick={() => deleteTask()}>Deletar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}