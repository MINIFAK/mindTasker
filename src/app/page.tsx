import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import CardTask from "@/components/ui/CardTask";
import { PlusIcon } from "lucide-react";


const Projects = [
  "Aprender Inglês",
  "Estudar Back-End",
  "Praticar Front-End",
  "Melhorar Design",
  "Dominar React",
  "Aprofundar em Node.js",
  "Explorar Cloud Computing",
  "Entender Banco de Dados",
  "Desenvolver Portfólio",
  "Aprimorar Soft Skills"
]
const Tasks = [
  "Revisar conteúdo aprendido",
  "Praticar exercícios diários",
  "Ler documentação oficial",
  "Criar pequenos projetos",
  "Pesquisar ferramentas úteis",
  "Fazer um curso online",
  "Participar de comunidades",
  "Resolver desafios práticos",
  "Escrever resumos teóricos",
  "Testar conhecimentos com quizzes"
]


export default function Home() {
  return (
    <>
      <Header/>
      <main className="p-2 sm:px-28 mt-10">

        <h1 className="font-poppins text-5xl font-medium text-neutral-800 ">Seja Bem Vindo <span className="font-bold text-primary-600">MINIFAK</span></h1>

        <section className="mt-8 p-1">
          <h2 className="font-poppins text-neutral-800 font-semibold text-4xl mb-2">Meus Projetos</h2>
          <div className="flex gap-4">
            <CardTask data={Projects}/>
          </div>
        </section>

        <section className="mt-8 px-5">
          <h2 className="font-poppins text-neutral-800 font-semibold text-4xl mb-2">Minhas Tarefas</h2>
          <div className="flex gap-4">
            <CardTask data={Tasks}/>
          </div>
        </section>

      </main>
    </>
  );
}
