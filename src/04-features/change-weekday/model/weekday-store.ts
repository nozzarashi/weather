import { create } from 'zustand';

export type Weekday = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

interface WeekdayStore {
  weekday: Weekday;
  setWeekday: (currentDay: Weekday) => void;
}

export const useWeekdayStore = create<WeekdayStore>((set) => {
  return {
    weekday: 'Monday',
    setWeekday: (currentDay: Weekday) => set({ weekday: currentDay }),
  };
});
