import { Header } from "@/components/layout/Header";
import { StopWatchTask } from "@/components/ui/task/TimerTask";


export default async function Cronometro(){
    return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 p-2 xl:px-28 overflow-auto flex justify-center items-center">
        <StopWatchTask />
      </main>
    </div>    
    );
}