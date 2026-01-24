import { Button, Dropdown, DropdownItem } from '@/06-shared/ui';
import { useWeekdayStore, type Weekday } from '../model/weekday-store';
import dropdownIcon from 'assets/icons/icon-dropdown.svg';

import './change-weekday.css';
import { useMemo, useState } from 'react';
import { useGetWeatherForecast } from '@/04-features/search-city';

export function ChangeWeekday() {
  const weekday = useWeekdayStore((state) => state.weekday);
  const setWeekday = useWeekdayStore((state) => state.setWeekday);
  const { data } = useGetWeatherForecast();

  const weekdays: Set<Weekday> = useMemo(() => {
    if (!data?.hourly?.time) return new Set<Weekday>();

    const formatterByWeek = Intl.DateTimeFormat('en-US', { weekday: 'long' });
    return new Set(data?.hourly.time.map((el: string) => formatterByWeek.format(new Date(el)) as Weekday));
  }, [data]);

  const [isOpened, setIsOpened] = useState(false);

  return (
    <Dropdown
      isOpened={isOpened}
      onClick={() => {
        setIsOpened(!isOpened);
      }}
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
