import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import CardTask from "@/components/ui/CardTask";
import HorizontalScroller from "@/components/ui/HorizontalScroller";
import Timer from "@/components/ui/Time";
import { PlusIcon } from "lucide-react";
import { getServerSession } from "next-auth";

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
  "Aprimorar Soft Skills",
];
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
  "Testar conhecimentos com quizzes",
];

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
        <section className="mt-10 sm:mt-8 ml-1">
          <h2 className="font-poppins text-neutral-800 font-semibold text-3xl sm:text-4xl mb-2">
            Meus Projetos
          </h2>
          <div className="flex gap-4 px-1">
            <Button
              type="button"
              className="min-w-24 min-h-24"
              variant="floating"
              size="floating"
            >
              <PlusIcon className="w-12 h-12 text-white" />
            </Button>
            <HorizontalScroller>
              {Projects.map((name, index) => (
                <CardTask name={name} key={index} />
              ))}
            </HorizontalScroller>
          </div>
        </section>
        <section className="mt-8 ml-5">
          <h2 className="font-poppins text-neutral-800 font-semibold text-3xl sm:text-4xld mb-2">
            Minhas Tarefas
          </h2>
          <div className="flex gap-4 px-1">
            <Button
              type="button"
              className="min-w-24 min-h-24"
              variant="floating"
              size="floating"
            >
              <PlusIcon className="w-12 h-12 text-white" />
            </Button>
            <HorizontalScroller>
              {Tasks.map((name, index) => (
                <CardTask name={name} key={index} />
              ))}
            </HorizontalScroller>
          </div>
        </section>
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
                    2 horas 16 minutos e 30 segundos
                  </strong>
                </p>
                <p>
                  Nesta semana, o total de foco na tarefa foi de{" "}
                  <strong className="text-primary-500 font-bold">
                    15 horas 5 minutos e 30 segundos
                  </strong>
                </p>
                <p>
                  Neste mês, o total de foco na tarefa foi de{" "}
                  <strong className="text-primary-500 font-bold">
                    30 horas 25 minutos
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
      </main>
    </>
  );
}
