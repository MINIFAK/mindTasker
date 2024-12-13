import { Header } from "@/components/layout/Header";
import { Projects } from "@/components/layout/Projects";
import { Tasks } from "@/components/layout/Tasks";
import { getServerSession } from "next-auth";

const projects = [
  { id: "1", name: "Aprender Inglês" },
  { id: "2", name: "Estudar Back-End" },
  { id: "3", name: "Praticar Front-End" },
  { id: "4", name: "Melhorar Design" },
  { id: "5", name: "Dominar React" },
  { id: "6", name: "Aprofundar em Node.js" },
  { id: "7", name: "Explorar Cloud Computing" },
  { id: "8", name: "Entender Banco de Dados" },
  { id: "9", name: "Desenvolver Portfólio" },
  { id: "10", name: "Aprimorar Soft Skills" },
];
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
       
        <Projects data={projects}/>
        
        <Tasks data={tasks}/>
      </main>
    </>
  );
}
