
"use client";

import { useState } from "react";
import { createLocacao, type Filme, type Fita } from "../actions";

interface Props {
  filmes: Filme[];
  fitas: Fita[];
}

export default function FormLocacao({ filmes, fitas }: Props) {
  const [selectedFilmeId, setSelectedFilmeId] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const fitasFiltradas = fitas.filter(
    (fita) => String(fita.cod_filme) === selectedFilmeId
  );

  

  async function handleAction(formData: FormData) {
    setErro(null);
    const result = await createLocacao(formData);
    if (!result.success) {
      setErro(result.error ?? "Erro desconhecido.");
    }
  }

  return (
    <form action={handleAction}>
      <div className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-2">
        
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-neutral-700">
            Cliente
          </label>
          <input
            type="text"
            name="clienteNome"
            required
            placeholder="Nome do cliente"
            className="mt-1 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:outline-none"
          />
        </div>

        
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-neutral-700">
            Filme
          </label>
          <select
            name="filmeId"
            required
            value={selectedFilmeId}
            onChange={(e) => setSelectedFilmeId(e.target.value)}
            className="mt-1 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:outline-none"
          >
            <option value="">Selecione o filme…</option>
            {filmes.map((filme) => (
              <option key={filme.cod_filme} value={String(filme.cod_filme)}>
                {filme.nom_filme}
              </option>
            ))}
          </select>
        </div>

        
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-neutral-700">
            Fita
          </label>
          <select
            name="fitaId"
            required
            disabled={!selectedFilmeId}
            className="mt-1 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:outline-none disabled:bg-neutral-100 disabled:cursor-not-allowed"
          >
            <option value="">
              {selectedFilmeId
                ? "Selecione uma fita disponível…"
                : "Selecione um filme primeiro…"}
            </option>
            {fitasFiltradas.map((fita) => (
              <option key={fita.cod_fita} value={String(fita.cod_fita)}>
                {fita.cod_fita}
              </option>
            ))}
          </select>
        </div>

        
        <div>
          <label className="block text-xs font-medium text-neutral-700">
            Data de retirada
          </label>
          <input
            type="date"
            name="dataRetirada"
            required
            className="mt-1 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-neutral-700">
            Data de devolução
          </label>
          <input
            type="date"
            name="dataDevolucao"
            required
            className="mt-1 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:outline-none"
          />
        </div>
      </div>

      {erro && (
        <p className="px-6 pb-2 text-sm text-red-600">{erro}</p>
      )}

      <footer className="flex items-center justify-end border-t border-neutral-200 px-6 py-3">
        <button
          type="submit"
          className="inline-flex h-9 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Confirmar locação
        </button>
      </footer>
    </form>
  );
}