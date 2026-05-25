"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createFita, alterarSituacaoFita, type Fita } from "../actions";

interface Props {
  fitaToEdit?: Fita;
}

export default function FormFita({ fitaToEdit }: Props) {
  const modoEdicao = !!fitaToEdit;
  const router = useRouter();
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState(false);

  async function handleSubmit(formData: FormData) {
    setErro(null);
    setSucesso(false);
    const result = modoEdicao && fitaToEdit
      ? await alterarSituacaoFita(fitaToEdit.cod_fita, formData)
      : await createFita(formData);

    if (!result.success) {
      setErro(result.error ?? "Erro desconhecido.");
    } else {
      setSucesso(true);
      router.push("/");
      router.refresh();
    }
  }

  return (
    <form action={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-neutral-700">
            Código do Filme
          </label>
          <input
            type="number"
            name="cod_filme"
            required={!modoEdicao}
            disabled={modoEdicao}
            defaultValue={fitaToEdit?.cod_filme ?? ""}
            placeholder="Ex: 1"
            className="mt-1 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:outline-none disabled:bg-neutral-100 disabled:text-neutral-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-neutral-700">
            Situação
          </label>
          <select
            name="sit_fita"
            required
            defaultValue={fitaToEdit?.sit_fita ?? "1"}
            className="mt-1 flex h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:outline-none"
          >
            <option value="1">Disponível</option>
            <option value="2">Locada</option>
          </select>
        </div>
      </div>

      {erro && <p className="px-6 pb-2 text-sm text-red-600">{erro}</p>}
      {sucesso && (
        <p className="px-6 pb-2 text-sm text-emerald-600">
          {modoEdicao ? "Situação atualizada com sucesso!" : "Fita incluída com sucesso!"}
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
          {modoEdicao ? "Salvar alterações" : "Incluir fita"}
        </button>
      </footer>
    </form>
  );
}
