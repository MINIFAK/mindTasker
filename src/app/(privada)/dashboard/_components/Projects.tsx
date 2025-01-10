'use client'

import { useRouter, useSearchParams } from "next/navigation";

import { PlusIcon } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { toast } from "sonner";
import {ContextMenu, ContextMenuButton} from "@/components/ui/contextMenu";
import useContextMenu from "@/hook/useContextMenu";

import { Button } from "@/components/ui/Button";
import HorizontalScroller from "@/components/ui/HorizontalScroller";
import CardTask from "@/components/ui/CardTask";

import { CreateTask } from "./CreateTask";
import { EditTask } from "./EditTask";
import { DeleteTask } from "./DeleteTask";

interface ProjectsDataProps{
  id: string
  name: string
}

export function Projects(){
  const [data, setData] = useState<ProjectsDataProps[]>([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)


  const { menuRef,handleContextMenu,visible,position } = useContextMenu()
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentProject  = searchParams.get('project')

  useEffect(()=> {
    const getData = async() => {
      setData(await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/projects`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        next: { revalidate: 60 }
      }).then((res) => res.json()).then((data)=> {
        return data.message ? [] : data
      }).catch(error => {
        console.error('Erro ao buscar dados dos projetos:', error);
        return []
      }))
    }
    getData()
  }, [])

  const setProject = useCallback((id: string) => {
      if(currentProject === id) return
      
      const params = new URLSearchParams(searchParams.toString())

      params.set("project", id)

      params.delete("task")
 
      router.push(`/dashboard?${params.toString()}`)
  },[searchParams])
  const createProject = useCallback( async (name: string) => {    
    fetch("/api/projects", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
       name
      }),
    }).then(response =>  response.json())
    .then(data => {  
      toast(data.message ?? "O projeto foi criado com sucesso")
      if(data.message) return
      setData((oldData) => [data, ...oldData])
    })
    .catch(error => {
      console.error('Erro ao criar um projeto:', error);
    });
  }, [setData])
  const editProject = useCallback(async (name: string) => {
    fetch(`/api/projects/${currentProject}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
       name
      }),
    }).then(response =>  response.json())
    .then(project => {  
      toast(project.message ?? "O nome do projeto foi alterado com sucesso")
      if(project.message) return
      const index = data.findIndex((data) => data.id === currentProject) 
      const oldData = data
      oldData[index].name = name
      setData(oldData)
      setOpenEdit(false)
    })
    .catch(error => {
      console.error('Erro ao alterar o nome de um projeto:', error);
    });
  },[setData, data, currentProject])
  const deleteProject = useCallback(async () => {
    fetch(`/api/projects/${currentProject}`, {
      method: 'DELETE',
    }).then(response =>  response.json())
    .then(project => {  
      toast(project.message ?? "O projeto foi deletado com sucesso")
      if(project.message) return

      setData((oldData) => oldData?.filter((project)=> project.id != currentProject))

      const params = new URLSearchParams(searchParams.toString())

      params.delete("project")

      router.push(`/dashboard?${params.toString()}`)
    })
    .catch(error => {
      console.error('Erro ao deletar um projeto:', error);
    });
  },[setData, searchParams, currentProject])

  return(
    <section className="mt-10 sm:mt-8 ml-1">
      <h2 className="font-poppins text-neutral-800 font-semibold text-3xl sm:text-4xl mb-2">
        Meus Projetos
      </h2>
      <div className="flex gap-4 px-1">
        <CreateTask 
          createTask={createProject}
          title="Novo Projeto" 
          description="Crie agora o seu novo projeto! Insira o nome e comece a dar forma à organização do seu tempo." 
          placeholder="Ex: Aprender Inglês, Aprender Back End..."
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
          {data?.map((project, index) => (
            <div key={index}>
               <CardTask 
                  onContextMenu={(e)=> {
                    setProject(project.id)
                    handleContextMenu(e)
                  }}
                  onClick={() => {
                    setProject(project.id)
                  }} 
                  select={currentProject === project.id ? true : false}
                  name={project.name} 
                />
              
                <ContextMenu visible={visible} menuRef={menuRef} position={position} >
                  <ContextMenuButton onClick={() => setOpenEdit(true)}>Alterar Nome</ContextMenuButton>
                  <ContextMenuButton onClick={() => setOpenDelete(true)}>Deletar Projeto</ContextMenuButton>
                </ContextMenu>
            </div>
          ))}
        </HorizontalScroller>
      </div>
      <EditTask editTask={editProject} open={openEdit} onOpenChange={setOpenEdit} 
        title="Alterar nome" 
        description={`Deseja realmente alterar o nome desse projeto ${data.find((data)=> data.id === currentProject )?.name} ?`} 
      />
      <DeleteTask open={openDelete} onOpenChange={setOpenDelete} deleteTask={deleteProject} 
        title="Deletar Projeto" 
        description={`Deseja realmente deletar esse projeto ${data.find((data)=> data.id === currentProject )?.name} ?`} 
       />
    </section>
  )
}