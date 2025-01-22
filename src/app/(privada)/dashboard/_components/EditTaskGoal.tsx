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

import { Button } from "@/components/ui/Button";
import { Task } from "@/shader/entities/tasks";
import { toast } from "sonner";
import InputNumber from "@/components/ui/InputNumber";

interface EditTaskGoalProps {
  open: boolean;
  task: Task | undefined
  setData: React.Dispatch<React.SetStateAction<Task[]>>
  onOpenChange: (open: boolean) => void
}

export function EditTaskGoal({ open, task, onOpenChange, setData
}: EditTaskGoalProps) {
  const [error, setError] = useState("")

  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);

  const editTask = useCallback(async (goal: number) => {
    if (goal === task?.goal) return setError("A meta da tarefa não pode ser igual ao antiga")

    setError("")
    fetch(`/api/tasks/${task?.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goal
      }),
    })
      .then(response => response.json())
      .then(task => {
        if (task.message) return setError(task.message)

        toast("A meta da tarefa foi alterada com sucesso")
        setData((tasks) => {
          const index = tasks.findIndex((oldTask) => oldTask.id === task.id)
          tasks[index].goal = goal
          return tasks
        })
        onOpenChange(false)
      })
      .catch(() => setError("Ocorreu um erro ao alterar a meta da tarefa, tente novamente"))
  }, [task?.id, task?.goal])


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Alterar Meta</DialogTitle>
          <DialogDescription>Deseja realmente alterar a meta dessa tarefa <strong className="text-primary-600">{task?.name}</strong> ?</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-2 ">
          <div className="flex justify-center gap-4">
            <InputNumber
              value={hour}
              setValue={setHour}
              label="Hora"
              max={999}
            />
            <InputNumber
              value={minute}
              setValue={setMinute}
              label="Minutos"
              max={59}
            />
          </div>
          {error && <span className="px-1.5 font-inter font-semibold text-sm text-red-500">{error}</span>}
        </div>
        <DialogFooter>
          <Button onClick={() => editTask(hour * 60 + minute)} type="button">Alterar Meta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}