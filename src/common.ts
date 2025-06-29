import { DateTime } from 'luxon';

import { Mnemonic, mnemonics } from './math/month-doomsdays';
import { getDoomsdayForYear } from './math/year';

export const correctColor = 'bg-green-600';
export const incorrectColor = 'bg-red-900';

export const step0 = 'text-pink-400';
export const step1 = 'text-red-400';
export const step2 = 'text-orange-400';
export const step3 = 'text-yellow-400';
export const step4 = 'text-green-400';
export const step5 = 'text-blue-400';
export const step6 = 'text-indigo-400';
export type Steps = 'stepOne' | 'stepTwo' | 'stepThree' | 'stepFour' | 'stepFive' | 'stepSix';

export type PastAnswer<T> = [number, boolean, T];

export const colors = {
  correctGreen: '#16A34A', // bg-green-600
  incorrectRed: '#991B1B', // bg-red-800
};

export const commonStyles = {
  darkPurple: 'bg-indigo-900',
  year: 'text-yellow-400',
  century: 'text-green-400',
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

export const guessDateFormat = 'MMMM dd, yyyy';
export const fullDateWithWeekdayFormat = 'cccc MMMM dd, yyyy';

export const generateDaysTable = () => {
  const firstDayOfMonth = new Date(2025, 1, 1);
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  const currentDays = [];

  for (let day = 0; day < 360; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const monthNumber = firstDayOfMonth.getMonth();
    const monthNumberForHumans = monthNumber + 1;
    const monthMnemonic = mnemonics[monthNumber];
    const dayIsDoomsday = monthMnemonic.common === firstDayOfMonth.getDay();

    const calendarDay = {
      // currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
      date: new Date(firstDayOfMonth),
      monthNumber,
      monthNumberForHumans,
      number: firstDayOfMonth.getDate(),
      // selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
      year: firstDayOfMonth.getFullYear(),
      dayIsDoomsday,
    };

    currentDays.push(calendarDay);
  }
  return currentDays;
};

export const chunkArray = <T>(arrayToChunk: Array<T>, size: number): Array<Array<T>> =>
  Array.from({ length: Math.ceil(arrayToChunk.length / size) }, (v, index) =>
    arrayToChunk.slice(index * size, index * size + size)
  );

export function pickRandomlyFromArray<T>(array: Array<T>, n: number) {
  // eslint-disable-next-line unicorn/no-new-array
  const result = new Array(n);
  let length_ = array.length;
  // eslint-disable-next-line unicorn/no-new-array
  const taken = new Array(length_);
  if (n > length_) throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    const x = Math.floor(Math.random() * length_);
    result[n] = array[x in taken ? taken[x] : x];
    taken[x] = --length_ in taken ? taken[length_] : length_;
  }
  return result;
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
