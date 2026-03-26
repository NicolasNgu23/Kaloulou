import { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom'
import { useAuthStore, useAuthUser, useAuthLoading } from '@/features/auth'
import { QueryProvider, ThemeProvider } from './providers'
import { ProfileSetupModal } from './ProfileSetupModal'
import { ErrorBoundary, PageSkeleton } from '@/shared/ui'
import { LandingPage } from '@/pages/landing'
import { AuthPage } from '@/pages/auth'
import { DashboardPage } from '@/pages/dashboard'
import { ClientsPage } from '@/pages/clients'
import { ClientDetailPage } from '@/pages/clients-detail'
import { ProgramsPage } from '@/pages/programs'
import { ProgramDetailPage } from '@/pages/programs-detail'
import { ExercisesPage } from '@/pages/exercises'
import { ProfilePage } from '@/pages/profile'

const NAV_ITEMS = [
  { to: '/', end: true, label: 'Dashboard', icon: GridIcon },
  { to: '/clients', end: false, label: 'Clients', icon: UsersIcon },
  { to: '/programs', end: false, label: 'Programmes', icon: BookIcon },
  { to: '/exercises', end: false, label: 'Exercices', icon: DumbbellIcon },
  { to: '/profile', end: false, label: 'Profil', icon: UserIcon },
]

function AppRoutes() {
  const user = useAuthUser()
  const loading = useAuthLoading()
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => { initialize() }, [initialize])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white/80" />
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-[72px] flex-col items-center border-r border-white/5 bg-[#131525] py-5">
        {/* Logo */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5C93E]">
          <LeafIcon className="h-5 w-5 text-[#1C1E2E]" />
        </div>

        {/* Nav */}
        <nav className="mt-8 flex flex-1 flex-col items-center gap-2">
          {NAV_ITEMS.map(({ to, end, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={label}
              className={({ isActive }) =>
                `flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-[#1C1E2E] shadow-lg'
                    : 'text-white/40 hover:bg-white/8 hover:text-white/80'
                }`
              }
            >
              <Icon className="h-5 w-5" />
            </NavLink>
          ))}
        </nav>

        {/* User */}
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/8 text-xs font-bold text-white/60">
          <UserIcon className="h-4 w-4" />
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col pl-[72px]">
        <ErrorBoundary>
          <Suspense>
            <ProfileSetupModal />
          </Suspense>
        </ErrorBoundary>

        <main className="flex-1 p-6 lg:p-8">
          <ErrorBoundary>
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/clients/:id" element={<ClientDetailPage />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/programs/:id" element={<ProgramDetailPage />} />
                <Route path="/exercises" element={<ExercisesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-30 flex border-t border-white/5 bg-[#131525] md:hidden">
        {NAV_ITEMS.map(({ to, end, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-3 text-[9px] font-medium transition-colors ${
                isActive ? 'text-[#F5C93E]' : 'text-white/35 hover:text-white/70'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </QueryProvider>
  )
}

function LeafIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 14c0-4.418 3.582-8 8-8 1.419 0 2.752.37 3.909 1.02" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18.5c1.8-1.333 4.133-2 7-2s5.2.667 7 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
function GridIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}
function UsersIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}
function BookIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}
function DumbbellIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 4v16M18 4v16M6 9h12M6 15h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <rect x="2" y="7" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.75" />
      <rect x="18" y="7" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}
function UserIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}
