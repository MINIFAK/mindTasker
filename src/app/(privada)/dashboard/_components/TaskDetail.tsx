"use client"


import { useSearchParams } from "next/navigation";

import { Task } from "@/shader/entities/tasks";
import { convertDate, convertMinutesToHours, convertMinutesToPorcent } from "@/util/convertDate";

import { Button } from "@/components/ui/Button";
import Timer from "@/components/ui/Time";
import { CalendarIcon } from "lucide-react";

export function TaskDetail({
  task
}: { task: Task | undefined }) {

  if (!task) return <></>

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const date = new Date();

  const day = date.getDate() - 1
  const daysOfWeek = day - date.getDay()

  const daysWithFocus = task.month.reduce((acc, value) => acc + (value > 0 ? 1 : 0), 0)

  const daysUntilNow = task.month.slice(0, date.getDate() + 1).reverse();
  const firstZeroIndex = daysUntilNow.findIndex(minutes => minutes === 0);

  const daysConsecutiveWithFocus = firstZeroIndex === -1 ? daysUntilNow.length : firstZeroIndex;

  return (
    <section className="mt-8 ml-10 mr-5 lg:flex sm:justify-between">
      <div>
        <h2 className="font-poppins text-neutral-800 font-semibold text-4xl mb-2">
          Tarefa em Foco
        </h2>
        <div className="px-1">
          <div className="flex gap-16 items-center mb-2">
            <h3 className="font-inter text-primary-500 font-medium text-2xl">
              {task.name}
            </h3>
            {task.deadline && (
              <div className={`flex items-center gap-1 ${new Date(task.deadline) < new Date() ? "bg-primary-700 *:text-neutral-950" : "bg-primary-400 *:text-neutral-900"} rounded-full py-1 px-4`}>
                <CalendarIcon className="size-5" />
                <h4 className="font-inter font-medium text-lg">
                  {convertDate(new Date(task.deadline))}
                </h4>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 my-8">
            <Button type="link" href={`/cronometro?${params.toString()}`}>Iniciar Cronometro</Button>
            <Button type="link" href={`/grafico/tarefa/${task?.id}`} variant="text">
              Ver gráfico
            </Button>
          </div>

          <div className="grid grid-cols-1 min-[370px]:grid-cols-2 gap-y-4 gap-x-8 sm:grid-cols-3 2xl:grid-cols-4 sm:gap-x-12">
            {[
              { label: "Hoje", value: task.month[day] ?? 0, type: "convertMinutesToHours" },
              { label: "Nesta semana", value: task.month.slice(daysOfWeek, daysOfWeek + 7).reduce((acc, n) => acc + n, 0), type: "convertMinutesToHours" },
              { label: "Neste mês", value: task.month.reduce((acc, n) => acc + n, 0), type: "convertMinutesToHours" },
              { label: "Neste ano", value: task.year.reduce((acc, n) => acc + n, 0), type: "convertMinutesToHours" },
              { label: "Dias com Foco", value: daysWithFocus, type: "text" },
              { label: "Dias Consecutivos", value: daysConsecutiveWithFocus, type: "text" },
            ].map(({ label, value, type }) => (
              <div key={label} className="bg-primary-50 p-4 rounded-2xl shadow-xl text-center flex flex-col justify-center items-center hover:bg-neutral-200/50 hover:shadow-2xl">
                <p className="text-sm font-bold text-neutral-700">{label}</p>
                {type === "convertMinutesToHours" && (
                  <strong className="text-primary-500 text-xl">{convertMinutesToHours(value as number)}</strong>
                )}
                {type === "text" && (
                  <strong className="text-primary-500 text-xl">{value}</strong>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center my-16 sm:my-8">
        <h2 className="font-poppins text-neutral-800 font-semibold text-4xl mb-2">
          Conquiste o Foco
        </h2>
        <p className="mb-4">
          Desmotre e conquiste o foco nessa tarefa com um total de<strong className="text-primary-500"> {convertMinutesToHours(task.goal ?? 60 * 30)} </strong>
        </p>
        <div className="flex items-center justify-center">
          <Timer current={task.month?.reduce((acc, n) => acc + n, 0)} max={task.goal ?? 60 * 30}>
            <p className="font-inter text-5xl font-semibold">{convertMinutesToPorcent(task.month?.reduce((acc, n) => acc + n, 0), task.goal ?? 60 * 30)}%</p>
          </Timer>
        </div>
      </div>
    </section>
  )
}