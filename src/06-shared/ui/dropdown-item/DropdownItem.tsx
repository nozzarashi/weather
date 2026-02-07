import type { ReactNode, MouseEvent } from 'react';
import styles from './dropdown-item.module.css';

interface DropdownItemProps {
  text: string | number;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  icon?: ReactNode;
  selected?: boolean;
}

export function DropdownItem({ selected, text, icon, onClick }: DropdownItemProps) {
  return (
    <div onClick={onClick} className={`${styles.item} ${selected ? `${styles.itemSelected}` : ''}`}>
      <span>{text}</span>
      {selected && icon}
    </div>
  );
}
