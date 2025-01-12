import { DateTime } from 'luxon';
import randomInteger from 'random-int';

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

export type PastAnswer = [number, boolean, DateTime];

export const anchorDays = {
  '18': 5,
  '19': 3,
  '20': 2,
  '21': 0,
};

export const getAnchorDayForCentury = (century: AnchorDayCentury) => {
  return anchorDays[century];
};

export const sharedMemeticHandles = {
  doubles: '4/4, 6/6, 8/8, 10/10, 12/12',
  nineToFive: '9-to-5 at 7-11',
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

export interface Mnemonic {
  memeticHandle?: string;
  month: string;
  monthName: string;
  monthNumber: number;
  common: number;
  leap?: number;
  daysInMonth: 28 | 29 | 30 | 31;
}

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

export const mnemonics: Array<Mnemonic> = [
  {
    month: 'jan',
    monthName: 'January',
    monthNumber: 1,
    common: 3,
    leap: 4,
    daysInMonth: 31,
  },
  {
    month: 'feb',
    monthName: 'February',
    monthNumber: 2,
    common: 28,
    leap: 29,
    daysInMonth: 28,
  },
  {
    month: 'mar',
    monthName: 'March',
    monthNumber: 3,
    common: 14,
    memeticHandle: 'pi day',
    daysInMonth: 31,
  },
  {
    month: 'apr',
    monthName: 'April',
    monthNumber: 4,
    common: 4,
    memeticHandle: sharedMemeticHandles.doubles,
    daysInMonth: 30,
  },
  {
    month: 'may',
    monthName: 'May',
    monthNumber: 5,
    common: 9,
    memeticHandle: sharedMemeticHandles.nineToFive,
    daysInMonth: 31,
  },
  {
    month: 'jun',
    monthName: 'June',
    monthNumber: 6,
    common: 6,
    memeticHandle: sharedMemeticHandles.doubles,
    daysInMonth: 30,
  },
  {
    month: 'jul',
    monthName: 'July',
    monthNumber: 7,
    common: 11,
    memeticHandle: sharedMemeticHandles.nineToFive,
    daysInMonth: 31,
  },
  {
    month: 'aug',
    monthName: 'August',
    monthNumber: 8,
    common: 8,
    memeticHandle: sharedMemeticHandles.doubles,
    daysInMonth: 31,
  },
  {
    month: 'sep',
    monthName: 'September',
    monthNumber: 9,
    common: 5,
    memeticHandle: sharedMemeticHandles.nineToFive,
    daysInMonth: 30,
  },
  {
    month: 'oct',
    monthName: 'October',
    monthNumber: 10,
    common: 10,
    memeticHandle: sharedMemeticHandles.doubles,
    daysInMonth: 31,
  },
  {
    month: 'nov',
    monthName: 'November',
    monthNumber: 11,
    common: 7,
    memeticHandle: sharedMemeticHandles.nineToFive,
    daysInMonth: 30,
  },
  {
    month: 'dec',
    monthName: 'December',
    monthNumber: 12,
    common: 12,
    memeticHandle: sharedMemeticHandles.doubles,
    daysInMonth: 31,
  },
];

export const getRandomMnemonic = (ignoreLeap = false) => {
  if (ignoreLeap) {
    const fixedMonths = mnemonics.filter(
      ({ monthName }) => !['January', 'February'].includes(monthName)
    );
    return fixedMonths[Math.trunc(Math.random() * fixedMonths.length)];
  }
  const randomIndex = Math.trunc(Math.random() * mnemonics.length);
  return mnemonics[randomIndex];
};

export const getRandomDateInMonth = ({ daysInMonth, monthNumber }: Mnemonic) => {
  const randomDay = Math.trunc(Math.random() * daysInMonth);
  console.log('randomDay', randomDay);
  return DateTime.fromObject({
    day: randomDay,
    year: 2025,
    month: monthNumber,
  });
};

// eslint-disable-next-line unicorn/no-array-reduce
export const allDaysFromMnemonics = mnemonics.reduce(
  (allDoomsdays: Array<number>, { common, leap }) => {
    if (!allDoomsdays.includes(common)) {
      allDoomsdays.push(common);
    }
    if (leap && !allDoomsdays.includes(leap)) {
      allDoomsdays.push(leap);
    }
    return allDoomsdays;
  },
  []
);

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
