import type { ReactNode } from 'react';
import styles from './dropdown-group.module.css';

interface DropdownGroupProps {
  children: ReactNode;
  title: string;
}

export function DropdownGroup({ children, title }: DropdownGroupProps) {
  return (
    <div className={styles.group}>
      <span className={styles.groupTitle}>{title}</span>
      <div className={styles.groupItems}>{children}</div>
    </div>
  );
}
