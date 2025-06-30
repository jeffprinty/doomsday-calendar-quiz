import { DateTime } from 'luxon';

export const guessDateFormat = 'MMMM dd, yyyy';
export const fullDateWithWeekdayFormat = 'cccc MMMM dd, yyyy';

export const getFirstCalendarDate = (startingYear: number) =>
  DateTime.local(startingYear, 1, 1, { locale: 'en-US' }).startOf('week', { useLocaleWeeks: true });

export const formatFullDateWithWeekday = (date: DateTime) =>
  date.toFormat(fullDateWithWeekdayFormat);

export const formatGuessDate = (date: DateTime) => date.toFormat(guessDateFormat);
