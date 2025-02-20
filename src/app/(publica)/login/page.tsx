import { Metadata } from "next";
import { Login } from "./_components/login";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Login',
  description: 'Faça o login agora em sua conta e começe a gerenciar seus projetos e tarefas',
}

export default function PageLogin() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Login />
    </Suspense>
  );
}
