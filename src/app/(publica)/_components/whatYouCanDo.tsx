"use client"

import { motion, useInView } from "motion/react";
import { AlarmClockIcon, BrainIcon, ChartColumnIcon, MonitorSmartphoneIcon } from "lucide-react";
import { useRef } from "react";

export function WhatYouCanDo() {
  const WhatYouCanDo = [
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
  function CardAnimated({ item, index, delay }: { item: typeof WhatYouCanDo[0]; index: number; delay: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <motion.article
        whileHover={{ scale: 1.2, transition: { duration: 0.3, ease: "easeInOut" } }}
        key={index}
        className="w-64 h-48"
        ref={ref}
        initial={{ opacity: 0, y: 20, x: -150 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}} // Só anima quando o item está visível
        transition={{ duration: 0.5, delay }}
      >
        <div className="*:size-12 *:mx-auto">{item.icon}</div>
        <h2 className="font-inter font-semibold text-3xl text-primary-50 text-center mt-3 mb-2">{item.title}</h2>
        <p className="font-inter font-medium text-xl text-black text-center">{item.description}</p>
      </motion.article>
    );
  }
  return (
    <section className="bg-primary-600 w-full  sm:h-[480px] -mt-16 rounded-3xl  py-1 px-3">
      <h1 className="font-poppins font-semibold text-4xl lg:text-6xl text-primary-50 text-center mt-20 sm:mt-11">O Que Você Pode Fazer ?</h1>
      <div className="flex items-center flex-col sm:flex-row gap-12 sm:gap-6 justify-center mx-auto my-14">
        {WhatYouCanDo.map((item, index) => (
          <CardAnimated key={index} item={item} index={index} delay={index * 0.5} />
        ))}
      </div>
    </section>
  )
}