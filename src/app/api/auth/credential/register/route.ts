import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { adminDb } from "@/services/FirebaseAdminConnections";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (session) throw new Error("Você já está logado");

    const { name, email, password } = await req.json();

    if (!name) throw new Error("Necessario enviar seu nome");

    if (!email) throw new Error("Necessario enviar seu email");

    if (email.split("").indexOf("@") === -1)
      throw new Error("Necessario enviar um email valido");

    if (!password) throw new Error("Necessario enviar sua senha");

    const usersRef = adminDb.collection("users");

    const isEmailUsed = await await usersRef.where("email", "==", email).get();

    console.log(!isEmailUsed.empty);

    if (!isEmailUsed.empty) {
      throw new Error("Houve um erro ao criar sua conta");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      email,
      passwordHash: hashedPassword,
      name,
      createdAt: new Date(),
      subscription: "free",
      emailVerified: null,
      image: null,
    };

    const userId = usersRef.doc();

    await userId.set(user).catch(() => {
      throw new Error("Houve um erro ao criar sua conta");
    });

    return NextResponse.json({
      id: userId.id,
      email: user.email,
      name: user.name,
      image: user.image,
      subscription: user.subscription,
      createdAt: user.createdAt,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "Houve um erro ao criar sua conta" },
      { status: 500 }
    );
  }
}
