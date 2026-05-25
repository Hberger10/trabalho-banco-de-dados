import Link from "next/link";
import FormLocacao from "./components/form_locacao";
import FormFilme from "./components/form_filme";
import FormFita from "./components/form_fita";
import { getFilmes, getFitasDisponiveis, getTodasFitas } from "./actions";



export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  
  const [filmes, fitas, todasFitas] = await Promise.all([
    getFilmes(),
    getFitasDisponiveis(),
    getTodasFitas(),
  ]);

  
  const { edit, editFita } = await searchParams;
  const filmeParaEditar = edit
    ? filmes.find((f) => f.cod_filme === Number(edit))
    : undefined;
  const fitaParaEditar = editFita
    ? todasFitas.find((f) => f.cod_fita === Number(editFita))
    : undefined;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Administração da locadora
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Catálogo de filmes, inventário de fitas e registro de locações.
          </p>
        </header>

        <div className="space-y-6">
          <section className="rounded-lg border border-neutral-900 bg-white shadow-sm">
            <header className="border-b border-neutral-200 px-6 py-4">
              <h2 className="text-base font-semibold tracking-tight"> 
                Realizar locação
              </h2>
              <p className="mt-0.5 text-xs text-neutral-500">
                Selecione cliente e fita disponível para registrar a locação.
              </p>
            </header>
            <FormLocacao filmes={filmes} fitas={fitas} />
          </section>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <section className="rounded-lg border border-neutral-200 bg-white">
              <header className="border-b border-neutral-200 px-6 py-4">
                <h2 className="text-base font-semibold tracking-tight">
                  {filmeParaEditar ? `Editando: ${filmeParaEditar.nom_filme}` : "Filmes"}
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {filmeParaEditar
                    ? "Altere os dados e salve, ou cancele para voltar."
                    : "Cadastre um novo filme no catálogo."}
                </p>
              </header>
              <FormFilme
                filmes={filmes}
                filmeParaEditar={filmeParaEditar}
                key={filmeParaEditar?.cod_filme ?? "new"}
              />
            </section>

            <section className="rounded-lg border border-neutral-200 bg-white">
              <header className="border-b border-neutral-200 px-6 py-4">
                <h2 className="text-base font-semibold tracking-tight">
                  {fitaParaEditar ? `Editando: Fita #${fitaParaEditar.cod_fita}` : "Fitas"}
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {fitaParaEditar
                    ? "Altere a situação e salve, ou cancele para voltar."
                    : "Inclua uma nova fita no inventário."}
                </p>
              </header>
              <FormFita fitaToEdit={fitaParaEditar} key={fitaParaEditar?.cod_fita ?? "new"} />
              <ul className="divide-y divide-neutral-100 max-h-64 overflow-y-auto border-t border-neutral-200">
                {todasFitas.map((fita) => {
                  const tomCls: Record<string, string> = {
                    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
                    blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
                  };
                  const situacao = String(fita.sit_fita).trim() === "1" ? "Disponível" : "Locada";
                  const tom = String(fita.sit_fita).trim() === "1" ? "emerald" : "blue";
                  return (
                    <li
                      key={fita.cod_fita}
                      className="flex items-center justify-between gap-3 px-6 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="font-mono text-sm text-neutral-900">
                          Fita #{fita.cod_fita}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tomCls[tom]}`}
                        >
                          {situacao}
                        </span>
                      </div>
                      <Link
                        href={`/?editFita=${fita.cod_fita}`}
                        className="text-xs font-medium text-neutral-700 hover:underline"
                      >
                        Alterar
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
