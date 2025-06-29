import { betterDaysTable, chunkArray } from '../common';
import CalendarTable from './calendar-table';
import { PageDescribe } from './page-describe';

const LongCalendar = () => {
  const daysTable = betterDaysTable(1000);
  const chunkedByWeek = chunkArray(daysTable, 7);

  return (
    <div className='long-calendar flex flex-col items-center justify-center'>
      <PageDescribe className='max-w-md'>
        This is a helper to memorize other days of a year that line up with the doomsday
      </PageDescribe>
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
