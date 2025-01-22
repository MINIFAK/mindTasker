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
  const [hour, setHour] = useState<number>(task?.goal ? Math.floor(task.goal / 60) : 0);
  const [minute, setMinute] = useState<number>(task?.goal ? task.goal % 60 : 0);

  const editTask = useCallback(async (goal: number) => {
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
        if (task.message) return toast(task.message)

        toast("A meta da tarefa foi alterada com sucesso")
        setData((tasks) => {
          const index = tasks.findIndex((OldTask) => OldTask.id === task.id)
          tasks[index].goal = goal
          return tasks
        })
        onOpenChange(false)
      })
      .catch(() => toast("Ocorreu um erro ao alterar a meta da tarefa, tente novamente"))
  }, [setData, task])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Alterar Meta</DialogTitle>
          <DialogDescription>Deseja realmente alterar a meta dessa tarefa <strong className="text-primary-400">{task?.name}</strong></DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4">
          <InputNumber
            value={hour}
            setValue={setHour}
            label="Hora"
            max={999}
          /><InputNumber
            value={minute}
            setValue={setMinute}
            label="Minutos"
            max={59}
          />
        </div>
        <DialogFooter>
          <Button onClick={() => editTask(hour * 60 + minute)} type="button">Alterar Meta</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}