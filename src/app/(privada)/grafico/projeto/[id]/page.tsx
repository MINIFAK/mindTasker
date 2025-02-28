import { Header } from "@/components/layout/Header"
import { Chart } from "../../_components/chart"
import { getServerData } from "@/lib/helpers";
import { Project } from "@/shader/entities/projects";
import { notFound } from "next/navigation";

export default async function GraficoProjeto({ params }: { params: { id: string } }) {
  const currentProject = await getServerData<Project | { message: string }>(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/projects/${params.id}`, {
    method: "GET",
    next: { revalidate: 120 }
  })

  if (!currentProject || "message" in currentProject) return notFound()

  return (
    <div className="flex flex-col min-h-dvh">
      <Header />
      <main className="flex-1 p-2 xl:px-28 overflow-auto flex justify-center items-center">
        <Chart currentProject={currentProject as Project} />
      </main>
    </div>
  )
}
