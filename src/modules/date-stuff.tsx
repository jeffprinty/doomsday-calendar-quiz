import dayjs from 'dayjs';

import { formatFullDateWithWeekday } from '../math/dates';

const DateStuff = () => {
  const now = dayjs();
  return (
    <div className='date-stuff flex flex-col'>
      formatFullDateWithWeekday: {formatFullDateWithWeekday(now)}
    </div>
  );
};

export default DateStuff;
