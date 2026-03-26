import { describe, it, expect, beforeEach } from 'vitest'
import { usePreferencesStore } from '@/shared/lib/stores/preferences'

describe('usePreferencesStore', () => {
  beforeEach(() => {
    usePreferencesStore.setState({ theme: 'light' })
  })

  it('a le bon état initial', () => {
    const { theme } = usePreferencesStore.getState()
    expect(theme).toBe('light')
  })

  it('change le thème en dark', () => {
    usePreferencesStore.getState().setTheme('dark')
    expect(usePreferencesStore.getState().theme).toBe('dark')
  })

  it('change le thème en light', () => {
    usePreferencesStore.getState().setTheme('dark')
    usePreferencesStore.getState().setTheme('light')
    expect(usePreferencesStore.getState().theme).toBe('light')
  })
})
