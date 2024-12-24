import { Project } from '@/shader/entities/projects';

import { db } from '@/services/FirebaseConnection';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest){
  try{
    const session = await getServerSession();
    
    if (!session || !session.user?.email) throw new Error("Você precisa estar autenticado para acessar esses dados.")
    
    const projects: Project[] = []
    
    const q = query(collection(db, "projects"), where("email", "==", session.user?.email));

    await getDocs(q).then((querySnapshot)=> {
      querySnapshot.forEach((doc) => {        
        projects.push({
          id: doc.id,
          name: doc.data().name,
          month: doc.data().month,
          year: doc.data().year
        })
      });
    })
    
    const response = NextResponse.json(projects);
  
    return response;
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar ver todos os projetos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest){
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) throw new Error("Você precisa estar autenticado para acessar esses dados.")

    const { name } = await req.json();

    if(!name) throw new Error("Necessario enviar o nome do projeto")
    
    const docRef = await addDoc(collection(db, "projects"), {
      email: session.user.email,
      name: name,
      month: Array.from({length: 31}, () => 0),
      year: Array.from({length: 12}, () => 0),
    })

  return NextResponse.json({ id:docRef.id, name: name })
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar criar um novo projeto" },
      { status: 500 }
    );
  }
}