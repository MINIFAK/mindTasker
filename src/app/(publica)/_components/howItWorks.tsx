"use client"

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function HowItWorks() {
  const HowItWorks = [
    {
      title: "Crie Projetos:",
      description: "Planeje o que deseja realizar, como **\"Aprender Inglês\"**"
    },
    {
      title: "Crie Tarefas:",
      description: "Defina **tarefas** para esse projeto, como **\"Verbo To Be\"**"
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

  function CardAnimated({ step, index, delay }: { step: typeof HowItWorks[0]; index: number; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <motion.article
        key={index}
        className="flex"
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay }}
      >
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="size-16 bg-primary-600 rounded-full flex items-center justify-center font-inter font-semibold text-3xl text-primary-50">{index + 1}</div>
            <div className="w-7 h-0.5 bg-primary-400"></div>
          </div>
          {index != HowItWorks.length - 1 && <div className="w-0.5 h-24 bg-neutral-800 ml-8"></div>}
        </div>
        <div className="mt-3.5 -ml-1 space-y-1">
          <h2 className="font-poppins font-semibold text-2xl sm:text-4xl text-neutral-900">{step.title}</h2>
          <p className="text-end font-inter font-medium text-xl text-black pl-2">
            {step.description.split("**").map((part, index) => {
              if (index % 2 !== 0) return <strong className="text-primary-600" key={index}>{part}</strong>;
              return part
            })
            }
          </p>
        </div>
      </motion.article>
    );
  }

  return (
    <section className="mt-20">
      <h1 className="font-poppins font-semibold text-4xl lg:text-6xl text-primary-500 text-center">Como Funciona</h1>
      <div className="mt-11 w-[550px] max-w-full mx-auto px-2">
        {HowItWorks.map((step, index) => (
          <CardAnimated step={step} index={index} delay={index * 0.4} />
        ))}
      </div>
    </section>
  )
}