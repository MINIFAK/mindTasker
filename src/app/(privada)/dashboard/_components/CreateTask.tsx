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

interface CreateTaskProps {
  currentProject: string
  open: boolean;
  onOpenChange: (open: boolean) => void
  setData: React.Dispatch<React.SetStateAction<Task[]>>
}

export function CreateTask({ setData, currentProject, open, onOpenChange }: CreateTaskProps) {
  const name = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  const createTask = useCallback(async (name: string) => {
    if (!name) return setError("O nome da tarefa é obrigatório")

    setError('')
    fetch("/api/tasks", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        projectId: currentProject
      }),
    })
      .then(res => res.json())
      .then(task => {
        if (task.message) return setError(task.message)
        toast("A tarefa foi criada com sucesso")
        setData((oldTask) => [task, ...oldTask])
      })
      .catch(() => setError("Ocorreu um erro ao criar a tarefa, tente novamente"));
  }, [currentProject])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
          <DialogDescription>Crie agora o sua nova tarefa! Insira o nome e comece a dar forma à organização do seu tempo</DialogDescription>
        </DialogHeader>
        <Input
          id="name"
          placeholder={"Ex: Verbo To Be, Estudar tempos verbais..."}
          ref={name}
          error={error}
        />
        <DialogFooter>
          <Button onClick={() => createTask(name.current?.value ?? "")} type="buttonSubmit">Criar Tarefa</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}