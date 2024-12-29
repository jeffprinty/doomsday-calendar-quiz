import React from 'react';

import clsx from 'clsx';
import { DateTime } from 'luxon';

import { chunkArray, fullDateWithWeekdayFormat, mnemonics, twoLetterDays } from '../common';

const getDoomsdayForYear = (year: number) =>
  DateTime.fromObject({
    year,
    month: 4,
    day: 4
  });

const betterDaysTable = (howManyDays = 360) => {
  const startingYear = 2024;
  // locale weeks: https://moment.github.io/luxon/#/intl?id=locale-based-weeks
  const firstDayToDisplay = DateTime.local(startingYear, 1, 1, { locale: 'en-US' }).startOf(
    'week',
    { useLocaleWeeks: true }
  );
  const daysArray = [];
  let doomsdayForYear = getDoomsdayForYear(startingYear);
  let yearWeIn = startingYear;
  for (let day = 0; day < howManyDays; day++) {
    const dayy = firstDayToDisplay.plus({ days: day });
    const dayYear = dayy.get('year');
    if (dayYear !== yearWeIn) {
      doomsdayForYear = getDoomsdayForYear(dayYear);
      yearWeIn = dayYear;
    }
    const weekday = dayy.get('weekday');
    // console.log('weekday', weekday, dayy.toFormat('ccc'));
    const dayObject = {
      date: dayy,
      month: dayy.get('month'),
      dayNumber: dayy.get('day'),
      weekday, // NOTE: this is luxon weekday, sunday = 1
      cellNumber: day,
      year: dayYear,
      sameWeekdayAsDoomsday: doomsdayForYear.get('weekday') === weekday
    };
    daysArray.push(dayObject);
  }
  return daysArray;
};

const LongCalendar = () => {
  const daysTable = betterDaysTable(1000);
  const chunked = chunkArray(daysTable, 7);

  return (
    <div className='long-calendar flex w-full flex-row items-start justify-center overflow-y-auto'>
      <table className=''>
        <thead>
          <tr>
            {twoLetterDays.map((abbr) => (
              <th key={abbr} className='wx-3 text-center'>
                {abbr}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {chunked.map((weekArray) => {
            const rowsToAdd: Array<JSX.Element> = [];
            const chunkContainsFirstOfYear = weekArray.find(
              (day) => day.dayNumber === 1 && day.month === 1
            );
            if (weekArray.length > 0 && chunkContainsFirstOfYear) {
              const lastDayInArray = [...weekArray].pop();
              rowsToAdd.push(
                <tr key={`week${lastDayInArray?.cellNumber}`}>
                  <td className='text-center' colSpan={7}>
                    {lastDayInArray?.year}
                  </td>
                </tr>
              );
            }
            rowsToAdd.push(
              <tr key={JSON.stringify(weekArray)}>
                {weekArray.map(
                  ({ cellNumber, date, dayNumber, month, sameWeekdayAsDoomsday, weekday }) => {
                    const monthMnemonic = mnemonics.find((mne) => mne.monthNumber === month);
                    const isDoomsday = date.isInLeapYear
                      ? monthMnemonic?.leap === dayNumber
                      : monthMnemonic?.common === dayNumber;
                    return (
                      <td
                        className={clsx(
                          !isDoomsday && sameWeekdayAsDoomsday && 'bg-indigo-900',
                          isDoomsday && 'bg-indigo-400',
                          'wx-3 text-center leading-none'
                        )}
                        key={cellNumber}
                        data-weekday={weekday}
                      >
                        <button title={date.toFormat(fullDateWithWeekdayFormat)}>
                          {dayNumber}
                        </button>
                      </td>
                    );
                  }
                )}
              </tr>
            );
            return rowsToAdd;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LongCalendar;
