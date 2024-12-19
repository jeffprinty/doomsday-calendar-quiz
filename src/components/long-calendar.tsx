import React from 'react';

import clsx from 'clsx';

import { betterDaysTable, chunkArray, dayAbbreviations, mnemonics } from '../common';

const LongCalendar = () => {
  const daysTable = betterDaysTable(500);
  console.log('daysTable', daysTable);
  const chunked = chunkArray(daysTable, 7);

  return (
    <table className=''>
      <thead>
        {dayAbbreviations.map((abbr) => (
          <th key={abbr} className='wx-3 text-center'>
            {abbr}
          </th>
        ))}
      </thead>
      {chunked.map((weekArray) => (
        <tr key={JSON.stringify(weekArray)}>
          {weekArray.map(({ cellNumber, date, dayNumber, month }) => {
            const monthMnemonic = mnemonics.find((mne) => mne.monthNumber === month);
            const isDoomsday = monthMnemonic?.common === dayNumber;
            return (
              <td
                className={clsx(isDoomsday && 'bg-indigo-400', 'wx-3 text-center')}
                key={cellNumber}
              >
                {date.get('day')}
              </td>
            );
          })}
        </tr>
      ))}
    </table>
  );
};

export default LongCalendar;
