import dayjs from 'dayjs';

import DoomsdayDifference from '../components/equations/doomsday-difference';

const startingDate = dayjs('2025-01-01');

const bunchOfIsoDates = Array.from({ length: 600 }, (x, i) => {
  const datePlusDay = startingDate.add(i, 'day');
  const shortDate = datePlusDay.format('YYYY-MM-DD');
  return [datePlusDay.toISOString(), shortDate];
});

const EquationsModule = () => {
  return (
    <div className='flex flex-col text-xs'>
      {bunchOfIsoDates.map(([isoDate, shortDate]) => (
        <div key={isoDate}>
          {shortDate}: <DoomsdayDifference isoDate={isoDate} />
        </div>
      ))}
    </div>
  );
};

export default EquationsModule;
