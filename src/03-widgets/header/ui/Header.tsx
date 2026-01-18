import '@/03-widgets/header/ui/header.css';
import logoIcon from 'assets/icons/logo.svg';

import { Logo } from '@/06-shared/ui';
import { ChangeMetrics } from '@/04-features/change-metrics';

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Logo className="header__logo" icon={<img src={logoIcon} alt="Логотип компании" />} />
        <ChangeMetrics />
      </div>
    </header>
  );
}
