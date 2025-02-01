"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog"
import { useCallback, useState } from "react";

import { Task } from "@/shader/entities/tasks";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { Button } from "@/components/ui/Button";

interface EditTaskGoalProps {
  open: boolean;
  task: Task | undefined
  setData: React.Dispatch<React.SetStateAction<Task[]>>
  onOpenChange: (open: boolean) => void
}


export function EditTaskDeadline({ open, task, onOpenChange, setData
}: EditTaskGoalProps) {
  const [error, setError] = useState("")

  const [date, setDate] = useState<Date | undefined>(new Date());

  const editTask = useCallback(async (deadline: Date | null) => {
    if (task?.deadline && deadline?.toDateString() === new Date(task?.deadline).toDateString())
      return setError("A data limite da tarefa não pode ser igual ao antiga")

    setError("")
    fetch(`/api/tasks/${task?.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deadline: deadline,
      }),
    })
      .then(response => response.json())
      .then(task => {
        if (task.message) return setError(task.message)

        toast("A data limite da tarefa foi alterada com sucesso")
        setData((tasks) => {
          const index = tasks.findIndex((oldTask) => oldTask.id === task.id)
          tasks[index].deadline = deadline
          return tasks
        })
        onOpenChange(false)
      })
      .catch(() => setError("Ocorreu um erro ao alterar a data limite da tarefa, tente novamente"))
  }, [task?.id, task?.goal])

  return (
    <Dialog modal={false} open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[512px] z-50">
        <DialogHeader>
          <DialogTitle>Alterar Data Limite</DialogTitle>
          <DialogDescription>Deseja realmente alterar a data limite da tarefa <strong className="text-primary-600">{task?.name}</strong> ?</DialogDescription>
        </DialogHeader>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="flex justify-center z-[50]"
        />

        {error && <span className="flex justify-center px-1.5 font-inter font-semibold text-sm text-red-500">{error}</span>}
        <DialogFooter>
          <Button onClick={() => editTask(date ?? null)} type="button">Alterar Meta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}