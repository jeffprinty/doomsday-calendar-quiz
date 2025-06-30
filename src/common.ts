import { Dayjs } from 'dayjs';

import { dateIsLeapYear, getDayjsDoomsdayForYear, getFirstDateForCalendar } from './math/dates';
import { Mnemonic, mnemonics } from './math/month-doomsdays';

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
  dayJsDay: Dayjs;
  dayNumber: number;
  isDoomsday: boolean;
  month: number;
  weekday: number;
  year: number;
  sameWeekdayAsDoomsday: boolean;
}

export const betterDaysTable = (howManyDays = 360) => {
  const startingYear = 2024;
  const dayJsFirstDate = getFirstDateForCalendar(2024);
  const daysArray = [];
  let doomsdayForYear = getDayjsDoomsdayForYear(startingYear);
  let yearWeIn = startingYear;
  for (let day = 0; day < howManyDays; day++) {
    const dayJsDay = dayJsFirstDate.add(day, 'day');
    const dayYear = dayJsDay.year();

    if (dayYear !== yearWeIn) {
      doomsdayForYear = getDayjsDoomsdayForYear(dayYear);
      yearWeIn = dayYear;
    }
    const dayNumber = dayJsDay.date();
    const month = dayJsDay.month() + 1;
    const weekday = dayJsDay.day();
    const monthMnemonic = mnemonics.find((mne) => mne.monthNumber === month) as Mnemonic;
    const { common, leap } = monthMnemonic;
    let doomsdayDay = common;
    if (dateIsLeapYear(dayJsDay) && leap) {
      doomsdayDay = leap;
    }
    const isDoomsday = doomsdayDay === dayNumber;
    const sameWeekdayAsDoomsday = doomsdayForYear.day() === weekday;

    const dayObject: CalendarDay = {
      dayJsDay,
      month, // NOTE: this is dayjs month, January = 0
      dayNumber,
      weekday,
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
