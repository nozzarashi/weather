import logoIcon from 'assets/icons/logo.svg';

import { Logo } from '@/06-shared/ui';
import { ChangeMetrics } from '@/04-features/change-metrics';
import styles from './header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo icon={<img src={logoIcon} alt="Логотип компании" />} />
        <ChangeMetrics />
      </div>
    </header>
  );
}
