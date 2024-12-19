import { Header } from "@/components/layout/Header";
import { Projects } from "@/components/layout/Projects";
import { Tasks } from "@/components/layout/Tasks";
import { getServerSession } from "next-auth";


export default async function Home() {
  const session = await getServerSession()

  return (
    <>
      <Header />
      <main className="p-2 xl:px-28 mt-10">
        <h1 className="font-poppins text-4xl sm:text-5xl font-medium text-neutral-800 ">
          Seja Bem Vindo
          <span className="font-bold text-primary-600 ml-3">{session?.user?.name} !</span>
        </h1>
       
        <Projects/>
        
        <Tasks/>     
        
      </main>
    </>
  );
}
