import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/services/FirebaseConnection";
import { Task } from "@/shader/entities/tasks";

export async function GET(req: NextRequest, { params }: { params: { id: string } }){
  try{
    const session = await getServerSession();
    
    if (!session || !session.user?.email) throw new Error("Você precisa estar autenticado para acessar esses dados.")
    
    const tasks: Task[] = []
    
    const q = query(collection(db, "tasks"), where("email", "==", session.user?.email), where("projectId", "==", params.id));

    await getDocs(q).then((querySnapshot)=> {
      querySnapshot.forEach((doc) => {        
        tasks.push({
          id: doc.id,
          name: doc.data().name,
          projectId: doc.data().projectId,
          month: doc.data().month,
          year: doc.data().year,
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
      { message: "Houve um erro ao tentar ver todas as tarefas do projeto" },
      { status: 500 }
    );
  }
}
