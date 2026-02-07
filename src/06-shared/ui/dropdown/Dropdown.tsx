import { type ReactNode, useRef, useState } from 'react';
import styles from './dropdown.module.css';

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  isOpened?: boolean;
  onOpenChange?: (set: React.SetStateAction<boolean>) => void;
}

export function Dropdown({ isOpened, onOpenChange, trigger, children }: DropdownProps) {
  const [internalIsOpened, setInternalIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isControlled = isOpened !== undefined;
  const actualOpenedState = isControlled ? isOpened : internalIsOpened;

  const handleClose = () => {
    if (isControlled) onOpenChange?.(false);
    else setInternalIsOpened(false);
  };

  const handleToggle = () => {
    if (isControlled) onOpenChange?.(!isOpened);
    else setInternalIsOpened(!internalIsOpened);
  };

  return (
    <div
      onKeyDown={(event) => {
        if (event.key === 'Escape') handleClose();
      }}
      tabIndex={0}
      onBlur={(event) => {
        if (!dropdownRef.current?.contains(event.relatedTarget)) handleClose();
      }}
      ref={dropdownRef}
      className={styles.dropdown}
    >
      <div onClick={handleToggle}>{trigger}</div>
      {actualOpenedState && <div className={styles.content}>{children}</div>}
    </div>
  );
}
