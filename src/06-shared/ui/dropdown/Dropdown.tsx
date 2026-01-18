import { type ReactNode, useEffect, useRef } from 'react';

import './dropdown.css';

interface DropdownProps {
  onClick: () => void;
  trigger: ReactNode;
  isOpened: boolean;
  children: ReactNode;
}

export function Dropdown({ onClick, trigger, isOpened, children }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpened) return;

    function handleDocumentClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClick();
      }
    }

    function handleDocumentKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClick();
      }
    }

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleDocumentKey);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleDocumentKey);
    };
  });

  return (
    <div ref={dropdownRef} className="dropdown">
      <div onClick={onClick}>{trigger}</div>
      {isOpened && <div className="dropdown__content">{children}</div>}
    </div>
  );
}
