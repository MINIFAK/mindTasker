
import { db } from '@/services/FirebaseConnection';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }){
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) throw new Error("Você precisa estar autenticado para acessar esses dados.")
    
    await deleteDoc(doc(db, "projects", params.id))

    return NextResponse.json({ id: params.id })
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar deletar um projeto" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }){
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) throw new Error("Você precisa estar autenticado para acessar esses dados.")
    
    const { name } = await req.json();

    if(!name) throw new Error("Necessario enviar o nome do projeto")
    
    await updateDoc(doc(db, "projects", params.id), {
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
      { message: "Houve um erro ao tentar atualizar o nome do projeto" },
      { status: 500 }
    );
  }
}