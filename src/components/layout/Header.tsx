"use client"
import Image from "next/image";
import Clock from "../ui/Clock";
import { Button } from "../ui/Button";
import {  signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/shadcn/dropdown-menu";
import Link from "next/link";

export const Header = () => {
  const { data: session} = useSession()

  return (
    <header className="p-2 sm:p-6 flex justify-between">
      <div className="relative w-48 sm:w-60 h-11">
        <Link href="/">
          <Image
            src="/MindTaskerLight.svg"
            alt="Logo do MindTasker"
            priority
            fill
          />
        </Link>
      </div>
      <div className="flex gap-4 sm:gap-12 items-center justify-center">
        <Clock />
        {!session ? (
          <Button type="link" href="/login">
            Login
          </Button>
        ) : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <div className="relative w-12 h-12">
                    <Image
                      src={session?.user?.image ?? ""}
                      alt="Sua imagem"
                      priority
                      fill
                      className="rounded-full"
                    />
                  </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button onClick={()=> signOut()} >Sair da Conta</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </header>
  );
};
