'use client'

import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";


import { Button } from "../ui/Button";
import HorizontalScroller from "../ui/HorizontalScroller";
import CardTask from "../ui/CardTask";

import { useRouter, useSearchParams } from "next/navigation";
import { TaskDetail } from "./TaskDetail";

export interface TasksDataProps{
  projectId: string
  id: string
  name: string
  today: number
  week: number
  month: number
}

export interface TasksProps{
  data: TasksDataProps[]
}
export function Tasks({
  data: Data
}: TasksProps){

  const [data, setData] = useState<TasksDataProps[]>(Data)
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentTask  = searchParams.get('task')

  const setTask = useCallback((id: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("task", id)

    router.push(`/?${params.toString()}`)
  },[searchParams])
  
  return(
   <>
    <section className="mt-8 ml-5">
      <h2 className="font-poppins text-neutral-800 font-semibold text-3xl sm:text-4xld mb-2">
        Minhas Tarefas
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
          {data.map((task, index) => {
            if(searchParams.get('project') === task.projectId){
              return (
                <CardTask onClick={() => {
                  setTask(task.id)
                }} 
                select={currentTask === task.id ? true : false}
                name={task.name} key={index} />
              )
            }
          })}
        </HorizontalScroller>
      </div>
    </section>

    <TaskDetail task={data.find((task)=> task.id === currentTask)}/>
   </>
  )
}