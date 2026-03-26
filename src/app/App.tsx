import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom'
import { useAuthStore } from '@/features/auth'
import { useUserProfile } from '@/features/profile'
import { AuthPage, DashboardPage, HistoryPage, ProfilePage, SettingsPage } from '@/pages'
import { QueryProvider, ThemeProvider } from './providers'
import { ProfileSetupModal } from './ProfileSetupModal'

function AppRoutes() {
  const { user, loading, initialize } = useAuthStore()
  const { data: profile, isLoading: profileLoading } = useUserProfile()

  useEffect(() => {
    initialize()
  }, [initialize])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Chargement...</p>
        </div>
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

  const showProfileSetup = !profileLoading && !profile

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {showProfileSetup && <ProfileSetupModal />}

      <div className="max-w-lg mx-auto pb-20">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 px-4 py-4">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-wide">KALOULOU</h1>
        </header>

        <main className="px-4 py-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
        <div className="max-w-lg mx-auto flex">
          {[
            { to: '/', label: 'Dashboard' },
            { to: '/history', label: 'Historique' },
            { to: '/settings', label: 'Paramètres' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex-1 py-4 text-xs font-medium text-center transition-colors border-t-2 ${
                  isActive ? 'text-gray-900 dark:text-white border-gray-900 dark:border-white' : 'text-gray-500 dark:text-gray-400 border-transparent'
                }`
              }
            >
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
