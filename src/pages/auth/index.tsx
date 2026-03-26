import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LoginForm } from '@/features/auth/ui/LoginForm'
import { RegisterForm } from '@/features/auth/ui/RegisterForm'

const highlights = [
  'Gérez tous vos clients dans un seul endroit',
  'Créez des programmes d\'entraînement personnalisés',
  'Bibliothèque d\'exercices classés par muscle',
]

export function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login'
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)

  useEffect(() => {
    setMode(searchParams.get('mode') === 'register' ? 'register' : 'login')
  }, [searchParams])

  const updateMode = (nextMode: 'login' | 'register') => {
    setMode(nextMode)
    setSearchParams(nextMode === 'register' ? { mode: 'register' } : {})
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-[1320px] lg:grid-cols-[1fr_480px]">
        {/* Left panel */}
        <section className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div className="relative">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5C93E]">
                <LeafIcon className="h-5 w-5 text-[#1C1E2E]" />
              </div>
              <span className="text-lg font-bold text-white">CoachFlow</span>
            </div>

            <div className="mt-14 max-w-md space-y-4">
              <span className="inline-block rounded-full border border-[#F5C93E]/25 bg-[#F5C93E]/10 px-3 py-1 text-xs font-semibold text-[#F5C93E]">
                SaaS pour coachs fitness
              </span>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white">
                Gérez vos clients et programmes en toute simplicité.
              </h1>
              <p className="text-base leading-7 text-white/45">
                CoachFlow centralise tout ce dont vous avez besoin pour développer votre activité de coaching.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <StatTile value="∞" label="programmes" />
              <StatTile value="18+" label="exercices" />
              <StatTile value="100%" label="sur mesure" />
            </div>
          </div>

          <div className="relative space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30">Inclus dans CoachFlow</p>
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.04] px-4 py-3.5">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#F5C93E]/15">
                  <CheckIcon className="h-3.5 w-3.5 text-[#F5C93E]" />
                </div>
                <p className="text-sm text-white/65">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Right panel */}
        <section className="flex items-center justify-center border-l border-white/[0.06] bg-[#161829] px-4 py-10 md:px-8">
          <div className="w-full max-w-sm">
            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-2.5 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F5C93E]">
                <LeafIcon className="h-4 w-4 text-[#1C1E2E]" />
              </div>
              <span className="text-sm font-bold text-white">CoachFlow</span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">
                {mode === 'login' ? 'Bon retour' : 'Créer un compte'}
              </h2>
              <p className="mt-1.5 text-sm text-white/45">
                {mode === 'login'
                  ? 'Connectez-vous pour accéder à votre espace.'
                  : 'Rejoignez CoachFlow et démarrez votre activité.'}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="mb-6 grid grid-cols-2 gap-1 rounded-xl border border-white/[0.06] bg-white/[0.04] p-1">
              {(['login', 'register'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => updateMode(m)}
                  className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition duration-150 ${
                    mode === m ? 'bg-white text-[#1C1E2E] shadow-sm' : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  {m === 'login' ? 'Connexion' : 'Inscription'}
                </button>
              ))}
            </div>

            {mode === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </section>
      </div>
    </div>
  )
}

function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-3">
      <p className="text-lg font-bold text-white">{value}</p>
      <p className="mt-0.5 text-xs text-white/35">{label}</p>
    </div>
  )
}

function LeafIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M6 14c0-4.418 3.582-8 8-8 1.419 0 2.752.37 3.909 1.02" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M5 18.5c1.8-1.333 4.133-2 7-2s5.2.667 7 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
}
function CheckIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
