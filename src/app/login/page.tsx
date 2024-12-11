"use client"
import { Button } from "@/components/ui/Button";

import Image from "next/image";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default async function Login() {

  return (
    <main className="flex gap-20 justify-center items-center min-h-dvh">
        <Image
          src="/login.svg"
          alt="Imagem de Login do MindTasker"
          width={631} 
          height={1} 
          className="hidden xl:flex"
        />
      <section className="w-[512px] min-h-[512px] rounded-3xl flex flex-col px-4 py-12">

        <div className="relative w-30 sm:w-44 h-11 my-6 m-auto">
          <Image
            src="/MindTaskerLight.svg"
            alt="Logo do MindTasker"
            priority
            fill
          />
        </div>

        <div className="my-4">
          <h1 className="font-poppins font-semibold text-3xl text-primary-600 ">Faça Login em sua Conta</h1>
          <p className="font-inter font-medium text-lg px-1">Bem-vindo de volta! Selecione o método de login:</p>
        </div>
        
        {/* <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input ref={emailRef} placeholder="Digite seu email..." required/>
          <Input ref={passwordRef}placeholder="Digite seu senha..." required/>
          <Button type="buttonSubmit">Logar</Button>
        </form> */}

        {/* <p className="text-center font-inter font-medium my-4">ou</p> */}

        <Button type="button" onClick={() => {signIn("google", {callbackUrl: "/"})}}>
          <FcGoogle className="w-6 h-6"/>
          Entrar com o Google
        </Button>

        {/* 
          <p className="font-inter my-2 text-center">não possui uma conta ?<Link href="/register" className="text-primary-500"> Registre-se</Link></p> */}

      </section>
    </main>
  );
}
