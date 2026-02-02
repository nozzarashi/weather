import type { ReactNode } from 'react'
import './dropdownGroup.css'

export function DropdownGroup({
  children,
  title,
}: Readonly<{
  children: ReactNode
  title: string
}>) {
  return (
    <div className="dropdown__group">
      <span className="dropdown__group__title">{title}</span>
      <div className="dropdown__group-items">{children}</div>
    </div>
  )
}
