'use client'

import { PlusIcon } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";

import { Button } from "../ui/Button";
import HorizontalScroller from "../ui/HorizontalScroller";
import CardTask from "../ui/CardTask";
import { CreateTask } from "../ui/CreateTask";

import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";



interface ProjectsDataProps{
  id: string
  name: string
}


export function Projects(){
  const [data, setData] = useState<ProjectsDataProps[]>()
  const router = useRouter()
  const searchParams = useSearchParams()


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
        console.error('[getProjects]: Erro ao criar um projeto buscar dados:', error);
        return []
      }))
    }
    getData()
  }, [])

  const setProject = useCallback((id: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set("project", id)

      params.delete("task")
 
      router.push(`/?${params.toString()}`)
    },[searchParams])

  const createProject = async (e: FormEvent, name: string) => {
    e.preventDefault()
    
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
      toast(data.message ?? "Novo projeto foi criado")
    })
    .catch(error => {
      console.error('Erro ao criar um projeto buscar dados:', error);
    });
  }


  
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
            <CardTask onClick={() => {
              setProject(project.id)
            }} 
            select={searchParams.get('project') === project.id ? true : false}
            name={project.name} key={index} />
          ))}
        </HorizontalScroller>
      </div>
    </section>
  )
}