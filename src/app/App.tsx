import { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom'
import { useAuthStore, useAuthUser, useAuthLoading } from '@/features/auth'
import { AuthPage, DashboardPage, HistoryPage, ProfilePage } from '@/pages'
import { QueryProvider, ThemeProvider } from './providers'
import { ProfileSetupModal } from './ProfileSetupModal'
import { ErrorBoundary, PageSkeleton } from '@/shared/ui'

function AppRoutes() {
  const user = useAuthUser()
  const loading = useAuthLoading()
  const initialize = useAuthStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="*" element={<AuthPage />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ErrorBoundary>
        <Suspense>
          <ProfileSetupModal />
        </Suspense>
      </ErrorBoundary>

      <div className="max-w-lg mx-auto pb-20">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <h1 className="text-lg font-bold text-primary-700 dark:text-primary-400">🥗 Kaloulou</h1>
        </header>

        <main className="px-4 py-6">
          <ErrorBoundary>
            <Suspense fallback={<PageSkeleton />}>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-lg mx-auto flex">
          {[
            { to: '/', label: 'Dashboard', icon: '🏠' },
            { to: '/history', label: 'Historique', icon: '📊' },
            { to: '/profile', label: 'Profil', icon: '👤' },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex-1 flex flex-col items-center py-3 text-xs transition-colors ${
                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'
                }`
              }
            >
              <span className="text-xl mb-1">{icon}</span>
              {label}
            </NavLink>
          ))}
        </div>
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
