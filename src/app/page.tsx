import FormLocacao from "./components/form_locacao";
import { getFilmes, getFitasDisponiveis, getTodasFitas } from "./actions";

const [filmes, fitas, todasFitas] = await Promise.all([getFilmes(), getFitasDisponiveis(), getTodasFitas()]);

export default function AdminPage() {
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
              <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
                <h2 className="text-base font-semibold tracking-tight">Filmes</h2>
                <button type="button" className="inline-flex h-8 items-center gap-1 rounded-md border border-neutral-300 bg-white px-3 text-xs font-medium text-neutral-700 hover:bg-neutral-50">
                  <span className="text-sm leading-none">+</span> Incluir
                </button>
              </header>
              <ul className="divide-y divide-neutral-100 max-h-96 overflow-y-auto">
                {filmes.map((filme) => (
                  <li key={filme.cod_filme} className="flex items-center justify-between gap-3 px-6 py-3">
                    <span className="truncate text-sm text-neutral-900">{filme.nom_filme}</span>
                    <div className="flex items-center gap-3">
                      <button type="button" className="text-xs font-medium text-neutral-700 hover:underline">Alterar</button>
                      <button type="button" className="text-xs font-medium text-red-600 hover:underline">Excluir</button>
                    </div>
                  </li>
                ))}
</ul>
            </section>

            
            <section className="rounded-lg border border-neutral-200 bg-white">
              <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
                <h2 className="text-base font-semibold tracking-tight">Fitas</h2>
                <button type="button" className="inline-flex h-8 items-center gap-1 rounded-md border border-neutral-300 bg-white px-3 text-xs font-medium text-neutral-700 hover:bg-neutral-50">
                  <span className="text-sm leading-none">+</span> Incluir
                </button>
              </header>
              <ul className="divide-y divide-neutral-100 max-h-96 overflow-y-auto">
                {todasFitas.map((fita) => {
                  const tomCls: Record<string, string> = {
                    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
                    blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
                    amber: "bg-amber-50 text-amber-800 ring-amber-600/20",
                    red: "bg-red-50 text-red-700 ring-red-600/20",
                  };
                  const situacao = fita.sit_fita === "1" ? "Disponível" : "Locada";
                  const tom = fita.sit_fita === "1" ? "emerald" : "blue";
                  return (
                    <li key={fita.cod_fita} className="flex items-center justify-between gap-3 px-6 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="font-mono text-sm text-neutral-900">Fita #{fita.cod_fita}</span>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tomCls[tom]}`}>
                          {situacao}
                        </span>
                      </div>
                      <button type="button" className="text-xs font-medium text-neutral-700 hover:underline">Alterar situação</button>
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