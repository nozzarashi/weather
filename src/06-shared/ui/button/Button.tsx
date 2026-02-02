import type { ReactNode } from 'react'

import './button.css'

export function Button({
  className,
  text,
  type = 'submit',
  beforeIcon,
  afterIcon,
  onclick,
}: Readonly<{
  text: string
  className?: string
  type?: 'submit' | 'reset' | 'button'
  beforeIcon?: ReactNode
  afterIcon?: ReactNode
  onclick?: () => void
}>) {
  return (
    <button type={type} onClick={onclick} className={`button ${className}`}>
      {beforeIcon}
      <span>{text}</span>
      {afterIcon}
    </button>
  )
}
