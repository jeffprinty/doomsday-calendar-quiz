import { DateTime } from 'luxon';

import { Mnemonic, mnemonics } from './math/month-doomsdays';
import { getDoomsdayForYear } from './math/year';

export const correctColor = 'bg-green-600';
export const incorrectColor = 'bg-red-900';

export type Steps = 'stepOne' | 'stepTwo' | 'stepThree' | 'stepFour' | 'stepFive' | 'stepSix';

export type PastAnswer<T> = [number, boolean, T];

export const timeoutMs = 1500;

export const colors = {
  correctGreen: '#16A34A', // bg-green-600
  incorrectRed: '#991B1B', // bg-red-800
};

export const commonStyles = {
  darkPurple: 'bg-indigo-900',
  year: 'text-yellow-400',
  century: 'text-green-400',
  step0: 'text-pink-400',
  step1: 'text-red-400',
  step2: 'text-orange-400',
  step3: 'text-yellow-400',
  step4: 'text-green-400',
  step5: 'text-blue-400',
  step6: 'text-indigo-400',
};

export const getRandom = (range: number) => Math.trunc(Math.random() * range);

export interface CalendarDay {
  cellNumber: number;
  date: DateTime;
  dayNumber: number;
  isDoomsday: boolean;
  month: number;
  weekday: number;
  year: number;
  sameWeekdayAsDoomsday: boolean;
}

export const betterDaysTable = (howManyDays = 360) => {
  const startingYear = 2024;
  // locale weeks: https://moment.github.io/luxon/#/intl?id=locale-based-weeks
  const firstDayToDisplay = DateTime.local(startingYear, 1, 1, { locale: 'en-US' }).startOf(
    'week',
    { useLocaleWeeks: true }
  );
  const daysArray = [];
  let doomsdayForYear = getDoomsdayForYear(startingYear);
  let yearWeIn = startingYear;
  for (let day = 0; day < howManyDays; day++) {
    const dayy = firstDayToDisplay.plus({ days: day });
    const dayYear = dayy.get('year');
    if (dayYear !== yearWeIn) {
      doomsdayForYear = getDoomsdayForYear(dayYear);
      yearWeIn = dayYear;
    }
    const dayNumber = dayy.get('day');
    const month = dayy.get('month');
    const weekday = dayy.get('weekday');
    const monthMnemonic = mnemonics.find((mne) => mne.monthNumber === month) as Mnemonic;
    const { common, leap } = monthMnemonic;
    let doomsdayDay = common;
    if (dayy.isInLeapYear && leap) {
      doomsdayDay = leap;
    }
    const isDoomsday = doomsdayDay === dayNumber;
    const sameWeekdayAsDoomsday = doomsdayForYear.get('weekday') === weekday;
    // console.log('weekday', weekday, dayy.toFormat('ccc'));
    const dayObject: CalendarDay = {
      date: dayy,
      month,
      dayNumber,
      weekday, // NOTE: this is luxon weekday, sunday = 1
      cellNumber: day,
      year: dayYear,
      isDoomsday,
      sameWeekdayAsDoomsday,
    };
    daysArray.push(dayObject);
  }
  return daysArray;
};

export const allSevens = Array.from({ length: 14 }, (x, index) => (index + 1) * 7);
