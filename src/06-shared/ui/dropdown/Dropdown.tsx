import { type ReactNode, useRef } from 'react';

import './dropdown.css';

interface DropdownProps {
  onToggle: () => void;
  onClose: () => void;
  trigger: ReactNode;
  isOpened: boolean;
  children: ReactNode;
}

export function Dropdown({ onToggle, onClose, trigger, isOpened, children }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose();
      }}
      tabIndex={0}
      onBlur={(event) => {
        if (!dropdownRef.current?.contains(event.relatedTarget)) onClose();
      }}
      ref={dropdownRef}
      className="dropdown"
    >
      <div onClick={onToggle}>{trigger}</div>
      {isOpened && <div className="dropdown__content">{children}</div>}
    </div>
  );
}
