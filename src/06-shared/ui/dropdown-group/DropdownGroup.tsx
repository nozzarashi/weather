import type { ReactNode } from 'react';
import './dropdownGroup.css';

interface DropdownGroupProps {
  children: ReactNode;
  title: string;
}

export function DropdownGroup({ children, title }: DropdownGroupProps) {
  return (
    <div className="dropdown__group">
      <span className="dropdown__group__title">{title}</span>
      <div className="dropdown__group-items">{children}</div>
    </div>
  );
}
