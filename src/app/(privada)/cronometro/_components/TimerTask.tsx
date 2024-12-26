"use client"

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import Timer from "@/components/ui/Time";

export function StopWatchTask(){
  const [name, setName] = useState("...")
  const [status, setStatus] = useState<'Stopped' |'Running'|'Paused'>("Stopped")
  const [timer, setTimer] = useState(60)
  const [lastTimeSaved, setLastTimeSaved] = useState(timer)

  const searchParams = useSearchParams()
  const currentProject  = searchParams.get('project')
  const currentTask  = searchParams.get('task')

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(()=> {
    const getData = async() => {
      setName(await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/tasks/${currentTask}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        next: { revalidate: 300 }
      }).then((res) => res.json()).then((data)=> {                
        return data.name
      }).catch(error => {
        console.error('[Erro ao buscar dados das tarefa:', error);
        return ""
      }))
    }
    const getTime = async() => {
      const localTime = localStorage.getItem("time")

      if(!localTime) return 
      
      const lastTime = JSON.parse(localTime) as { projectId: string, taskId: string, time: number; lastTimeSaved: number }

      if(lastTime.projectId !== currentProject || lastTime.taskId !== currentTask) return

      setTimer(lastTime.time)
      setLastTimeSaved(lastTime.lastTimeSaved)
    }
    getData()
    getTime()
  }, [])
  
  useEffect(() => {
    if (status === "Running" && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const newTimer = timer - 1; 

        if (newTimer % 10 === 0) {
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/projects/${currentProject}/tasks/${currentTask}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              addedTime: lastTimeSaved - newTimer,
              date: new Date(),
            }),
          });
          setLastTimeSaved(newTimer);
        }

        setTimer(newTimer);
        
        localStorage.setItem("time", JSON.stringify({
          projectId: currentProject,
          taskId: currentTask,
          time: newTimer,
          lastTimeSaved: newTimer%10 === 0 ? newTimer  : lastTimeSaved,
        }));

        if (newTimer === 0) {
          setStatus("Stopped"); 
          window.Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              new Notification('MindTasker', {
                lang: 'pt-BR',
                icon: '/favicon.ico',
                body: `O cronometro da tarefa "${name}" chegou ao fim!`,
                requireInteraction: true,
              });
            }
          })
        }
      }, 60000); 
    }
    
    if (status !== "Running" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (!intervalRef.current) return
      console.log("Limpar intervalo");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [status, timer, lastTimeSaved]);

  return(
    <section>
       <Timer current={timer} max={60} size={380}>
        <p className="text-3xl font-inter text-center font-medium">{name}</p>
        <div className="my-4">  
          <div className={`flex w-80 ${status !== "Stopped" ? "justify-center" : " justify-between"}`}>
            {status === "Stopped" && (
              <button disabled={timer <= 0} className={timer === 0 ? "cursor-not-allowed text-black/50" : ""} onClick={() => setTimer(timer >= 5 ? timer - 5 : 0)}>
                <ChevronDown className="w-16 h-16"/>
              </button>
            )}
            <p className="font-poppins text-6xl font-semibold">{timer}</p>
            {status === "Stopped" && (
              <button disabled={timer === 60} className={timer === 60 ? "cursor-not-allowed text-black/50" : ""} onClick={() => setTimer(timer + 1)} >
                <ChevronUp className="w-16 h-16"/>
              </button>
            )}
          </div>
          <p className="text-2xl font-inter text-center">minutos</p>
        </div>
        <div className="m-auto w-64 flex justify-between items-center">
        {status === "Stopped" ? (
          <>
            <Button onClick={()=> setTimer(60)} type="button">Resetar</Button>
            <Button onClick={()=> setStatus("Running")} type="button">Iniciar</Button>
          </>
        ): (
          <>
            <Button onClick={()=> setStatus("Stopped")} type="button">Parar</Button>
            {status === "Paused" ? (
              <Button onClick={()=> setStatus("Running")} type="button">Voltar</Button>
            ) : (
            <Button onClick={()=> setStatus("Paused")} type="button">Pausar</Button>
            )}
          </>
        )}
        </div>  
      </Timer>
    </section>
  )
}