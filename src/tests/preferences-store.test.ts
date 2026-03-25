import { describe, it, expect, beforeEach } from 'vitest'
import { usePreferencesStore } from '@/shared/lib/stores/preferences'

describe('usePreferencesStore', () => {
  beforeEach(() => {
    usePreferencesStore.setState({ theme: 'light', defaultView: 'day' })
  })

  it('a le bon état initial', () => {
    const { theme, defaultView } = usePreferencesStore.getState()
    expect(theme).toBe('light')
    expect(defaultView).toBe('day')
  })

  it('change le thème', () => {
    usePreferencesStore.getState().setTheme('dark')
    expect(usePreferencesStore.getState().theme).toBe('dark')
  })

  it('change la vue par défaut', () => {
    usePreferencesStore.getState().setDefaultView('week')
    expect(usePreferencesStore.getState().defaultView).toBe('week')
  })
})
