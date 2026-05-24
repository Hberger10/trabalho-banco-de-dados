// components/form_locacao.tsx
"use client";

import { useState } from "react";
import { createLocacao } from "../actions";

// Mock temporário simulando dados do banco loc004
const MOCK_FILMES = [
  { id: "10", titulo: "Cidade Encoberta" },
  { id: "20", titulo: "O Último Verão" },
  { id: "30", titulo: "Rota 09" },
];

const MOCK_FITAS = [
  { id: "101", filmeId: "10", codigo: "FT-00148 (Disponível)" },
  { id: "102", filmeId: "10", codigo: "FT-00149 (Disponível)" },
  { id: "201", filmeId: "20", codigo: "FT-00205 (Disponível)" },
  { id: "301", filmeId: "30", codigo: "FT-00088 (Disponível)" },
];

export default function FormLocacao() {
  const [selectedFilmeId, setSelectedFilmeId] = useState("");

  // Filtra as fitas baseado no filme selecionado
  const fitasFiltradas = MOCK_FITAS.filter(
    (fita) => fita.filmeId === selectedFilmeId
  );

  return (
    <form action={createLocacao}>
      <div className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-2">
        {/* Cliente */}
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-neutral-700">
            Cliente
          </label>
          <select
            name="clienteId"
            required
            className="mt-1 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:outline-none"
          >
            <option value="">Selecione um cliente…</option>
            <option value="1">Henrique Berger</option>
            <option value="2">Gustavo Guidoni (Professor)</option>
          </select>
        </div>

        {/* Filme */}
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
            {MOCK_FILMES.map((filme) => (
              <option key={filme.id} value={filme.id}>
                {filme.titulo}
              </option>
            ))}
          </select>
        </div>

        {/* Fita */}
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
              <option key={fita.id} value={fita.id}>
                {fita.codigo}
              </option>
            ))}
          </select>
        </div>

        {/* Datas */}
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