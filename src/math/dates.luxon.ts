import { DateTime } from 'luxon';

export const guessDateFormat = 'MMMM dd, yyyy';

export const formatGuessDate = (date: DateTime) => date.toFormat(guessDateFormat);
