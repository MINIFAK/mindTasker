import { db } from '@/services/FirebaseConnection'
import { collection, getDocs, updateDoc } from 'firebase/firestore'
import { NextResponse } from 'next/server'

export async function GET(request: Request){
  try{

    if(new Date().getDay() !== 1) throw new Error("Não pode ser executado")
    const projects = await getDocs(collection(db, "projects"))

    projects.forEach(async(doc) => {
      await updateDoc(doc.ref, {
        month: Array.from({length: 31}, () => 0),
        ...(new Date().getMonth() === 0 ? { year: Array.from({length: 12}, () => 0) } : {}),
      })
    })

    const tasks = await getDocs(collection(db, "tasks"))

    tasks.forEach(async(doc) => {
      await updateDoc(doc.ref, {
        month: Array.from({length: 31}, () => 0),   
        ...(new Date().getMonth() === 0 ? { year: Array.from({length: 12}, () => 0) } : {}),
      })
    })

    NextResponse.json({ message: "Projeto resetado com sucesso" })
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