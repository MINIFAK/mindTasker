"use client"

import { motion, useScroll, useSpring } from "motion/react"
import { Header } from "@/components/layout/Header";
import { Hero } from "./_components/hero";
import { Devices } from "./_components/devices";
import { WhatYouCanDo } from "./_components/whatYouCanDo";
import { HowItWorks } from "./_components/howItWorks";
import { AreReady } from "./_components/areReady";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      <Header />
      <motion.div
        className="bg-primary-500 absolute z-50 scale top-0 left-0 right-0 h-2"
        id="scroll-indicator"
        style={{ scaleX, position: "fixed", originX: 0, }}
      />
      <main className="py-3 mt-16 sm:mt-36" id="slow-region" >
        <Hero />
        <Devices />
        <WhatYouCanDo />
        <HowItWorks />
        <AreReady />
      </main>
    </>
  );
}
