
"use server";

import { query } from "@/lib/db";


export interface Filme {
  cod_filme: number;
  nom_filme: string;
  cod_cor: string;
  cod_genero: number;
}

export interface Fita {
  cod_fita: number;
  cod_filme: number;
  sit_fita: string;
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

export async function getFitasDisponiveis(): Promise<Fita[]> {
  try {
    const res = await query(
  "SELECT cod_fita, cod_filme, sit_fita FROM fita WHERE sit_fita = '1' ORDER BY cod_fita ASC"
);
    return res.rows;
  } catch (error) {
    console.error("Erro ao buscar fitas do banco:", error);
    return [];
  }
}

export async function getTodasFitas(): Promise<Fita[]> {
  try {
    const res = await query(
      "SELECT cod_fita, cod_filme, sit_fita FROM fita ORDER BY cod_fita ASC"
    );
    return res.rows;
  } catch (error) {
    console.error("Erro ao buscar fitas do banco:", error);
    return [];
  }
}


export async function createLocacao(formData: FormData) {
  
  const clienteNome = formData.get("clienteNome") as string;
  const fitaId = formData.get("fitaId") as string;
  const dataRetirada = formData.get("dataRetirada") as string;
  const dataDevolucao = formData.get("dataDevolucao") as string;

  if (!clienteNome || !fitaId || !dataRetirada || !dataDevolucao) {
    console.error("❌ Erro: Todos os campos são obrigatórios.");
    return { success: false, error: "Todos os campos são obrigatórios." };
  }

  try {
    const clienteRes = await query(
      "SELECT cod_cliente FROM cliente WHERE nom_cliente ILIKE $1 LIMIT 1",
      [clienteNome]
    );

    if (clienteRes.rows.length === 0) {
      console.error("❌ Erro: Cliente não encontrado.");
      return { success: false, error: "Cliente não encontrado." };
    }

    const clienteId = clienteRes.rows[0].cod_cliente;

    const sqlInsertLocacao = `
      INSERT INTO locacao (dat_locacao, cod_fita, cod_cliente, dat_devolucao, vlr_multa)
      VALUES ($1, $2, $3, $4, $5)
    `;

    await query(sqlInsertLocacao, [
      dataRetirada,
      parseInt(fitaId, 10),
      clienteId,
      dataDevolucao,
      0,
    ]);

    
    const sqlUpdateFita = `
      UPDATE fita 
      SET sit_fita = '2'
      WHERE cod_fita = $1
    `;
    
    await query(sqlUpdateFita, [parseInt(fitaId, 10)]);

    console.log("✅ Locação inserida e fita atualizada com sucesso!");
    return { success: true }; // 4. Retorna sucesso

  } catch (error) {
    console.error("❌ Erro ao criar locação:", error);
    return { success: false, error: "Erro ao criar locação." };
  }
}