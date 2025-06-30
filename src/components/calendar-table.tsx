import clsx from 'clsx';

import { CalendarDay } from '../common';
import { formatFullDateWithWeekdayDayJs } from '../math/dates';
import { weekdayNames } from '../math/weekdays';

const CalendarTable = ({
  baseCellClassName,
  chunkedDayArray,
  getButtonClassName,
  handleDayClick,
  hideHeader,
  hideYear,
}: {
  baseCellClassName?: string;
  chunkedDayArray: Array<Array<CalendarDay>>;
  getButtonClassName: (day: CalendarDay) => string;
  handleDayClick?: (day: CalendarDay) => void;
  hideHeader?: boolean;
  hideYear?: boolean;
}) => {
  return (
    <table className=''>
      <thead className={clsx(hideHeader && 'hidden')}>
        <tr>
          {weekdayNames.map((dayName) => (
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
          if (!hideYear && weekArray.length > 0 && chunkContainsFirstOfYear) {
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
                const { cellNumber, dayJsDay, dayNumber, isDoomsday, weekday } = day;
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
                      title={formatFullDateWithWeekdayDayJs(dayJsDay)}
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
