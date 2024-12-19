import Chance from 'chance';
import { DateTime } from 'luxon';

export const chance = new Chance();

export const correctColor = 'bg-green-600';
export const incorrectColor = 'bg-red-900';

export const stepZero = 'text-pink-400';
export const stepOne = 'text-red-400';
export const stepTwo = 'text-orange-400';
export const stepThree = 'text-yellow-400';
export const stepFour = 'text-green-400';
export const stepFive = 'text-blue-400';
export const stepSix = 'text-indigo-400';
export type Steps = 'stepOne' | 'stepTwo' | 'stepThree' | 'stepFour' | 'stepFive';

export type AnchorDayCentury = '18' | '19' | '20' | '21';

export const anchorDays = {
  '18': 5,
  '19': 3,
  '20': 2,
  '21': 0
};

export const getAnchorDayForCentury = (century: AnchorDayCentury) => {
  return anchorDays[century];
};

export const sharedMemeticHandles = {
  doubles: '4/4, 6/6, 8/8, 10/10, 12/12',
  nineToFive: '9-to-5 at 7-11'
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
  'December'
];

export const dayAbbreviations = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export type Day = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
export const daysOfWeek: Array<Day> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export const mnemonics = [
  {
    month: 'jan',
    monthName: 'January',
    monthNumber: 1,
    common: 3,
    leap: 4
  },
  {
    month: 'feb',
    monthName: 'February',
    monthNumber: 2,
    common: 28,
    leap: 29
  },
  {
    month: 'mar',
    monthName: 'March',
    monthNumber: 3,
    common: 14,
    leap: 14,
    memeticHandle: 'pi day'
  },
  {
    month: 'apr',
    monthName: 'April',
    monthNumber: 4,
    common: 4,
    leap: 4,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'may',
    monthName: 'May',
    monthNumber: 5,
    common: 9,
    leap: 9,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'jun',
    monthName: 'June',
    monthNumber: 6,
    common: 6,
    leap: 6,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'jul',
    monthName: 'July',
    monthNumber: 7,
    common: 11,
    leap: 11,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'aug',
    monthName: 'August',
    monthNumber: 8,
    common: 8,
    leap: 8,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'sep',
    monthName: 'September',
    monthNumber: 9,
    common: 5,
    leap: 5,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'oct',
    monthName: 'October',
    monthNumber: 10,
    common: 10,
    leap: 10,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'nov',
    monthName: 'November',
    monthNumber: 11,
    common: 7,
    leap: 7,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'dec',
    monthName: 'December',
    monthNumber: 12,
    common: 12,
    leap: 12,
    memeticHandle: sharedMemeticHandles.doubles
  }
];

export const guessDateFormat = 'MMMM dd, yyyy';

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
      dayIsDoomsday
    };

    currentDays.push(calendarDay);
  }
  return currentDays;
};

export const betterDaysTable = (howManyDays = 360) => {
  const startingDay = DateTime.fromISO('2024-12-29');
  const daysArray = [];
  for (let day = 0; day < howManyDays; day++) {
    const dayy = startingDay.plus({ days: day });
    const dayObject = {
      date: dayy,
      month: dayy.get('month'),
      dayNumber: dayy.get('day'),
      cellNumber: day
    };
    daysArray.push(dayObject);
  }
  return daysArray;
};

export const chunkArray = <T>(arrayToChunk: Array<T>, size: number): Array<Array<T>> =>
  Array.from({ length: Math.ceil(arrayToChunk.length / size) }, (v, index) =>
    arrayToChunk.slice(index * size, index * size + size)
  );

export const getRandomDateInYear = (year: number) => {
  const randomDayOfYear = chance.integer({ min: 1, max: 365 });
  return DateTime.fromObject({
    year,
    ordinal: randomDayOfYear
  });
};
