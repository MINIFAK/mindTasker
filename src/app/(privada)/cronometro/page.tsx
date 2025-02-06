import { Header } from "@/components/layout/Header";
import { StopWatchTask } from "./_components/TimerTask";
import { Metadata } from "next";
import { getServerData } from "@/lib/helpers";
import { notFound } from "next/navigation";
import { Task } from "@/shader/entities/tasks";

export const metadata: Metadata = {
  title: 'Cronometro',
}

export default async function Cronometro({ searchParams }: { searchParams: { task?: string } }) {
  const currentDataTask = await getServerData<Task | { message: string }>(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/tasks/${searchParams.task}`, {
    method: "GET",
    next: { revalidate: 120 }
  })

  if (!currentDataTask || "message" in currentDataTask) return notFound()

  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 p-2 xl:px-28 overflow-auto flex justify-center items-center">
        <StopWatchTask currentTask={currentDataTask} />
      </main>
    </div>
  );
}