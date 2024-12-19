import { db } from '@/services/FirebaseConnection';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server'

type TasksProps = {
  id: string;
  name: string;
  projectId: string;
  today: string;
  week: string;
  month: string;
}

export async function GET(req: NextRequest){
  try{
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      throw new Error("Você precisa estar autenticado para acessar esses dados.")
    }
    
    const tasks: TasksProps[] = []
    
    const q = query(collection(db, "tasks"), where("email", "==", session.user?.email));

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

export async function POST(req: NextRequest){
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      throw new Error("Você precisa estar autenticado para acessar esses dados.")
    }

    const { projectId, name } = await req.json() as Partial<TasksProps>

    if(!name){
      throw new Error("Necessario enviar o nome do tarefa")
    }
    if(!projectId){
      throw new Error("Necessario selecionar o projeto")
    }
    
    const docRef = await addDoc(collection(db, "tasks"), {
      email: session.user.email,
      name: name,
      projectId,
      today: 0,
      week:[0,0,0,0,0,0,0],
      month:[0,0,0,0],
    })
  return NextResponse.json({ 
     id:docRef.id,
     name: name ,projectId,
     today: 0,
     week:[0,0,0,0,0,0,0],
     month:[0,0,0,0],
    })
  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar criar uma nova tarefa" },
      { status: 500 }
    );
  }
}