import { useState } from 'react';

import { getRandom } from '../common';
import Button from '../components/button';
import { getRandomMnemonic } from '../math/month-doomsdays';

const OffsetIllustrated = () => {
  const initRandomMnemonic = getRandomMnemonic();
  const [randomMnemonic, setRandomMnemonic] = useState(initRandomMnemonic);
  const { daysInMonth, common } = randomMnemonic;
  const [randomDayInMonth, setRandomDayInMonth] = useState(getRandom(daysInMonth));
  const monthDayArray = Array.from({ length: daysInMonth }, (x, index) => index + 1);

  // figure out which direction we're mathing in
  const doomsdayIsBeforeTargetDay = common < randomDayInMonth;
  const doomsdayIsTargetDay = common === randomDayInMonth;

  const newMonth = () => {
    setRandomMnemonic(getRandomMnemonic());
    setRandomDayInMonth(getRandom(daysInMonth));
  };

  const getCellClass = (dayNumber: number) => {
    if (dayNumber === common) {
      return 'bg-green-500';
    }
    if (dayNumber === randomDayInMonth) {
      return 'bg-red-500';
    }
    // the long dumb way
    if (!doomsdayIsTargetDay) {
      if (doomsdayIsBeforeTargetDay) {
        if (common < dayNumber && dayNumber < randomDayInMonth) {
          return 'bg-blue-800';
        }
      } else if (randomDayInMonth < dayNumber && dayNumber < common) {
        return 'bg-blue-800';
      }
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
      <Button onClick={newMonth}>New</Button>
    </div>
  );
};

export default OffsetIllustrated;
