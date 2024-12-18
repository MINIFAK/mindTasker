import { Header } from "@/components/layout/Header";
import { Projects } from "@/components/layout/Projects";
import { Tasks } from "@/components/layout/Tasks";
import { getServerSession } from "next-auth";


const tasks = Array.from({ length: 100 }, (_, index) => ({
  id: (index + 1).toString(),
  name: `Tarefa ${index + 1}`,
  projectId: `${Math.floor(Math.random() * 10) + 1}` ,
  today: Math.floor(Math.random() * 1440) + 1,
  week: Array.from({length: 7}, (_, index) => {
    return Math.floor(Math.random() * 1440) + 1
  }).reduce((acc, value)=> acc + value, 0),
  month: Array.from({length: 30}, (_, index) => {
    return Math.floor(Math.random() * 1440) + 1
  }).reduce((acc, value)=> acc + value, 0),
}));

export const getProjects = async() => {

}
export default async function Home() {
  const session = await getServerSession()

  return (
    <>
      <Header />
      <main className="p-2 xl:px-28 mt-10">
        <h1 className="font-poppins text-4xl sm:text-5xl font-medium text-neutral-800 ">
          Seja Bem Vindo
          <span className="font-bold text-primary-600 ml-3">{session?.user?.name} !</span>
        </h1>
       
        <Projects/>
        
        <Tasks data={tasks}/>     
        
      </main>
    </>
  );
}
