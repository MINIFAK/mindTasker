import { Header } from "@/components/layout/Header";
import { StopWatchTask } from "./_components/TimerTask";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Cronometro',
}

export default async function Cronometro() {
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 p-2 xl:px-28 overflow-auto flex justify-center items-center">
        <Suspense fallback={<div>Carregando...</div>}>
          <StopWatchTask />
        </Suspense>
      </main>
    </div>
  );
}