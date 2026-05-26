"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createFilme, alterarFilme, deleteFilme, type Filme } from "../actions";

interface Props {
  filmes: Filme[];
  filmeParaEditar?: Filme;
}

export default function FormFilme({ filmes: filmesIniciais, filmeParaEditar }: Props) {
  const router = useRouter();
  const modoEdicao = !!filmeParaEditar;

  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [erroDelete, setErroDelete] = useState<string | null>(null);
  const [filmes, setFilmes] = useState<Filme[]>(filmesIniciais);

  async function handleCreate(formData: FormData) {
    setErro(null);
    setSucesso(false);
    const result = await createFilme(formData);
    if (!result.success) {
      setErro(result.error ?? "Erro desconhecido.");
    } else {
      setSucesso(true);
      router.refresh();
    }
  }

  async function handleEdit(formData: FormData) {
    setErro(null);
    setSucesso(false);
    if (!filmeParaEditar) return;
    const result = await alterarFilme(filmeParaEditar.cod_filme, formData);
    if (!result.success) {
      setErro(result.error ?? "Erro desconhecido.");
    } else {
      setSucesso(true);
    }
  }

  async function handleDelete(codFilme: number) {
    setErroDelete(null);
    const result = await deleteFilme(codFilme);
    if (!result.success) {
      setErroDelete(result.error ?? "Erro ao excluir.");
    } else {
      setFilmes((prev) => prev.filter((f) => f.cod_filme !== codFilme));
    }
  }

  return (
    <>
      <form action={modoEdicao ? handleEdit : handleCreate}>
        <div className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-neutral-700">
              Nome do filme
            </label>
            <input
              type="text"
              name="nome"
              required
              defaultValue={filmeParaEditar?.nom_filme ?? ""}
              placeholder="Ex: Matrix"
              className="mt-1 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700">
              Cor
            </label>
            <input
              type="text"
              name="cor"
              required
              defaultValue={filmeParaEditar?.cod_cor ?? ""}
              placeholder="Ex: C"
              className="mt-1 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700">
              Código do gênero
            </label>
            <input
              type="number"
              name="genero"
              required
              min={1}
              defaultValue={filmeParaEditar?.cod_genero ?? ""}
              placeholder="Ex: 1"
              className="mt-1 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:outline-none"
            />
          </div>
        </div>

        {erro && (
          <p className="px-6 pb-2 text-sm text-red-600">{erro}</p>
        )}
        {sucesso && (
          <p className="px-6 pb-2 text-sm text-emerald-600">
            {modoEdicao ? "Filme atualizado com sucesso!" : "Filme cadastrado com sucesso!"}
          </p>
        )}

        <footer className="flex items-center justify-between border-t border-neutral-200 px-6 py-3">
          {modoEdicao ? (
            <Link href="/" className="text-xs font-medium text-neutral-500 hover:underline">
              Cancelar
            </Link>
          ) : (
            <span />
          )}
          <button
            type="submit"
            className="inline-flex h-9 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-white hover:bg-neutral-800"
          >
            {modoEdicao ? "Salvar alterações" : "Cadastrar filme"}
          </button>
        </footer>
      </form>

      {erroDelete && (
        <p className="px-6 py-2 text-sm text-red-600">{erroDelete}</p>
      )}

      <ul className="divide-y divide-neutral-100 max-h-96 overflow-y-auto">
        {filmes.map((filme) => (
          <li
            key={filme.cod_filme}
            className={`flex items-center justify-between gap-3 px-6 py-3 ${
              filmeParaEditar?.cod_filme === filme.cod_filme ? "bg-neutral-50" : ""
            }`}
          >
            <span className="truncate text-sm text-neutral-900">{filme.nom_filme}</span>
            <div className="flex items-center gap-3">
              <Link
                href={`/?edit=${filme.cod_filme}`}
                className="text-xs font-medium text-neutral-700 hover:underline"
              >
                Alterar
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(filme.cod_filme)}
                className="text-xs font-medium text-red-600 hover:underline"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
