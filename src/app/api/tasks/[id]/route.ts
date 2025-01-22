import { db } from "@/services/FirebaseConnection";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
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

    const docRef = await getDoc(doc(db, "tasks", params.id));

    if (!docRef) throw new Error("Esse tarefa não foi encontrada");

    if (docRef.data()?.email !== session.user.email)
      throw new Error("Esse tarefa não pertence a vocẽ");

    return NextResponse.json({
      id: docRef.id,
      name: docRef.data()?.name,
      projectId: docRef.data()?.projectId,
      month: docRef.data()?.month,
      year: docRef.data()?.year,
      goal: docRef.data()?.goal,
      deadline: docRef.data()?.deadline,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar ver uma tarefa" },
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

    await deleteDoc(doc(db, "tasks", params.id));

    return NextResponse.json({ id: params.id });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar deletar uma tarefa" },
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

    const { name, goal, deadline } = await req.json();

    await updateDoc(doc(db, "tasks", params.id), {
      ...(name && { name }),
      ...(goal && { goal: Number.parseInt(goal) }),
      ...(deadline && { deadline }),
    });

    return NextResponse.json({
      id: params.id,
      ...(name && { name }),
      ...(goal && { goal: Number.parseInt(goal) }),
      ...(deadline && { deadline }),
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Houve um erro ao tentar atualizar a tarefa" },
      { status: 500 }
    );
  }
}
