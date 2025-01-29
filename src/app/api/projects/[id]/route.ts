import { db } from "@/services/FirebaseConnection";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email)
      throw new Error(
        "Você precisa estar autenticado para acessar esses dados."
      );

    const docRef = await getDoc(doc(db, "projects", params.id));

    if (!docRef.exists()) throw new Error("Esse projeto não foi encontrado");

    if (docRef.data()?.email !== session.user.email)
      throw new Error("Esse projeto não pertence a você");

    return NextResponse.json({
      id: docRef.id,
      name: docRef.data()?.name,
      projectId: docRef.data()?.projectId,
      month: docRef.data()?.month,
      year: docRef.data()?.year,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email)
      throw new Error(
        "Você precisa estar autenticado para acessar esses dados."
      );

    await deleteDoc(doc(db, "projects", params.id)).then(async () => {
      const q = query(
        collection(db, "tasks"),
        where("projectId", "==", params.id)
      );
      await getDocs(q).then((querySnapshot) => {
        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(doc(db, "tasks", docSnapshot.id));
        });
      });
    });

    return NextResponse.json({ id: params.id });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar deletar um projeto" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email)
      throw new Error(
        "Você precisa estar autenticado para acessar esses dados."
      );

    const { name } = await req.json();

    if (!name) throw new Error("Necessario enviar o nome do projeto");

    await updateDoc(doc(db, "projects", params.id), {
      name,
    });

    return NextResponse.json({ id: params.id, name: name });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar atualizar o nome do projeto" },
      { status: 500 }
    );
  }
}
