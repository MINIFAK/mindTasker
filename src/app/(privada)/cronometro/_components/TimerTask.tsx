"use client"

import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/Button";
import Timer from "@/components/ui/Time";
import { Task } from "@/shader/entities/tasks";


interface TimerProps {
  status: 'Stopped' | 'Running' | 'Paused';
  time: number;
  name: string;
  lastTimeSaved: number;
}
export function StopWatchTask({ currentTask }: { currentTask: Task }) {
  const [timer, setTimer] = useState<TimerProps>({
    lastTimeSaved: 60,
    status: 'Stopped',
    time: 60,
    name: currentTask.name ?? "..."
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const alertRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    window.Notification.requestPermission()

    const localTime = localStorage.getItem("timer")

    if (!localTime) return

    const lastTime = JSON.parse(localTime) as { projectId: string, taskId: string, time: number; lastTimeSaved: number }

    if (lastTime.projectId !== currentTask.projectId || lastTime.taskId !== currentTask.id) return

    setTimer((timer) => { return { ...timer, time: lastTime.time, lastTimeSaved: lastTime.lastTimeSaved } })

  }, [])

  useEffect(() => {
    if (timer.status === "Running" && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        const newTimer = timer.time - 1;

        if (newTimer % 2 === 0) {
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/projects/${currentTask.projectId}/tasks/${currentTask.id}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              addedTime: timer.lastTimeSaved - newTimer,
              date: new Date(),
            }),
          });
          setTimer((timer) => {
            return { ...timer, lastTimeSaved: newTimer };
          })
        }

        if (newTimer === 0) {
          alertRef.current?.play()
          localStorage.removeItem("timer")

          window.Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              new Notification('MindTasker', {
                lang: 'pt-BR',
                icon: '/favicon.ico',
                body: `O cronometro da tarefa "${timer.name}" chegou ao fim!`,
                requireInteraction: true,
              });
            }
          })
        } else {
          localStorage.setItem("timer", JSON.stringify({
            projectId: currentTask.projectId,
            taskId: currentTask.id,
            time: newTimer,
            lastTimeSaved: newTimer % 2 === 0 ? newTimer : timer.lastTimeSaved,
          }));
        }

        setTimer((timer) => {
          return {
            ...timer,
            time: newTimer,
            status: newTimer === 0 ? "Stopped" : "Running",
            lastTimeSaved: newTimer % 2 === 0 ? newTimer : timer.lastTimeSaved
          };
        })
      }, 60000);
    }

    if (timer.status !== "Running" && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (!intervalRef.current) return
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [timer]);


  const handleReset = useCallback(() => {
    setTimer((timer) => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/projects/${currentTask.projectId}/tasks/${currentTask.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addedTime: timer.lastTimeSaved - timer.time,
          date: new Date(),
        }),
      });
      return { ...timer, status: "Stopped", lastTimeSaved: 60, time: 60 };
    })
  }, []);

  const handleStart = useCallback(() => {
    setTimer((timer) => {
      return { ...timer, status: "Running" };
    })
  }, []);


  const handlePause = useCallback(() => {
    setTimer((timer) => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/projects/${currentTask.projectId}/tasks/${currentTask.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addedTime: timer.lastTimeSaved - timer.time,
          date: new Date(),
        }),
      });
      return { ...timer, status: "Paused", lastTimeSaved: timer.time };
    })
  }, []);

  const handleReturn = useCallback(() => {
    setTimer((timer) => {
      return { ...timer, status: "Running" };
    })
  }, []);

  return (
    <section>
      <Timer current={timer.time} max={60} size={380}>
        <audio src="/alert.mp3" ref={alertRef} preload="auto" />
        <p className="text-3xl font-inter text-center font-medium">{timer.name}</p>
        <div className="my-4">
          <div className={`flex w-80 ${timer.status !== "Stopped" ? "justify-center" : " justify-between"}`}>
            {timer.status === "Stopped" && (
              <button disabled={timer.time <= 0} className={timer.time === 0 ? "cursor-not-allowed text-black/50" : ""}
                onClick={() => setTimer((timer) => { return { ...timer, time: timer.time - 5, lastTimeSaved: timer.time - 5 } })}
              >
                <ChevronDown className="w-16 h-16" />
              </button>
            )}
            <p className="font-poppins text-6xl font-semibold">{timer.time}</p>
            {timer.status === "Stopped" && (
              <button disabled={timer.time === 60} className={timer.time === 60 ? "cursor-not-allowed text-black/50" : ""}
                onClick={() => setTimer((timer) => { return { ...timer, time: timer.time + 1, lastTimeSaved: timer.time + 1 } })}
              >
                <ChevronUp className="w-16 h-16" />
              </button>
            )}
          </div>
          <p className="text-2xl font-inter text-center">minutos</p>
        </div>
        <div className="m-auto w-64 flex justify-between items-center">
          {timer.status === "Stopped" ? (
            <>
              <Button onClick={handleReset} type="button">Resetar</Button>
              <Button onClick={handleStart} type="button">Iniciar</Button>
            </>
          ) : (
            <>
              <Button onClick={handleReset} type="button">Parar</Button>
              {timer.status === "Paused" ? (
                <Button onClick={handleReturn} type="button">Voltar</Button>
              ) : (
                <Button onClick={handlePause} type="button">Pausar</Button>
              )}
            </>
          )}
        </div>
      </Timer>
    </section>
  )
}