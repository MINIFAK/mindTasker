import { Metadata } from "next";
import { Register } from "./_components/register";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Login',
  description: 'Faça o Registro agora em sua conta e comece a gerenciar seus projetos e tarefas',
}

export default function PageRegister() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Register />
    </Suspense>
  );
}
