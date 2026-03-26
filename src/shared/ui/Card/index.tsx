import { type HTMLAttributes, type ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> { children: ReactNode }

export function Card({ children, className = '', ...props }: Readonly<CardProps>) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.07] bg-white/[0.05] backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }: Readonly<{ children: ReactNode; className?: string }>) {
  return <div className={`px-5 py-4 ${className}`}>{children}</div>
}

export function CardBody({ children, className = '' }: Readonly<{ children: ReactNode; className?: string }>) {
  return <div className={`px-5 pb-5 ${className}`}>{children}</div>
}
