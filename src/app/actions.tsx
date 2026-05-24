
"use server";

import { query } from "@/lib/db";


export interface Filme {
  id_filme: number;
  titulo: string;
  genero: string;
  ano_lancamento: number;
}

export async function getFilmes(): Promise<Filme[]> {
  try {
    
    const res = await query("SELECT * FROM filme ORDER BY nom_filme ASC");
    return res.rows;
  } catch (error) {
    console.error("Erro ao buscar filmes do banco:", error);
    return [];
  }
}


export async function createLocacao(formData: FormData) {
  const clienteId = formData.get("clienteId");
  const fitaId = formData.get("fitaId");
  const dataRetirada = formData.get("dataRetirada");
  const dataDevolucao = formData.get("dataDevolucao");

  console.log("Inserindo no banco:", { clienteId, fitaId, dataRetirada, dataDevolucao });
}