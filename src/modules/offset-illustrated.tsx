import { Mnemonic } from '../math/month-doomsdays';

const OffsetIllustrated = ({
  mnemonic,
  selectedDayInMonth,
}: {
  mnemonic: Mnemonic;
  selectedDayInMonth: number;
}) => {
  const { daysInMonth, common } = mnemonic;
  const monthDayArray = Array.from({ length: daysInMonth }, (x, index) => index + 1);

  // figure out which direction we're mathing in
  const doomsdayIsBeforeTargetDay = common < selectedDayInMonth;

  const getCellClass = (dayNumber: number) => {
    if (dayNumber === selectedDayInMonth) {
      return 'bg-green-500';
    }
    if (dayNumber === common) {
      return 'bg-red-500';
    }
    // the long dumb way
    if (doomsdayIsBeforeTargetDay) {
      if (common < dayNumber && dayNumber < selectedDayInMonth) {
        // doomsday is behind day, subtracting 7s
        const difference = dayNumber - common;
        return difference % 7 === 0 ? 'bg-pink-400' : 'bg-blue-800';
      }
    } else if (selectedDayInMonth < dayNumber && dayNumber < common) {
      // doomsday is ahead of day, adding 7s
      const difference = dayNumber - selectedDayInMonth;
      return difference % 7 === 0 ? 'bg-pink-400' : 'bg-blue-800';
    }
    return '';
  };

  return (
    <div className='w-full'>
      <table className='w-full'>
        <thead>
          <tr>
            {monthDayArray.map((dayNumber) => (
              <th key={`th_${dayNumber}`}>{dayNumber}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {monthDayArray.map((dayNumber) => (
              <td className={getCellClass(dayNumber)} key={`td_${dayNumber}`}>
                {dayNumber}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OffsetIllustrated;
