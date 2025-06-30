import dayjs, { Dayjs } from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import isoWeek from 'dayjs/plugin/isoWeek';
import objectSupport from 'dayjs/plugin/objectSupport';
import timezone from 'dayjs/plugin/timezone';
import { DateTime } from 'luxon';

import 'dayjs/locale/en';

dayjs.extend(objectSupport);
dayjs.extend(isLeapYear);
dayjs.locale('en');
dayjs.extend(timezone);
dayjs.extend(isoWeek);

dayjs.tz.guess();

export const guessDateFormat = 'MMMM dd, yyyy';
export const fullDateWithWeekdayFormat = 'cccc MMMM dd, yyyy';

export const getFirstCalendarDate = (startingYear: number) =>
  DateTime.local(startingYear, 1, 1, { locale: 'en-US' }).startOf('week', { useLocaleWeeks: true });

export const formatFullDateWithWeekday = (date: DateTime) =>
  date.toFormat(fullDateWithWeekdayFormat);

export const formatFullDateWithWeekdayDayJs = (date: Dayjs) => date.format(fullDateFormat);

export const formatGuessDate = (date: DateTime) => date.toFormat(guessDateFormat);

export const getFirstDateForCalendar = (year: number) => {
  return dayjs({ year, month: 0, date: 1 }).startOf('week');
};

export const dateIsLeapYear = (date: Dayjs) => date.isLeapYear();

export const getDoomsdayForYear = (year: number): Dayjs => dayjs({ year, month: 3, date: 4 });
