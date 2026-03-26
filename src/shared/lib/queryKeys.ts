export const queryKeys = {
  coachProfile: (id: string) => ['coachProfile', id] as const,
  clients: (coachId: string) => ['clients', coachId] as const,
  client: (id: string) => ['client', id] as const,
  clientPrograms: (clientId: string) => ['clientPrograms', clientId] as const,
  programs: (coachId: string) => ['programs', coachId] as const,
  program: (id: string) => ['program', id] as const,
  exercises: ['exercises'] as const,
  favoriteIds: (coachId: string) => ['favoriteIds', coachId] as const,
}
