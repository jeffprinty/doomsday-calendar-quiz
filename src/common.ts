import Chance from 'chance';
import { DateTime } from 'luxon';

export const chance = new Chance();

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
    common: 3,
    leap: 4
  },
  {
    month: 'feb',
    monthName: 'February',
    common: 28,
    leap: 29
  },
  {
    month: 'mar',
    monthName: 'March',
    common: 14,
    leap: 14,
    memeticHandle: 'pi day'
  },
  {
    month: 'apr',
    monthName: 'April',
    common: 4,
    leap: 4,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'may',
    monthName: 'May',
    common: 9,
    leap: 9,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'jun',
    monthName: 'June',
    common: 6,
    leap: 6,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'jul',
    monthName: 'July',
    common: 11,
    leap: 11,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'aug',
    monthName: 'August',
    common: 8,
    leap: 8,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'sep',
    monthName: 'September',
    common: 5,
    leap: 5,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'oct',
    monthName: 'October',
    common: 10,
    leap: 10,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'nov',
    monthName: 'November',
    common: 7,
    leap: 7,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'dec',
    monthName: 'December',
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

export const betterDaysTable = () => {
  const startingDay = DateTime.fromISO('2024-12-29');
  const daysArray = [];
  for (let day = 0; day < 360; day++) {
    const dayy = startingDay.plus({ days: day });
    const dayObject = {
      dateTime: dayy
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
