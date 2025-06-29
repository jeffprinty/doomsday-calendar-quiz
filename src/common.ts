import { DateTime } from 'luxon';
import randomInteger from 'random-int';

import { Mnemonic, mnemonics } from './mnemonics';

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

export type AnchorDayCentury = '18' | '19' | '20' | '21';

export type PastAnswer<T> = [number, boolean, T];

export const anchorDays = {
  '18': 5,
  '19': 3,
  '20': 2,
  '21': 0,
};

export const getAnchorDay = (century?: number) => {
  if (century === 19) {
    return 3;
  }
  if (century === 20) {
    return 2;
  }
};

export const colors = {
  correctGreen: '#16A34A', // bg-green-600
  incorrectRed: '#991B1B', // bg-red-800
};

export const commonStyles = {
  darkPurple: 'bg-indigo-900',
};

export const getAnchorDayForCentury = (century: AnchorDayCentury) => {
  return anchorDays[century];
};

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export type FullMonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type ShortMonthName =
  | 'jan'
  | 'feb'
  | 'mar'
  | 'apr'
  | 'may'
  | 'jun'
  | 'jul'
  | 'aug'
  | 'sep'
  | 'oct'
  | 'nov'
  | 'dec';

export const getRandomMonthName = (ignoreLeap = false) => {
  if (ignoreLeap) {
    const fixedMonths = monthNames.filter(
      (monthName) => !['January', 'February'].includes(monthName)
    );
    return fixedMonths[Math.random() * fixedMonths.length];
  }
  return monthNames[Math.random() * monthNames.length];
};

export type Day = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
export const daysOfWeek: Array<Day> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

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

export const getRandomYear = () => randomInteger(1900, 2099);

export const getRandomDateInYear = (year: number) => {
  const randomDayOfYear = randomInteger(1, 365);
  return DateTime.fromObject({
    year,
    ordinal: randomDayOfYear,
  });
};

export const getDoomsdayForYear = (year: number) =>
  DateTime.fromObject({
    year,
    month: 4,
    day: 4,
  });

export const getDoomsdayForYearV2 = (year?: number) => {
  if (!year) {
    return;
  }
  return DateTime.fromObject({
    year,
    month: 4,
    day: 4,
  }).toFormat('ccc');
};

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

export const doomsyearTable = [
  [2000, 0],
  [2001, 1],
  [2002, 2],
  [2003, 3],
  [2004, 5],
  [2005, 6],
  [2006, 0],
  [2007, 1],
  [2008, 3],
  [2009, 4],
  [2010, 5],
  [2011, 6],
  [2012, 1],
  [2013, 2],
  [2014, 3],
  [2015, 4],
  [2016, 6],
  [2017, 0],
  [2018, 1],
  [2019, 2],
  [2020, 4],
  [2021, 5],
  [2022, 6],
  [2023, 0],
  [2024, 2],
  [2025, 3],
  [2026, 4],
  [2027, 5],
  [2028, 0],
  [2029, 1],
  [2030, 2],
  [2031, 3],
  [2032, 5],
  [2033, 6],
  [2034, 0],
  [2035, 1],
  [2036, 3],
  [2037, 4],
  [2038, 5],
  [2039, 6],
  [2040, 1],
  [2041, 2],
  [2042, 3],
  [2043, 4],
  [2044, 6],
  [2045, 0],
  [2046, 1],
  [2047, 2],
  [2048, 4],
  [2049, 5],
  [2050, 6],
  [2051, 0],
  [2052, 2],
  [2053, 3],
  [2054, 4],
  [2055, 5],
  [2056, 0],
  [2057, 1],
  [2058, 2],
  [2059, 3],
  [2060, 5],
  [2061, 6],
  [2062, 0],
  [2063, 1],
  [2064, 3],
  [2065, 4],
  [2066, 5],
  [2067, 6],
  [2068, 1],
  [2069, 2],
  [2070, 3],
  [2071, 4],
  [2072, 6],
  [2073, 0],
  [2074, 1],
  [2075, 2],
  [2076, 4],
  [2077, 5],
  [2078, 6],
  [2079, 0],
  [2080, 2],
  [2081, 3],
  [2082, 4],
  [2083, 5],
  [2084, 0],
  [2085, 1],
  [2086, 2],
  [2087, 3],
  [2088, 5],
  [2089, 6],
  [2090, 0],
  [2091, 1],
  [2092, 3],
  [2093, 4],
  [2094, 5],
  [2095, 6],
  [2096, 1],
  [2097, 2],
  [2098, 3],
  [2099, 4],
];
