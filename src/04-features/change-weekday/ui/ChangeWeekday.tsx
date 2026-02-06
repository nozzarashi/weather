import { Button, Dropdown, DropdownItem } from '@/06-shared/ui';
import { useWeekdayStore, type Weekday } from '../model/weekday-store';
import dropdownIcon from 'assets/icons/icon-dropdown.svg';

import './change-weekday.css';
import { useMemo, useState } from 'react';
import { useWeatherForecast } from '@/04-features/search-city';
import { format } from 'date-fns';

export function ChangeWeekday() {
  const weekday = useWeekdayStore((state) => state.weekday);
  const setWeekday = useWeekdayStore((state) => state.setWeekday);
  const { data: forecast } = useWeatherForecast();

  const weekdays: Set<Weekday> = useMemo(() => {
    if (!forecast?.hourly?.time) return new Set<Weekday>();

    return new Set(forecast?.hourly.time.map((el: string) => format(new Date(el), 'EEEE') as Weekday));
  }, [forecast]);

  const [isOpened, setIsOpened] = useState(false);

  return (
    <Dropdown
      onOpenChange={setIsOpened}
      isOpened={isOpened}
      trigger={<Button text={weekday} afterIcon={<img src={dropdownIcon} />} />}
    >
      {Array.from(weekdays).map((day) => (
        <DropdownItem
          key={day}
          selected={weekday === day}
          onClick={() => {
            setWeekday(day);
            setIsOpened(!isOpened);
          }}
          text={day}
        />
      ))}
    </Dropdown>
  );
}
