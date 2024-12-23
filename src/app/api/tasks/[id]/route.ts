
import { db } from '@/services/FirebaseConnection';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'
import { TasksProps } from '../route';

export async function GET(req: NextRequest, { params }: { params: { id: string } }){
  try{
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      throw new Error("Você precisa estar autenticado para acessar esses dados.")
    }
        
    const docRef = await getDoc(doc(db, "tasks", params.id))

    if(!docRef || docRef.data()?.email !== session.user.email){
     throw new Error("Esse tarefa não foi encontrada")
    }
  
    return NextResponse.json({
      id: docRef.id,
      name: docRef.data()?.name,
      projectId: docRef.data()?.projectId,
      today: docRef.data()?.today,
      week: docRef.data()?.week,
      month: docRef.data()?.month,
      year: docRef.data()?.year,
    });

    } catch (error) {
    if(error instanceof Error){
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar ver uma tarefa" },
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