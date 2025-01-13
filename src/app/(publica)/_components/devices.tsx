"use client"

import Iphone15Pro from "@/components/ui/shadcn/iphone-15-pro";
import Safari from "@/components/ui/shadcn/safari";

export function Devices(){
  return(
    <section className="max-w-[1024px] mx-auto w-full mt-24 flex justify-center relative z-10 px-3">
    <Safari imageSrc="/Safari.svg" url="mindtasker.vercel.app"className="sm:w-[1024px] hidden sm:flex" />
    <Iphone15Pro imageSrc="/Iphone.svg" className="sm:absolute sm:-right-0 lg:-right-12 sm:-top-8 sm:max-w-[290px] lg:max-w-[310px]"/>
  </section>
  )
}