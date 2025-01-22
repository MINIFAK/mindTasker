'use client'

import { useRouter, useSearchParams } from "next/navigation";

import { AlarmClockIcon, CalendarIcon, ChartColumnDecreasingIcon, DeleteIcon, PencilIcon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import HorizontalScroller from "@/components/ui/HorizontalScroller";
import CardTask from "@/components/ui/CardTask";
import { ContextMenu, ContextMenuButton, ContextMenuDivider } from "@/components/ui/contextMenu";
import { TaskDetail } from "./TaskDetail";

import useContextMenu from "@/hook/useContextMenu";

import { CreateTask } from "./CreateTask";
import { EditTaskName } from "./EditTaskName";
import { DeleteTask } from "./DeleteTask";

import { Task } from "@/shader/entities/tasks";
import { EditTaskGoal } from "./EditTaskGoal";

export function Tasks() {
  const [data, setData] = useState<Task[]>([])

  const [openCreate, setOpenCreate] = useState(false)
  const [openEditName, setOpenEditName] = useState(false)
  const [openEditGoal, setOpenEditGoal] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const { menuRef, handleContextMenu, visible, position } = useContextMenu()
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const currentProject = searchParams.get('project')
  const currentTask = searchParams.get('task')

  const currentTaskData = data.find(task => task.id === currentTask)

  useEffect(() => {
    const getData = async () => {
      if (!currentProject) return
      setData(await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/projects/${currentProject}/tasks`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        next: { revalidate: 60 }
      }).then((res) => res.json()).then((data) => {
        return data.message ? [] : data
      }).catch(error => {
        console.error('[Erro ao buscar dados das tarefa:', error);
        return []
      }))
    }
    getData()
  }, [currentProject])

  const setTask = useCallback((id: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("task", id)
    router.push(`/dashboard?${params.toString()}`)
  }, [searchParams])

  if (!currentProject) return null;

  return (
    <>
      <section className="mt-8 ml-5">
        <h2 className="font-poppins text-neutral-800 font-semibold text-3xl sm:text-4xl mb-2">
          Minhas Tarefas
        </h2>

        <div className="flex gap-4 px-1">
          <Button
            type="button"
            className="min-w-24 min-h-24"
            variant="floating"
            size="floating"
            onClick={() => setOpenCreate(true)}
          >
            <PlusIcon className="w-12 h-12 text-white" />
          </Button>

          <HorizontalScroller>
            {data.map((task, index) => (
              <div>
                <CardTask
                  key={index}
                  onDoubleClick={(e) => {
                    setTask(task.id)
                    handleContextMenu(e)
                  }}
                  onContextMenu={(e) => {
                    setTask(task.id)
                    handleContextMenu(e)
                  }}
                  onClick={() => {
                    setTask(task.id)
                  }}
                  select={currentTask === task.id ? true : false}
                  name={task.name}
                />
              </div>
            )
            )}
          </HorizontalScroller>
        </div>

        <ContextMenu visible={visible} menuRef={menuRef} position={position} >
          <ContextMenuButton onClick={() => router.push(`/grafico?${params.toString()}`)} icon={<ChartColumnDecreasingIcon />}>Ver gráfico</ContextMenuButton>
          <ContextMenuDivider />
          <ContextMenuButton onClick={() => setOpenEditName(true)} icon={<PencilIcon />}>Alterar Nome</ContextMenuButton>
          <ContextMenuButton onClick={() => setOpenEditGoal(true)} icon={<AlarmClockIcon />}>Alterar Meta</ContextMenuButton>
          <ContextMenuButton onClick={() => setOpenEditGoal(true)} icon={<CalendarIcon />}>Editar Data Limite</ContextMenuButton>
          <ContextMenuDivider />
          <ContextMenuButton onClick={() => setOpenDelete(true)} icon={<DeleteIcon />}>Deletar Tarefa</ContextMenuButton>
        </ContextMenu>

      </section>

      <CreateTask
        open={openCreate} onOpenChange={setOpenCreate}
        setData={setData}
        currentProject={currentProject}
        title="Nova Tarefa"
        description="Crie agora o sua nova tarefa! Insira o nome e comece a dar forma à organização do seu tempo."
        placeholder="Ex: Verbo To Be, Estudar tempos verbais..."
      />

      <EditTaskName
        open={openEditName} onOpenChange={setOpenEditName}
        setData={setData}
        currentTask={currentTask}
        title="Alterar nome"
        description={`Deseja realmente alterar o nome dessa tarefa ${data.find((data) => data.id === currentTask)?.name} ?`}
        placeholder="Digite o novo nome..."
      />
      <EditTaskGoal
        open={openEditGoal} onOpenChange={setOpenEditGoal}
        setData={setData}
        task={currentTaskData}
      />

      <DeleteTask
        open={openDelete} onOpenChange={setOpenDelete}
        currentTask={currentTask} setData={setData}
        title="Deletar Tarefa"
        description={`Deseja realmente deletar essa tarefa ${data.find((data) => data.id === currentTask)?.name} ?`}
      />

      <TaskDetail task={data.find((task) => task.id === currentTask)} />
    </>
  )
}