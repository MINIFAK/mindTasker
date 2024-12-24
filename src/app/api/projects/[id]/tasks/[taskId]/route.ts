
import { db } from '@/services/FirebaseConnection';
import { Task } from '@/shader/entities/tasks';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string; taskId: string} }){
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) throw new Error("Você precisa estar autenticado para acessar esses dados.")

    const { addedTime, date } = await req.json();

    if(!addedTime) throw new Error("Necessario enviar o que irar adicionar tempo")

    const now = new Date(date)

    const projectSnap = await getDoc(doc(db, "projects", params.id));
    if(!projectSnap.exists()) throw new Error("Projeto não encontrada")

    const project = projectSnap.data() as Task
    if(!project) throw new Error("Projeto não encontrada")
    
    const projectYear = [...project.year]
    const projectMonth = [...project.month]
    
    projectYear[now.getMonth() + 1] += Number(addedTime)
    projectMonth[now.getDate()] += Number(addedTime)
    
    await updateDoc(doc(db, "projects", params.id), {
      year: projectYear,
      month: projectMonth
    })

    const taskSnap = await getDoc(doc(db, "tasks", params.taskId));
    if(!taskSnap.exists()) throw new Error("Tarefa não encontrada")

    const task = taskSnap.data() as Task
    if(!task) throw new Error("Tarefa não encontrada")

    const taskYear = [...task.year]
    const taskMonth = [...task.month]
    
    taskYear[now.getMonth() + 1] += Number(addedTime)
    taskMonth[now.getDate()] += Number(addedTime)
    
    await updateDoc(doc(db, "tasks", params.taskId), {
      year: taskYear,
      month: taskMonth
    })

  return NextResponse.json({ id: params.id })
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar atualizar o tempo da tarefas " },
      { status: 500 }
    );
  }
}