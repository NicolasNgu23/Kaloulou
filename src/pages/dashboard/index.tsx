import { Link } from 'react-router-dom'
import { useClients } from '@/features/client'
import { usePrograms } from '@/features/program'
import { useCoachProfile } from '@/features/coach'
import { CLIENT_GOALS } from '@/entities/client'
import { DIFFICULTY_LABELS } from '@/entities/program'

const diffColor: Record<string, string> = {
  beginner:     'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  intermediate: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  advanced:     'text-red-400 bg-red-500/10 border-red-500/20',
}

export function DashboardPage() {
  const { data: profile } = useCoachProfile()
  const { data: clients = [] } = useClients()
  const { data: programs = [] } = usePrograms()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir'
  const firstName = profile?.first_name ?? 'Coach'

  const goalLabel = (goal?: string) => CLIENT_GOALS.find((g) => g.value === goal)?.label ?? 'Général'
  const recentClients = clients.slice(0, 5)
  const recentPrograms = programs.slice(0, 4)

  return (
    <div className="space-y-7 pb-8">
      {/* Hero header */}
      <section className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-medium text-white/45">{greeting},</p>
          <h1 className="mt-1 text-4xl font-bold tracking-tight text-white lg:text-5xl">
            {firstName} <span className="text-white/30">!</span>
          </h1>
          <p className="mt-2 text-sm text-white/45">Voici un aperçu de votre activité.</p>
        </div>

        <div className="flex items-center gap-3">
          <StatPill label="Clients" value={clients.length} />
          <StatPill label="Programmes" value={programs.length} accent />
          <Link
            to="/clients"
            className="flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#1C1E2E] transition hover:bg-white/90"
          >
            <PlusIcon className="h-4 w-4" />
            Nouveau client
          </Link>
        </div>
      </section>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total clients"
          value={clients.length}
          sub={profile?.plan === 'pro' ? 'illimités' : `sur 3 max`}
          icon={<UsersIcon className="h-5 w-5" />}
          color="text-[#F5C93E] bg-[#F5C93E]/10"
        />
        <StatCard
          label="Programmes"
          value={programs.length}
          sub="créés"
          icon={<BookIcon className="h-5 w-5" />}
          color="text-emerald-400 bg-emerald-500/10"
        />
        <StatCard
          label="Plan"
          value={profile?.plan === 'pro' ? 'Pro' : 'Free'}
          sub={profile?.plan === 'pro' ? 'illimité' : '3 clients max'}
          icon={<StarIcon className="h-5 w-5" />}
          color="text-violet-400 bg-violet-500/10"
        />
        <StatCard
          label="Exercices"
          value="18+"
          sub="disponibles"
          icon={<DumbbellIcon className="h-5 w-5" />}
          color="text-blue-400 bg-blue-500/10"
        />
      </div>

      {/* Content grid */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Recent clients */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Derniers ajouts</p>
              <h2 className="mt-0.5 text-sm font-semibold text-white">Clients récents</h2>
            </div>
            <Link to="/clients" className="flex items-center gap-1 text-xs font-medium text-[#F5C93E] transition hover:text-[#F5C93E]/80">
              Voir tout
              <ChevronRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="border-t border-white/[0.05]">
            {recentClients.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-white/35">Aucun client pour l'instant.</p>
                <Link to="/clients" className="mt-2 inline-block text-xs font-medium text-[#F5C93E]">
                  Ajouter un client →
                </Link>
              </div>
            ) : (
              <ul>
                {recentClients.map((client, i) => (
                  <li key={client.id} className={i < recentClients.length - 1 ? 'border-b border-white/[0.04]' : ''}>
                    <Link
                      to={`/clients/${client.id}`}
                      className="flex items-center gap-3 px-5 py-3.5 transition hover:bg-white/[0.03]"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#F5C93E]/15 text-xs font-bold text-[#F5C93E]">
                        {client.first_name[0]}{client.last_name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{client.first_name} {client.last_name}</p>
                        <p className="text-xs text-white/40">{goalLabel(client.goal)}</p>
                      </div>
                      <ChevronRightIcon className="h-4 w-4 flex-shrink-0 text-white/20" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent programs */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">Bibliothèque</p>
              <h2 className="mt-0.5 text-sm font-semibold text-white">Programmes récents</h2>
            </div>
            <Link to="/programs" className="flex items-center gap-1 text-xs font-medium text-[#F5C93E] transition hover:text-[#F5C93E]/80">
              Voir tout
              <ChevronRightIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="border-t border-white/[0.05]">
            {recentPrograms.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-white/35">Aucun programme pour l'instant.</p>
                <Link to="/programs" className="mt-2 inline-block text-xs font-medium text-[#F5C93E]">
                  Créer un programme →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 p-4">
                {recentPrograms.map((prog) => (
                  <Link
                    key={prog.id}
                    to={`/programs/${prog.id}`}
                    className="group rounded-xl border border-white/[0.07] bg-white/[0.04] p-3.5 transition hover:bg-white/[0.07]"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15">
                      <BookIcon className="h-4 w-4 text-emerald-400" />
                    </div>
                    <p className="mt-2.5 truncate text-xs font-semibold text-white">{prog.name}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className={`rounded-full border px-1.5 py-0.5 text-[10px] font-medium ${diffColor[prog.difficulty] ?? 'text-white/40 bg-white/5 border-white/10'}`}>
                        {DIFFICULTY_LABELS[prog.difficulty]}
                      </span>
                      <span className="text-[10px] text-white/35">{prog.duration_weeks}sem</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatPill({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`flex flex-col items-center rounded-xl px-4 py-2.5 ${accent ? 'bg-[#F5C93E]/15' : 'bg-white/[0.06]'}`}>
      <span className={`text-xl font-bold ${accent ? 'text-[#F5C93E]' : 'text-white'}`}>{value}</span>
      <span className="text-[10px] text-white/40">{label}</span>
    </div>
  )
}

function StatCard({ label, value, sub, icon, color }: {
  label: string; value: string | number; sub: string; icon: React.ReactNode; color: string
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4 backdrop-blur-sm">
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>{icon}</div>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-white/60">{label}</p>
      <p className="mt-0.5 text-[10px] text-white/30">{sub}</p>
    </div>
  )
}

function PlusIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
}
function ChevronRightIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function UsersIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.75" /></svg>
}
function BookIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="1.75" /></svg>
}
function StarIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function DumbbellIcon({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M6 4v16M18 4v16M6 9h12M6 15h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /><rect x="2" y="7" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.75" /><rect x="18" y="7" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.75" /></svg>
}
