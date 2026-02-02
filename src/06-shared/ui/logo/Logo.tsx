import type { ReactNode } from 'react'

export function Logo({
  className,
  icon,
}: Readonly<{
  className: string
  icon: ReactNode
}>) {
  return (
    <a className={className} style={{ display: 'inline-block' }} href="/">
      {icon}
    </a>
  )
}
