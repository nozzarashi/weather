import type { ReactNode, MouseEvent } from 'react'
import './dropdownItem.css'

export function DropdownItem({
  selected,
  text,
  icon,
  onClick,
}: Readonly<{
  text: string | number
  onClick: (event: MouseEvent<HTMLDivElement>) => void
  icon?: ReactNode
  selected?: boolean
}>) {
  return (
    <div onClick={onClick} className={`dropdown-item ${selected ? 'dropdown-item--selected' : ''}`}>
      <span className="dropdown-item__text">{text}</span>
      {selected && icon}
    </div>
  )
}
