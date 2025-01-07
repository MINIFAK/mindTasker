"use client"

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";


export default function Error(){
  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
     <main className="flex justify-center items-center flex-1 flex-col w-[512px] m-auto">  
      <h1 className="font-poppins text-9xl text-primary-500 font-bold mt-10">404</h1>
      <p className="font-inter font-medium text-lg mt-4 text-center">Essa página não foi encontrada, volte para a inicio e continue explorando.</p>
      <Button type="link" href="/" className="mt-4">Voltar para a página inicial</Button>
     </main>
    </div>
  );
};

