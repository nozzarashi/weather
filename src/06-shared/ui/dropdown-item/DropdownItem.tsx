import type { ReactNode, MouseEvent } from 'react';
import './dropdownItem.css';

interface DropdownItemProps {
  text: string | number;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  icon?: ReactNode;
  selected?: boolean;
}

export function DropdownItem({ selected, text, icon, onClick }: DropdownItemProps) {
  return (
    <div onClick={onClick} className={`dropdown-item ${selected ? 'dropdown-item--selected' : ''}`}>
      <span className="dropdown-item__text">{text}</span>
      {selected && icon}
    </div>
  );
}
