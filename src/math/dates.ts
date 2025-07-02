import dayjs, { Dayjs } from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import duration from 'dayjs/plugin/duration';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import objectSupport from 'dayjs/plugin/objectSupport';
import timezone from 'dayjs/plugin/timezone';

import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/en-gb';

import randomInteger from 'random-int';

import { getMnemonicForMonth, Mnemonic } from './month-doomsdays';
import { monthNames } from './months';
import { Weekday } from './weekdays';

dayjs.extend(objectSupport);
dayjs.extend(isLeapYear);
dayjs.extend(timezone);
dayjs.extend(isoWeek);
dayjs.extend(dayOfYear);
dayjs.extend(duration);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);

dayjs.tz.guess();

export const formatFullDateWithWeekday = (date: Dayjs) => date.format('dddd LL');

export const getFirstDateForCalendar = (year: number) => {
  return dayjs({ year, month: 0, date: 1 }).startOf('week');
};

export const getDateFromMonthMnemonic = (monthMnemonic: Mnemonic, year: number): Dayjs => {
  const { common, leap, monthNumber } = monthMnemonic;
  const commonDate = dayjs(`${year}-${monthNumber}-${common}`);
  if ([1, 2].includes(monthNumber) && commonDate.isLeapYear()) {
    return dayjs(`${year}-${monthNumber}-${leap}`);
  }
  return commonDate;
};

export const dateIsLeapYear = (date: Dayjs) => date.isLeapYear();

export const getFullWeekday = (date: Dayjs) => dayjs(date).format('dddd');
export const getWeekdayForDate = (date: Dayjs): Weekday => dayjs(date).format('ddd') as Weekday;

export const getDoomsdayForYear = (year: number): Dayjs => dayjs({ year, month: 3, date: 4 });
export const getDoomsdayWeekdayForYear = (year: number): Weekday =>
  getWeekdayForDate(getDoomsdayForYear(year));
export const getDoomsdayFullWeekdayForYear = (year: number) =>
  getFullWeekday(getDoomsdayForYear(year));

export const getRandomDateInYear = (year: number) => {
  const randomDayOfYear = randomInteger(1, 365);
  return dayjs(`${year}-01-01`).dayOfYear(randomDayOfYear);
};

export const getDoomsdayWithinMonth = (date: Dayjs, common: number, leap?: number) =>
  dayjs({
    year: date.year(),
    month: date.month() + 1,
    date: leap || common,
  });

export const getRandomDateInModernity = () => {
  const randomYear = randomInteger(1900, 2099);
  return getRandomDateInYear(randomYear);
};

export const formatDayjsGuessDate = (date: Dayjs) => dayjs(date).format('LL');

// i18n
export const formatYearlessDate = (date: Dayjs) =>
  dayjs(date)
    .format('l')
    .replace(/\/\d{4}\b/, '');
export const formatYearlessDateShortMonth = (date: Dayjs) =>
  dayjs(date)
    .format('ll')
    .replace(/, \d{4}\b/, '');

export const getMonthMnemonicForDate = (date: Dayjs): Mnemonic => {
  const monthName = monthNames[date.month()];
  return getMnemonicForMonth(monthName);
};
