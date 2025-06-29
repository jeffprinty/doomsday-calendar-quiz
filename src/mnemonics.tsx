import { ReactNode } from 'react';

import { FullMonthName, ShortMonthName } from './common';

export const sharedMemeticHandles = {
  doubles: '4/4, 6/6, 8/8, 10/10, 12/12',
  nineToFive: '9-to-5 at 7-11',
};

export interface Mnemonic {
  common: number;
  daysInMonth: 28 | 29 | 30 | 31;
  leap?: number;
  memeticHandle?: string;
  month: ShortMonthName;
  monthName: FullMonthName;
  monthNumber: number;
  explanation?: ReactNode;
}

export const mnemonics: Array<Mnemonic> = [
  {
    common: 3,
    daysInMonth: 31,
    leap: 4,
    memeticHandle: '1/11',
    month: 'jan',
    monthName: 'January',
    monthNumber: 1,
  },
  {
    common: 28,
    daysInMonth: 28,
    leap: 29,
    memeticHandle: '2/22',
    month: 'feb',
    monthName: 'February',
    monthNumber: 2,
  },
  {
    common: 14,
    daysInMonth: 31,
    memeticHandle: 'pi day',
    month: 'mar',
    monthName: 'March',
    monthNumber: 3,
  },
  {
    common: 4,
    daysInMonth: 30,
    memeticHandle: sharedMemeticHandles.doubles,
    month: 'apr',
    monthName: 'April',
    monthNumber: 4,
  },
  {
    common: 9,
    daysInMonth: 31,
    memeticHandle: sharedMemeticHandles.nineToFive,
    month: 'may',
    monthName: 'May',
    monthNumber: 5,
  },
  {
    common: 6,
    daysInMonth: 30,
    memeticHandle: sharedMemeticHandles.doubles,
    month: 'jun',
    monthName: 'June',
    monthNumber: 6,
  },
  {
    common: 11,
    daysInMonth: 31,
    memeticHandle: sharedMemeticHandles.nineToFive,
    month: 'jul',
    monthName: 'July',
    monthNumber: 7,
  },
  {
    common: 8,
    daysInMonth: 31,
    memeticHandle: sharedMemeticHandles.doubles,
    month: 'aug',
    monthName: 'August',
    monthNumber: 8,
  },
  {
    common: 5,
    daysInMonth: 30,
    memeticHandle: sharedMemeticHandles.nineToFive,
    month: 'sep',
    monthName: 'September',
    monthNumber: 9,
  },
  {
    common: 10,
    daysInMonth: 31,
    memeticHandle: sharedMemeticHandles.doubles,
    month: 'oct',
    monthName: 'October',
    monthNumber: 10,
  },
  {
    common: 7,
    daysInMonth: 30,
    memeticHandle: sharedMemeticHandles.nineToFive,
    month: 'nov',
    monthName: 'November',
    monthNumber: 11,
  },
  {
    common: 12,
    daysInMonth: 31,
    memeticHandle: sharedMemeticHandles.doubles,
    month: 'dec',
    monthName: 'December',
    monthNumber: 12,
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
