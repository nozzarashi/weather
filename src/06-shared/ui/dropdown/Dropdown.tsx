import { type ReactNode, type SetStateAction, useRef, useState } from 'react'

import './dropdown.css'

export function Dropdown({
  isOpened,
  onOpenChange,
  trigger,
  children,
}: Readonly<{
  children: ReactNode
  trigger: ReactNode
  onOpenChange?: (set: SetStateAction<boolean>) => void
  isOpened?: boolean
}>) {
  const [internalIsOpened, setInternalIsOpened] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isControlled = isOpened !== undefined
  const actualOpenedState = isControlled ? isOpened : internalIsOpened

  const handleClose = () => {
    if (isControlled) onOpenChange?.(false)
    else setInternalIsOpened(false)
  }

  const handleToggle = () => {
    if (isControlled) onOpenChange?.(!isOpened)
    else setInternalIsOpened(!internalIsOpened)
  }

  return (
    <div
      onKeyDown={(event) => {
        if (event.key === 'Escape') handleClose()
      }}
      tabIndex={0}
      onBlur={(event) => {
        if (!dropdownRef.current?.contains(event.relatedTarget)) handleClose()
      }}
      ref={dropdownRef}
      className="dropdown"
    >
      <div onClick={handleToggle}>{trigger}</div>
      {actualOpenedState && <div className="dropdown__content">{children}</div>}
    </div>
  )
}
