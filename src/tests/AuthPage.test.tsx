import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthPage } from '@/pages/auth'

describe('AuthPage', () => {
  it('affiche le formulaire de connexion par défaut', () => {
    render(<AuthPage />)
    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument()
  })

  it('bascule vers le formulaire d\'inscription au clic', async () => {
    const user = userEvent.setup()
    render(<AuthPage />)

    await user.click(screen.getByRole('button', { name: /inscription/i }))

    expect(screen.getByRole('button', { name: /créer mon compte/i })).toBeInTheDocument()
  })

  it('revient au formulaire de connexion après avoir cliqué sur Connexion', async () => {
    const user = userEvent.setup()
    render(<AuthPage />)

    await user.click(screen.getByRole('button', { name: /inscription/i }))
    await user.click(screen.getByRole('button', { name: /connexion/i }))

    expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument()
  })
})
