import React from 'react';

import clsx from 'clsx';

import { allDaysFromMnemonics, CalendarDay, dayNames, fullDateWithWeekdayFormat } from '../common';

const CalendarTable = ({
  baseCellClassName,
  chunkedDayArray,
  getButtonClassName,
  handleDayClick,
}: {
  baseCellClassName?: string;
  chunkedDayArray: Array<Array<CalendarDay>>;
  getButtonClassName: (day: CalendarDay) => string;
  handleDayClick?: (day: CalendarDay) => void;
}) => {
  console.log('allDaysFromMnemonics', allDaysFromMnemonics);
  return (
    <table className=''>
      <thead>
        <tr>
          {dayNames.map((dayName) => (
            <th key={dayName} className='wx-3 text-center'>
              {dayName.slice(0, 2)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {chunkedDayArray.map((weekArray) => {
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
          const [firstDayInWeek] = weekArray;
          rowsToAdd.push(
            <tr key={JSON.stringify(firstDayInWeek)}>
              {weekArray.map((day) => {
                const { cellNumber, date, dayNumber, isDoomsday, weekday } = day;
                const cellClassName = getButtonClassName(day);
                return (
                  <td
                    className={clsx('wx-4 text-center leading-none', baseCellClassName)}
                    key={cellNumber}
                    data-weekday={weekday}
                    data-is-doomsday={isDoomsday}
                  >
                    <button
                      className={clsx('wx-3 rounded-xl px-2 text-xl', cellClassName)}
                      title={date.toFormat(fullDateWithWeekdayFormat)}
                      onClick={() => !!handleDayClick && handleDayClick(day)}
                    >
                      {dayNumber}
                    </button>
                  </td>
                );
              })}
            </tr>
          );
          return rowsToAdd;
        })}
      </tbody>
    </table>
  );
};

export default CalendarTable;
