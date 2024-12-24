'use client'

import { PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";


import { Button } from "../ui/Button";
import HorizontalScroller from "../ui/HorizontalScroller";
import CardTask from "../ui/CardTask";

import { useRouter, useSearchParams } from "next/navigation";
import { TaskDetail } from "./TaskDetail";
import { CreateTask } from "../ui/task/CreateTask";
import useContextMenu from "@/hook/useContextMenu";
import { toast } from "sonner";
import { ContextMenu, ContextMenuButton } from "../ui/contextMenu";
import { EditTask } from "../ui/task/EditTask";
import { DeleteTask } from "../ui/task/DeleteTask";
import { Task } from "@/shader/entities/tasks";


export function Tasks(){
  const [data, setData] = useState<Task[]>([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  
  const { menuRef,handleContextMenu, visible,position } = useContextMenu()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentProject  = searchParams.get('project')
  const currentTask  = searchParams.get('task')


   useEffect(()=> {
    const getData = async() => {
      if(!currentProject) return
        setData(await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/projects/${currentProject}/tasks`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', 
          next: { revalidate: 60 }
        }).then((res) => res.json()).then((data)=> {
          return data.message ? [] : data
        }).catch(error => {
          console.error('[Erro ao buscar dados das tarefa:', error);
          return []
        }))
      }
      getData()
    }, [currentProject])
  
  if (!currentProject) return null;

  const setTask = useCallback((id: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("task", id)

    router.push(`/?${params.toString()}`)
  },[searchParams])

  const createTask = useCallback( async (name: string) => {        
    fetch("/api/tasks", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
       name,
       projectId: currentProject 
      }),
    }).then(response =>  response.json())
    .then(task => {  
      toast(task.message ?? "A tarefa foi criada com sucesso")
      if(task.message) return
      setData((oldData) => [task, ...oldData])
    })
    .catch(error => {
      console.error('Erro ao criar uma tarefa:', error);
    });
  }, [setData, currentProject])
  const editTask = useCallback(async (name: string) => {
    fetch(`/api/tasks/${currentTask}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
       name
      }),
    }).then(response =>  response.json())
    .then(task => {  
      toast(task.message ?? "O nome da tarefa foi alterado com sucesso")
      if(task.message) return
      const index = data.findIndex((data) => data.id === currentTask) 
      const oldData = data
      oldData[index].name = name
      setData(oldData)
      setOpenEdit(false)
    })
    .catch(error => {
      console.error('Erro ao alterar o nome de uma tarefa:', error);
    });
  },[setData, data, currentTask])
  const deleteTask = useCallback(async () => {
    fetch(`/api/tasks/${currentTask}`, {
      method: 'DELETE',
    }).then(response =>  response.json())
    .then(task => {  
      toast(task.message ?? "A tarefa foi deletado com sucesso")
      if(task.message) return

      setData((oldData) => oldData?.filter((project)=> project.id != currentTask))

      const params = new URLSearchParams(searchParams.toString())

      params.delete("task")

      router.push(`/?${params.toString()}`)
    })
    .catch(error => {
      console.error('Erro ao deletar um projeto:', error);
    });
  },[setData, searchParams, currentTask])

  return(
   <>
    <section className="mt-8 ml-5">
      <h2 className="font-poppins text-neutral-800 font-semibold text-3xl sm:text-4xl mb-2">
        Minhas Tarefas
      </h2>

      <div className="flex gap-4 px-1">
       <CreateTask 
          createTask={createTask}
          title="Nova Tarefa" 
          description="Crie agora o sua nova tarefa! Insira o nome e comece a dar forma à organização do seu tempo." 
          placeholder="Ex: Verbo To Be, Estudar tempos verbais..."
        >
          <Button
            type="button"
            className="min-w-24 min-h-24"
            variant="floating"
            size="floating"
          >
            <PlusIcon className="w-12 h-12 text-white" />
          </Button>
        </CreateTask>

        <HorizontalScroller>
          {data.map((task, index) => {
            return (
              <div key={index}>
                <CardTask 
                  onContextMenu={(e)=> {
                    setTask(task.id)
                    handleContextMenu(e)
                  }}
                  onClick={() => {
                    setTask(task.id)
                  }} 
                  select={currentTask === task.id ? true : false}
                  name={task.name} key={index} 
                />
              <ContextMenu visible={visible} menuRef={menuRef} position={position} >
                <ContextMenuButton onClick={() => setOpenEdit(true)}>Alterar Nome</ContextMenuButton>
                <ContextMenuButton onClick={() => setOpenDelete(true)}>Deletar Projeto</ContextMenuButton>
              </ContextMenu>
            </div>
            )
          })}
        </HorizontalScroller>
      </div>
    </section>

    <EditTask editTask={editTask} open={openEdit} onOpenChange={setOpenEdit} 
      title="Alterar nome" 
      description={`Deseja realmente alterar o nome dessa tarefa ${data.find((data)=> data.id === currentTask)?.name} ?`} 
      />
    <DeleteTask open={openDelete} onOpenChange={setOpenDelete} deleteTask={deleteTask} 
      title="Deletar Tarefa" 
      description={`Deseja realmente deletar essa tarefa ${data.find((data)=> data.id === currentTask)?.name} ?`} 
    />

    <TaskDetail task={data.find((task)=> task.id === currentTask)}/>
   </>
  )
}