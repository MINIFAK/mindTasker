"use client"

import { convertMinutesInHour, convertMinutesToHours } from "@/util/convertDate";
import { Button } from "../ui/Button";
import Timer from "../ui/Time";
import { useSearchParams } from "next/navigation";
import { Task } from "@/shader/entities/tasks";

export function TaskDetail({
  task
}: {task: Task | undefined}){
  
  if(!task) return <></>
  
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  return(
    <section className="mt-8 ml-10 mr-5 sm:flex sm:justify-between">
    <div>
      <h2 className="font-poppins text-neutral-800 font-semibold text-4xl mb-2">
        Tarefa em Foco
      </h2>
      <div className="px-1">
        <h3 className="font-inter text-primary-500 font-medium text-2xl mb-2">
          Estudar Back End
        </h3>

        <div className="flex gap-3 my-5">
          <Button type="link" href={`/cronometro?${params.toString()}`}> Iniciar Cronometro</Button>
          <Button type="button" variant="text">
            Ver gráfico
          </Button>
        </div>

        <div className="px-1 font inter text-lg">
          <p>Hoje, o total de foco na tarefa foi de <strong className="text-primary-500 font-bold">{convertMinutesToHours(task.month[new Date().getDate()] ?? 0)}</strong></p>
          <p>Nesta semana, o total de foco na tarefa foi de <strong className="text-primary-500 font-bold">{convertMinutesToHours(task.month.slice(0, 7).reduce((acc, n) => acc + n, 0))}</strong></p>
          <p>Neste mês, o total de foco na tarefa foi de <strong className="text-primary-500 font-bold">{convertMinutesToHours(task.month.reduce((acc, n) => acc + n, 0))}</strong></p>
        </div>
      </div>
    </div>
    <div className="text-center my-8 sm:my-0">
      <h2 className="font-poppins text-neutral-800 font-semibold text-4xl mb-2">
        Conquiste o Foco
      </h2>
      <p className="mb-4">
        Desmotre e conquiste o foco nessa tarefa com um total de<strong className="text-primary-500"> 100 </strong>horas
      </p>
      <div className="flex items-center justify-center">
        <Timer current={task.year?.reduce((acc, n) => acc + n, 0)} max={6000}>
          <p className="font-inter text-5xl font-semibold">{convertMinutesInHour(task.year?.reduce((acc, n) => acc + n, 0))}</p>
        </Timer>
      </div>
    </div>
  </section>
  )
}