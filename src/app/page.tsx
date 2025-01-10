import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import Iphone15Pro from "@/components/ui/shadcn/iphone-15-pro";
import Safari from "@/components/ui/shadcn/safari";
import { AlarmClockIcon, BrainIcon, ChartColumnIcon, MonitorSmartphoneIcon } from "lucide-react";

export default async function Home() {
  const WhatYouCanDo =  [
    {
      icon: <BrainIcon />,
      title: "Organização Total",
      description: "Gerencie múltiplos projetos ao mesmo tempo"
    },
    {
      icon: <AlarmClockIcon />,
      title: "Controle de Tarefas",
      description: "Estabeleça datas de término e metas de horas"
    },
    {
      icon: <ChartColumnIcon />,
      title: "Gráficos de Progresso",
      description: "Analise seu desempenho de forma visual"
    },
    {
      icon: <MonitorSmartphoneIcon />,
      title: "Interfaces Simples",
      description: " Use com facilidade em qualquer dispositivo"
    },
  ]
  const HowiWorks = [
    {
      title: "Crie Projetos e Tarefas:",
      description: "Planeje o que deseja realizar, como **\"Aprender Inglês\"**"
    },
    {
      title: "Defina Metas:",
      description: "Organize seu tempo com **metas** mensais de horas, **data de limite** para cada tarefa"
    },
    {
      title: "Acompanhe Progresso:",
      description: " Visualize **gráficos** claros para ver sua **produtividade** e **evolução**."
    },
    {
      title: "Simples e Gratuito:",
      description: "Todas as funcionalidades **sem custo** algum."
    },
   ]
  return (
    <>
      <Header />
      <main className="py-3 mt-16 sm:mt-36">
        <section className="max-w-[1024px] mx-auto w-full text-center px-3">
          <div className="-space-y-6">
            <h1 className="font-poppins font-bold text-4xl/relaxed sm:text-6xl/normal lg:text-8xl/snug bg-gradient-to-r bg-clip-text text-transparent from-primary-500 via-primary-700 to-primary-900">Organize seu tempo</h1>
            <h2 className="font-inter font-semibold text-2xl sm:text-4xl lg:text-6xl bg-gradient-to-r bg-clip-text text-transparent from-primary-400/75 via-primary-600 to-primary-500">alcance suas metas</h2>
          </div>
          <p className="font-inter font-medium text-lg sm:text-2xl mt-6 sm:mt-11"> Gerencie seus projetos e tarefas com eficiência: defina metas mensais de horas para suas tarefas e inicie o cronômetro para acompanhar o progresso em tempo real</p>
          <Button type="link" href="/login?ref=firstAccess" className="mx-auto mt-5 sm:mt-9 w-64 font-semibold">Comece agora</Button>
        </section>
        <section className="max-w-[1024px] mx-auto w-full mt-24 flex justify-center relative z-10 px-3">
          <Safari imageSrc="/Safari.svg" url="mindtasker.vercel.app"className="sm:w-[1024px] hidden sm:flex" />
          <Iphone15Pro imageSrc="/Iphone.svg" className="sm:absolute sm:-right-0 lg:-right-12 sm:-top-8 sm:max-w-[290px] lg:max-w-[310px]"/>
        </section>
        <section className="bg-primary-600 w-full  sm:h-[480px] -mt-16 rounded-3xl  py-1 px-3">
          <h1 className="font-poppins font-semibold text-4xl lg:text-6xl text-primary-50 text-center mt-20 sm:mt-11">O Que Você Pode Fazer ?</h1>
          <div className="flex items-center flex-col sm:flex-row gap-12 sm:gap-6 sm:justify-center mx-auto my-12">
            {WhatYouCanDo.map((item, index) => (
                <article key={index} className="w-64 h-48">
                  <div className="*:size-12 *:mx-auto">{item.icon}</div>
                  <h2 className="font-inter font-semibold text-3xl text-primary-50 text-center mt-3 mb-2">{item.title}</h2>
                  <p className="font-inter font-medium text-xl text-black text-center">{item.description}</p>
                </article>
              ))}
          </div>
        </section>
        <section className="mt-20">
          <h1 className="font-poppins font-semibold text-4xl lg:text-6xl text-primary-500 text-center">Como Funciona</h1>
          <div className="mt-11 w-[550px] max-w-full mx-auto px-3">
           {HowiWorks.map((step, index)=> (
              <article key={index} className="flex">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div className="size-16 bg-primary-600 rounded-full flex items-center justify-center font-inter font-semibold text-3xl text-primary-50">{index + 1}</div>
                    <div className="w-7 h-0.5 bg-primary-400"></div>
                  </div>
                  {index != HowiWorks.length -1 && <div className="w-0.5 h-24 bg-neutral-800 ml-8"></div>}
                </div>
                <div className="mt-3.5 -ml-1 space-y-1">
                  <h2 className="font-poppins font-semibold text-3xl sm:text-4xl text-neutral-900">{step.title}</h2>
                  <p className="text-end font-inter font-medium text-xl text-black">
                    {step.description.split("**").map((part, index) => {
                      if (index % 2 !== 0) return <strong className="text-primary-600" key={index}>{part}</strong>;
                      return part})
                    }
                  </p>
                </div>
              </article>            
             ))
           }
          </div>
        </section>
        <section className="bg-primary-700 w-full sm:h-96 rounded-3xl p-3 py-11 mt-20">
          <h1 className="font-poppins font-semibold text-4xl lg:text-6xl text-center mt-11 text-neutral-50">Está Pronto ?</h1>
          <p className="max-w-[760px] mx-auto my-8 font-inter font-medium text-xl text-primary-50 text-center">Está na hora de organizar seu tempo e realizar seus sonhos e conquista seus objetos e de forma totalmente gratuita</p>
          <Button type="link" href="/login?ref=firstAccess" className="max-w-80 mx-auto bg-neutral-800 text-neutral-50">Cadastre-se e Começe Gratuitamente</Button>
        </section>
      </main>
    </>
  );
}
