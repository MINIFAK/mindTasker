"use client"

import { Button } from "@/components/ui/Button";
import { FcGoogle } from "react-icons/fc";

import Image from "next/image";

import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function Login() {
  const searchParams = useSearchParams()

  let error = ""

  if (searchParams.get("error")) {
    if (searchParams.get("error") === "CredentialsSignin") {
      error = "Email ou senha incorretos"
    }
    if (searchParams.get("error") === "OAuthSignin") {
      error = "Usuário não encontrado"
    }
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      error = "Usuário não encontrado"
    }
    if (searchParams.get("error") === "OAuthCallback") {
      error = "Usuário não encontrado"
    }
    if (searchParams.get("error") === "OtherProvider") {
      error = "Usuário não encontrado nesse provedor"
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value

    signIn("credentials", {
      email,
      password,
      redirect: true,
    })
  }

  return (
    <>
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
            <h1 className="font-poppins font-semibold text-3xl text-primary-600 text-end ">Faça Login em sua Conta</h1>
            <p className="font-inter font-medium text-lg px-1 text-end">Bem-vindo de volta! Selecione o método de login:</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <Input name="email" placeholder="Digite seu email..." required />
            <Input error={error} name="password" placeholder="Digite seu senha..." type="password" required />
            <Button type="buttonSubmit">Logar</Button>
          </form>

          <p className="text-center font-inter font-medium my-4">ou</p>

          <Button type="button" onClick={() => { signIn("google", { callbackUrl: "/dashboard" }) }}>
            <FcGoogle className="w-6 h-6" />
            Entrar com o Google
          </Button>


          <p className="font-inter my-2 text-center">não possui uma conta ainda ?<Link href="/register" className="text-primary-500"> Registre-se</Link></p>

        </section>
      </main>
    </>
  );
}
