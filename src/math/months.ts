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

export type FullMonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type ShortMonthName =
  | 'jan'
  | 'feb'
  | 'mar'
  | 'apr'
  | 'may'
  | 'jun'
  | 'jul'
  | 'aug'
  | 'sep'
  | 'oct'
  | 'nov'
  | 'dec';

export const getRandomMonthName = (ignoreLeap = false) => {
  if (ignoreLeap) {
    const fixedMonths = monthNames.filter(
      (monthName) => !['January', 'February'].includes(monthName)
    );
    return fixedMonths[Math.random() * fixedMonths.length];
  }
  return monthNames[Math.random() * monthNames.length];
};
