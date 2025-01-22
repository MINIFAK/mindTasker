'use client'

import { useRouter, useSearchParams } from "next/navigation";

import { ChartColumnDecreasingIcon, DeleteIcon, PencilIcon, PlusIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ContextMenu, ContextMenuButton, ContextMenuDivider } from "@/components/ui/contextMenu";
import useContextMenu from "@/hook/useContextMenu";

import { Button } from "@/components/ui/Button";
import HorizontalScroller from "@/components/ui/HorizontalScroller";
import CardTask from "@/components/ui/CardTask";

import { CreateProject } from "./CreateProject";
import { Project } from "@/shader/entities/projects";
import { EditProject } from "./EditProject";
import { DeleteProject } from "./DeleteProject";

export function Projects() {
  const [data, setData] = useState<Project[]>([])

  const [openCreate, setOpenCreate] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)

  const { menuRef, handleContextMenu, visible, position } = useContextMenu()
  const router = useRouter()
  const searchParams = useSearchParams()

  const params = new URLSearchParams(searchParams.toString())
  params.delete("task")

  const currentProject = data.find(project => project.id === searchParams.get("project"))

  useEffect(() => {
    const getData = async () => {
      setData(await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/api/projects`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        next: { revalidate: 60 }
      }).then((res) => res.json()).then((data) => {
        return data.message ? [] : data
      }).catch(error => {
        console.error('Erro ao buscar dados dos projetos:', error);
        return []
      }))
    }
    getData()
  }, [])

  const setProject = useCallback((id: string) => {
    if (currentProject?.id === id) return

    const params = new URLSearchParams(searchParams.toString())

    params.set("project", id)

    params.delete("task")

    router.push(`/dashboard?${params.toString()}`)
  }, [searchParams, currentProject?.id])

  return (
    <>
      <section className="mt-10 sm:mt-8 ml-1">
        <h2 className="font-poppins text-neutral-800 font-semibold text-3xl sm:text-4xl mb-2">
          Meus Projetos
        </h2>
        <div className="flex gap-4 px-1">
          <Button
            type="button"
            className="min-w-24 min-h-24"
            variant="floating"
            size="floating"
            onClick={() => setOpenCreate(true)}
          >
            <PlusIcon className="w-12 h-12 text-white" />
          </Button>

          <HorizontalScroller>
            {data?.map((project, index) => (
              <div key={index}>
                <CardTask
                  onContextMenu={(e) => {
                    setProject(project.id)
                    handleContextMenu(e)
                  }}
                  onClick={() => {
                    setProject(project.id)
                  }}
                  select={currentProject?.id === project.id ? true : false}
                  name={project.name}
                />

              </div>
            ))}
          </HorizontalScroller>

          <ContextMenu visible={visible} menuRef={menuRef} position={position} >
            <ContextMenuButton onClick={() => router.push(`/grafico?${params.toString()}`)} icon={<ChartColumnDecreasingIcon />}>Ver gráfico</ContextMenuButton>
            <ContextMenuDivider />
            <ContextMenuButton onClick={() => setOpenEdit(true)} icon={<PencilIcon />}>Alterar Nome</ContextMenuButton>
            <ContextMenuDivider />
            <ContextMenuButton onClick={() => setOpenDelete(true)} icon={<DeleteIcon />}>Deletar Projeto</ContextMenuButton>
          </ContextMenu>

        </div>
      </section>
      <CreateProject
        open={openCreate} onOpenChange={setOpenCreate}
        setData={setData}
      />

      <EditProject
        open={openEdit} onOpenChange={setOpenEdit}
        setData={setData}
        project={currentProject}
      />
      <DeleteProject
        open={openDelete} onOpenChange={setOpenDelete}
        setData={setData}
        project={currentProject}
      />
    </>
  )
}