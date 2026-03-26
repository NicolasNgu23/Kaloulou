import { useState } from 'react'
import { LoginForm } from '@/features/auth/ui/LoginForm'
import { RegisterForm } from '@/features/auth/ui/RegisterForm'

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-wide">KALOULOU</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm uppercase tracking-wider">Votre compagnon sportif</p>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-8">
          <div className="flex bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-700 p-1 mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                mode === 'login'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                mode === 'register'
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
              }`}
            >
              Inscription
            </button>
          </div>

          {mode === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  )
}
