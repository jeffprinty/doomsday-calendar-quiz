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
