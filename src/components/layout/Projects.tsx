'use client'

import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";


import { Button } from "../ui/Button";
import HorizontalScroller from "../ui/HorizontalScroller";
import CardTask from "../ui/CardTask";

import { useRouter, useSearchParams } from "next/navigation";

interface ProjectsDataProps{
  id: string
  name: string
}

interface ProjectsProps{
  data: ProjectsDataProps[]
}
export function Projects({
  data: Data
}: ProjectsProps){

  const [data, setData] = useState<ProjectsDataProps[]>(Data)
  const router = useRouter()
  const searchParams = useSearchParams()

  const setProject = useCallback((id: string) => {
      const params = new URLSearchParams(searchParams.toString())

      params.set("project", id)
      params.delete("task")

 
      router.push(`/?${params.toString()}`)
    },[searchParams])
  
  return(
    <section className="mt-10 sm:mt-8 ml-1">
      <h2 className="font-poppins text-neutral-800 font-semibold text-3xl sm:text-4xl mb-2">
        Meus Projetos
      </h2>
      <div className="flex gap-4 px-1">
      <Button
          type="button"
          className="min-w-24 min-h-24"
          variant="floating"
          size="floating"
        >
          <PlusIcon className="w-12 h-12 text-white" />
        </Button>
        <HorizontalScroller>
          {data.map((project, index) => (
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