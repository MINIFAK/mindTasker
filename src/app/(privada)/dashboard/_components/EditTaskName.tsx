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
import { Task } from "@/shader/entities/tasks";
import { toast } from "sonner";

interface EditTaskProps {
  open: boolean;
  task: Task | undefined
  setData: React.Dispatch<React.SetStateAction<Task[]>>
  onOpenChange: (open: boolean) => void
}

export function EditTaskName({ open, onOpenChange, setData, task
}: EditTaskProps) {
  const [error, setError] = useState("")

  const name = useRef<HTMLInputElement>(null)

  const editTask = useCallback(async (name: string) => {
    if (!name) return setError("O novo nome da tarefa é obrigatório")
    if (name === task?.name) return setError("O novo nome da tarefa não pode ser igual ao antigo")

    setError("")
    fetch(`/api/tasks/${task?.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name
      }),
    })
      .then(response => response.json())
      .then(task => {
        if (task.message) return setError(task.message)

        toast("O nome da tarefa foi alterado com sucesso")
        setData((tasks) => {
          const index = tasks.findIndex((oldTask) => oldTask.id === task.id)
          tasks[index].name = name
          return tasks
        })
        onOpenChange(false)
      })
      .catch(() => setError("Ocorreu um erro ao alterar o nome da tarefa, tente novamente"))
  }, [task?.id, task?.name])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Alterar nome</DialogTitle>
          <DialogDescription>Deseja realmente alterar o nome dessa tarefa <strong className="text-primary-600">{task?.name}</strong> ?</DialogDescription>
        </DialogHeader>
        <Input
          id="name"
          placeholder="Digite o novo nome..."
          ref={name}
          error={error}
        />
        <DialogFooter>
          <Button onClick={() => editTask(name.current?.value ?? "")} type="button">Alterar Nome</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}