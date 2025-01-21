import { Metadata } from "next";
import { Login } from "./_components/login";

export const metadata: Metadata = {
  title: 'Login',
  description: 'Faça o login agora em sua conta e começe a gerenciar seus projetos e tarefas',
}

export default function PageLogin() {
  return (
    <Login />
  );
}
