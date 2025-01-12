import React from 'react';

import { betterDaysTable, chunkArray } from '../common';
import CalendarTable from './calendar-table';

const LongCalendar = () => {
  const daysTable = betterDaysTable(1000);
  const chunkedByWeek = chunkArray(daysTable, 7);

  return (
    <div className='long-calendar flex w-full flex-col items-start justify-center'>
      <CalendarTable
        chunkedDayArray={chunkedByWeek}
        getButtonClassName={({ isDoomsday, sameWeekdayAsDoomsday }) => {
          let cellClassName = 'text-gray-600';
          if (isDoomsday) {
            cellClassName = 'bg-indigo-400 text-gray-100';
          } else if (sameWeekdayAsDoomsday) {
            cellClassName = 'bg-indigo-900 text-gray-400';
          }
          return cellClassName;
        }}
      />
    </div>
  );
};

export default LongCalendar;
