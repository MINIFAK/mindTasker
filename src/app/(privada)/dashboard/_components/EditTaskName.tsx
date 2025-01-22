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
  currentTask: string | null
  title: string;
  description?: string;
  placeholder?: string
  setData: React.Dispatch<React.SetStateAction<Task[]>>
  onOpenChange: (open: boolean) => void
}

export function EditTaskName({ title, description, placeholder, open, onOpenChange, setData, currentTask
}: EditTaskProps) {
  const name = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  const editTask = useCallback(async (name: string) => {
    if (!name) return setError("O novo nome da tarefa é obrigatório")
    fetch(`/api/tasks/${currentTask}`, {
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
        setData((oldData) => {
          const index = oldData.findIndex((data) => data.id === currentTask)
          oldData[index].name = name
          return oldData
        })
        onOpenChange(false)
      })
      .catch(() => setError("Ocorreu um erro ao editar a tarefa, tente novamente"))
  }, [setData, currentTask])

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
          <Button onClick={() => editTask(name.current?.value ?? "")} type="button">Alterar Nome</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}