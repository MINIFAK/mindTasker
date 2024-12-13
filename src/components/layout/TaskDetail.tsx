"use client"

import { convertMinutesToHours } from "@/util/convertDate";
import { Button } from "../ui/Button";
import Timer from "../ui/Time";
import { TasksDataProps } from "./Tasks";

export function TaskDetail({
  task
}: {task: TasksDataProps | undefined}){
  if(!task) return <></>
  console.log(task);
  
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
          <Button type="button"> Iniciar Cronometro</Button>
          <Button type="button" variant="text">
            Ver gráfico
          </Button>
        </div>

        <div className="px-1 font inter text-lg">
          <p>
            Hoje, o total de foco na tarefa foi de{" "}
            <strong className="text-primary-500 font-bold">
              {convertMinutesToHours(task.today)}
            </strong>
          </p>
          <p>
            Nesta semana, o total de foco na tarefa foi de{" "}
            <strong className="text-primary-500 font-bold">
            {convertMinutesToHours(task.week)}
            </strong>
          </p>
          <p>
            Neste mês, o total de foco na tarefa foi de{" "}
            <strong className="text-primary-500 font-bold">
            {convertMinutesToHours(task.month)}
            </strong>
          </p>
        </div>
      </div>
    </div>
    <div className="text-center my-8 sm:my-0">
      <h2 className="font-poppins text-neutral-800 font-semibold text-4xl mb-2">
        Conquiste o Foco
      </h2>
      <p className="mb-4">
        Desmotre e conquiste o foco nessa tarefa com um total de
        <strong className="text-primary-500"> 100 </strong>
        horas
      </p>
      <div className="flex items-center justify-center">
        <Timer current={50} max={100}>
          <p className="font-inter text-5xl font-semibold">50</p>
        </Timer>
      </div>
    </div>
  </section>
  )
}