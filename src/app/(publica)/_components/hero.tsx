"use client"

import { Button } from "@/components/ui/Button";
import Particles from "@/components/ui/shadcn/particles";
import TypingAnimation from "@/components/ui/shadcn/typing-animation";
import WordRotate from "@/components/ui/shadcn/word-rotate";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="max-w-[1024px] mx-auto w-full text-center px-3">
      <div className="-space-y-4 sm:-space-y-6">
        <TypingAnimation className="font-poppins font-bold text-5xl/[50px] sm:text-6xl/normal lg:text-8xl/snug bg-gradient-to-r bg-clip-text text-transparent from-primary-500 via-primary-700 to-primary-900" as={"h1"} duration={150} >
          Organize seu tempo
        </TypingAnimation>
        <WordRotate
          className="font-inter font-semibold text-3xl sm:text-4xl lg:text-6xl bg-gradient-to-r bg-clip-text text-transparent from-primary-400/95 via-primary-600 to-primary-500"
          words={["alcance suas metas", "melhore seus hábitos", " conquiste seus objetivos"]}
          as={"h2"}
        />
      </div>
      <p className="font-inter font-medium text-lg sm:text-2xl mt-6 sm:mt-11"> Gerencie seus projetos e tarefas com eficiência: defina metas mensais de horas para suas tarefas e inicie o cronômetro para acompanhar o progresso em tempo real</p>
      <motion.div
        className="inline-flex rounded-3xl mt-5 sm:mt-9"
        animate={{
          scale: [1, 1.1, 1],
          borderWidth: [1, 3, 1],
          borderColor: ["#0d6e11", '#0d5a12', '#003304'],
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }
        }}

      >
        <Button type="link" href="/login?ref=firstAccess" className="mx-auto w-64 font-semibold">Comece agora</Button>
      </motion.div>
      <Particles
        className="absolute inset-0 z-0"
        quantity={250}
        ease={80}
        color={"#a4a4a4"}
        refresh
      />
    </section>
  )
}