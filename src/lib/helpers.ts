import { cookies } from "next/headers";
import { NextRequest } from "next/server";

/**
 * Funcao para buscar dados em uma API e lidar com cookies,
 *
 * @returns Uma promessa com os dados retornados pela API.
 *  Se houver um erro, retorna null.
 */
export async function getServerData<T>(
  url: string,
  options: RequestInit & { next?: { revalidate?: number } } = {}
): Promise<T | null> {
  const cStore = cookies();
  const cookees = cStore.getAll();
  const req = new NextRequest(url);

  cookees.forEach((cookie) => {
    req.cookies.set(cookie.name, cookie.value);
  });

  return fetch(req, options)
    .then((res) => {
      return res.json() as Promise<T>;
    })
    .catch((error) => {
      console.error(`Erro ao buscar os dados ${url}:`, error);
      return null;
    });
}
