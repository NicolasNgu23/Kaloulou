import { Link } from 'react-router-dom'

const features = [
  { icon: <UsersIcon className="h-5 w-5" />, title: 'Gestion des clients', desc: 'Centralisez les profils, objectifs et notes de chaque client.' },
  { icon: <BookIcon className="h-5 w-5" />, title: 'Programmes sur mesure', desc: 'Créez des plans d\'entraînement avec exercices, séries et repos.' },
  { icon: <DumbbellIcon className="h-5 w-5" />, title: 'Bibliothèque d\'exercices', desc: '18+ exercices classés par groupe musculaire et équipement.' },
]

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-20 border-b border-white/[0.06] bg-[#1C1E2E]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F5C93E]">
              <LeafIcon className="h-4 w-4 text-[#1C1E2E]" />
            </div>
            <span className="text-sm font-bold text-white">CoachFlow</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/auth" className="rounded-xl px-4 py-2 text-sm font-medium text-white/55 transition hover:text-white">
              Connexion
            </Link>
            <Link to="/auth?mode=register" className="rounded-xl bg-[#F5C93E] px-4 py-2 text-sm font-semibold text-[#1C1E2E] transition hover:bg-[#F5C93E]/90">
              Commencer
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="pt-14">
        <section className="mx-auto max-w-5xl px-5 py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F5C93E]/20 bg-[#F5C93E]/8 px-3.5 py-1.5 text-xs font-semibold text-[#F5C93E]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5C93E]" />
            SaaS pour coachs fitness
          </div>
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Gérez vos clients,<br />
            <span className="text-[#F5C93E]">libérez votre potentiel</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-white/50 leading-relaxed">
            CoachFlow centralise la gestion de vos clients, la création de programmes et le suivi des exercices.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to="/auth?mode=register" className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1C1E2E] transition hover:bg-white/90 sm:w-auto">
              Créer un compte gratuit
            </Link>
            <Link to="/auth" className="w-full rounded-xl border border-white/[0.10] bg-white/[0.05] px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.08] sm:w-auto">
              Se connecter
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-5xl px-5 pb-24">
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5C93E]/15 text-[#F5C93E]">
                  {f.icon}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA bottom */}
        <section className="border-t border-white/[0.06] py-16 text-center">
          <h2 className="text-2xl font-bold text-white">Prêt à simplifier votre activité ?</h2>
          <p className="mt-3 text-sm text-white/40">Rejoignez les coachs qui font confiance à CoachFlow.</p>
          <Link to="/auth?mode=register" className="mt-6 inline-flex rounded-xl bg-[#F5C93E] px-6 py-3 text-sm font-semibold text-[#1C1E2E] transition hover:bg-[#F5C93E]/90">
            Démarrer maintenant
          </Link>
        </section>
      </main>
    </div>
  )
}

function LeafIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M6 14c0-4.418 3.582-8 8-8 1.419 0 2.752.37 3.909 1.02" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 18.5c1.8-1.333 4.133-2 7-2s5.2.667 7 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
}
function UsersIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.75" /></svg>
}
function BookIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="1.75" /></svg>
}
function DumbbellIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M6 4v16M18 4v16M6 9h12M6 15h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /><rect x="2" y="7" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.75" /><rect x="18" y="7" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.75" /></svg>
}
