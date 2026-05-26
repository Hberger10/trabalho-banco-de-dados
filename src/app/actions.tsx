
"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";


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
      INSERT INTO locacao (dat_locacao, cod_fita, cod_cliente, dat_prevista_devolucao, val_locacao)
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
    return { success: true }; 

  } catch (error) {
    console.error("❌ Erro ao criar locação:", error);
    return { success: false, error: "Erro ao criar locação." };
  }
}

export async function createFilme(formData: FormData) {
  const nome = formData.get("nome") as string;
  const cor = formData.get("cor") as string;
  const genero = formData.get("genero") as string;

    if (!nome || !cor || !genero) {
    console.error("❌ Erro: Todos os campos são obrigatórios.");
    return { success: false, error: "Todos os campos são obrigatórios." };
  }

    try {
    const sqlInsertFilme = `
      INSERT INTO filme (nom_filme, cod_cor, cod_genero)
      VALUES ($1, $2, $3)
    `;
    await query(sqlInsertFilme, [nome, cor, parseInt(genero, 10)]);
    console.log("✅ Filme inserido com sucesso!");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao criar filme:", error);
    return { success: false, error: "Erro ao criar filme." };
  }
}
export async function deleteFilme(cod_filme: number) {
    try {
    const sqlDeleteFilme = `
      DELETE FROM filme WHERE cod_filme = $1
    `;
    await query(sqlDeleteFilme, [cod_filme]);
    console.log("✅ Filme excluído com sucesso!");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao excluir filme:", error);
    return { success: false, error: "Erro ao excluir filme." };
  }
}
export async function alterarFilme(cod_filme: number, formData: FormData) {
  const nome = formData.get("nome") as string;
  const cor = formData.get("cor") as string;
  const genero = formData.get("genero") as string;

    if (!nome || !cor || !genero) {
      console.error("❌ Erro: Todos os campos são obrigatórios.");
      return { success: false, error: "Todos os campos são obrigatórios." };
    }

    try {
      const sqlUpdateFilme = `
        UPDATE filme
        SET nom_filme = $1, cod_cor = $2, cod_genero = $3
        WHERE cod_filme = $4
      `;
      await query(sqlUpdateFilme, [nome, cor, parseInt(genero, 10), cod_filme]);
      console.log("✅ Filme atualizado com sucesso!");
      revalidatePath("/");
      return { success: true };
    } catch (error) {
      console.error("❌ Erro ao atualizar filme:", error);
      return { success: false, error: "Erro ao atualizar filme." };
    }
  }

  export async function createFita(formData: FormData) {
  const cod_filme = formData.get("cod_filme") as string;
  const sit_fita = formData.get("sit_fita") as string;

  if (!cod_filme || !sit_fita) {
    console.error("❌ Erro: Filme e situação são obrigatórios.");
    return { success: false, error: "Filme e situação são obrigatórios." };
  }

  try {
    
    const sqlInsertFita = `
      INSERT INTO fita (cod_filme, sit_fita, dat_aquisicao)
      VALUES ($1, $2, CURRENT_DATE)
    `;
    await query(sqlInsertFita, [parseInt(cod_filme, 10), sit_fita]);
    console.log("✅ Fita incluída com sucesso!");
    
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao criar fita:", error);
    return { success: false, error: "Erro ao criar fita." };
  }
}

export async function alterarSituacaoFita(cod_fita: number, formData: FormData) {
  const sit_fita = formData.get("sit_fita") as string;

  if (!sit_fita) {
    console.error("❌ Erro: A situação da fita é obrigatória.");
    return { success: false, error: "A situação da fita é obrigatória." };
  }

  try {
    const sqlUpdateFita = `
      UPDATE fita
      SET sit_fita = $1
      WHERE cod_fita = $2
    `;
    await query(sqlUpdateFita, [sit_fita, cod_fita]);
    console.log("✅ Situação da fita atualizada com sucesso!");
    
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao atualizar fita:", error);
    return { success: false, error: "Erro ao atualizar fita." };
  }
}