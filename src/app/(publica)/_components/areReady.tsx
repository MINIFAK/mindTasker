"use client"

import { Button } from "@/components/ui/Button";

export function AreReady() {
  return (
    <section className="bg-primary-700 w-full sm:h-96 rounded-3xl p-3 py-11 mt-20">
      <h1 className="font-poppins font-semibold text-4xl lg:text-6xl text-center mt-11 text-neutral-50">Está Pronto ?</h1>
      <p className="max-w-[760px] mx-auto my-8 font-inter font-medium text-xl text-primary-50 text-center">Está na hora de organizar seu tempo e realizar seus sonhos e conquista seus objetos e de forma totalmente gratuita</p>

      <Button type="link" href="/login?ref=firstAccess" className="w-80 mx-auto  bg-neutral-800 text-neutral-50 hover:bg-neutral-900 active:bg-neutral-700">Comece agora</Button>
    </section>
  )
}