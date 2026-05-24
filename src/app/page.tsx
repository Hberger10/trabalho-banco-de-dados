

import FormLocacao from "./components/form_locacao";
import { getFilmes } from "./actions";

const filmes = await getFilmes();
console.log("Filmes do banco:", filmes);

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

            
            <FormLocacao />

          </section>

         
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
           
            <section className="rounded-lg border border-neutral-200 bg-white">
              <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
                <h2 className="text-base font-semibold tracking-tight">Filmes</h2>
                <button type="button" className="inline-flex h-8 items-center gap-1 rounded-md border border-neutral-300 bg-white px-3 text-xs font-medium text-neutral-700 hover:bg-neutral-50">
                  <span className="text-sm leading-none">+</span> Incluir
                </button>
              </header>
              <ul className="divide-y divide-neutral-100">
                {["Cidade Encoberta", "O Último Verão", "Rota 09", "Caminhos Cruzados", "Pequenos Heróis"].map((titulo) => (
                  <li key={titulo} className="flex items-center justify-between gap-3 px-6 py-3">
                    <span className="truncate text-sm text-neutral-900">{titulo}</span>
                    <div className="flex items-center gap-3">
                      <button type="button" className="text-xs font-medium text-neutral-700 hover:underline">Alterar</button>
                      <button type="button" className="text-xs font-medium text-red-600 hover:underline">Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* CARD 3 · FITAS */}
            <section className="rounded-lg border border-neutral-200 bg-white">
              <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
                <h2 className="text-base font-semibold tracking-tight">Fitas</h2>
                <button type="button" className="inline-flex h-8 items-center gap-1 rounded-md border border-neutral-300 bg-white px-3 text-xs font-medium text-neutral-700 hover:bg-neutral-50">
                  <span className="text-sm leading-none">+</span> Incluir
                </button>
              </header>
              <ul className="divide-y divide-neutral-100">
                {[
                  { codigo: "FT-00148", situacao: "Disponível", tom: "emerald" },
                  { codigo: "FT-00149", situacao: "Locada", tom: "blue" },
                  { codigo: "FT-00207", situacao: "Manutenção", tom: "amber" },
                  { codigo: "FT-00088", situacao: "Danificada", tom: "red" },
                  { codigo: "FT-00312", situacao: "Disponível", tom: "emerald" },
                ].map((fita) => {
                  const tomCls: Record<string, string> = {
                    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
                    blue: "bg-blue-50 text-blue-700 ring-blue-600/20",
                    amber: "bg-amber-50 text-amber-800 ring-amber-600/20",
                    red: "bg-red-50 text-red-700 ring-red-600/20",
                  };
                  return (
                    <li key={fita.codigo} className="flex items-center justify-between gap-3 px-6 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="font-mono text-sm text-neutral-900">{fita.codigo}</span>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${tomCls[fita.tom]}`}>
                          {fita.situacao}
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