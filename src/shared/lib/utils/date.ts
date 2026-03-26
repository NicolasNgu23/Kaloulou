const DAYS_FR = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
const MONTHS_FR = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']
const MONTHS_SHORT_FR = ['jan', 'fev', 'mar', 'avr', 'mai', 'juin', 'juil', 'aout', 'sep', 'oct', 'nov', 'dec']

export function formatDate(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function formatDisplayDate(date: Date): string {
  return `${DAYS_FR[date.getDay()]} ${date.getDate()} ${MONTHS_FR[date.getMonth()]}`
}

export function formatDisplayDateShort(date: Date): string {
  return `${date.getDate()} ${MONTHS_SHORT_FR[date.getMonth()]}`
}

export function getTodayStart(): Date {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export function getLastNDays(n: number): Date[] {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (n - 1 - i))
    d.setHours(0, 0, 0, 0)
    return d
  })
}

export function getCurrentWeekRange(): { from: Date; to: Date } {
  const now = new Date()
  const day = now.getDay()
  const diffToMonday = day === 0 ? -6 : 1 - day
  const from = new Date(now)
  from.setDate(now.getDate() + diffToMonday)
  from.setHours(0, 0, 0, 0)
  const to = new Date(from)
  to.setDate(from.getDate() + 6)
  to.setHours(23, 59, 59, 999)
  return { from, to }
}
