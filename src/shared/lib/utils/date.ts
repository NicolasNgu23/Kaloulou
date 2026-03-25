import { format, startOfDay, subDays, startOfWeek, endOfWeek } from 'date-fns'
import { fr } from 'date-fns/locale'

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function formatDisplayDate(date: Date): string {
  return format(date, 'EEEE d MMMM', { locale: fr })
}

export function formatDisplayDateShort(date: Date): string {
  return format(date, 'd MMM', { locale: fr })
}

export function getTodayStart(): Date {
  return startOfDay(new Date())
}

export function getLastNDays(n: number): Date[] {
  return Array.from({ length: n }, (_, i) => subDays(new Date(), i)).reverse()
}

export function getCurrentWeekRange(): { from: Date; to: Date } {
  const now = new Date()
  return {
    from: startOfWeek(now, { weekStartsOn: 1 }),
    to: endOfWeek(now, { weekStartsOn: 1 }),
  }
}
