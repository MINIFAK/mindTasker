
import { db } from '@/services/FirebaseConnection';
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'
import { TasksProps } from '../route';

export async function GET(req: NextRequest, { params }: { params: { id: string } }){
  try{
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      throw new Error("Você precisa estar autenticado para acessar esses dados.")
    }
    
    const tasks: TasksProps[] = []
    
    const q = query(collection(db, "tasks"), where("email", "==", session.user?.email), where("projectId", "==", params.id));

    await getDocs(q).then((querySnapshot)=> {
      querySnapshot.forEach((doc) => {        
        tasks.push({
          id: doc.id,
          name: doc.data().name,
          projectId: doc.data().projectId,
          today: doc.data().today,
          week: doc.data().week,
          month: doc.data().month,
        })
      });
    })
    
    return NextResponse.json(tasks);
    } catch (error) {
    if(error instanceof Error){
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar ver todas as tarefas" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }){
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      throw new Error("Você precisa estar autenticado para acessar esses dados.")
    }

    await deleteDoc(doc(db, "tasks", params.id))

    return NextResponse.json({ id: params.id })
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar deletar uma tarefa" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }){
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      throw new Error("Você precisa estar autenticado para acessar esses dados.")
    }

    const { name } = await req.json();

    if(!name){
      throw new Error("Necessario enviar o nome da tarefa")
    } 
   await updateDoc(doc(db, "tasks", params.id), {
      name,
    })

  return NextResponse.json({ id: params.id, name: name })
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar atualizar o nome da tarefa" },
      { status: 500 }
    );
  }
}