import dayjs from 'dayjs';
import * as isLeapYear from 'dayjs/plugin/isLeapYear';
import objectSupport from 'dayjs/plugin/objectSupport';
import { DateTime } from 'luxon';

dayjs.extend(objectSupport);
dayjs.extend(isLeapYear);

export const guessDateFormat = 'MMMM dd, yyyy';
export const fullDateWithWeekdayFormat = 'cccc MMMM dd, yyyy';
const fullDateFormat = 'dddd MMMM DD, YYYY';

export const getFirstCalendarDate = (startingYear: number) =>
  DateTime.local(startingYear, 1, 1, { locale: 'en-US' }).startOf('week', { useLocaleWeeks: true });

export const formatFullDateWithWeekday = (date: DateTime) =>
  date.toFormat(fullDateWithWeekdayFormat);

export const formatGuessDate = (date: DateTime) => date.toFormat(guessDateFormat);

export const getFirstDateForCalendar = (year: number) => {
  return dayjs({ year, month: 1, day: 1 });
};
