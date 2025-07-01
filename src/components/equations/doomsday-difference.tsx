import dayjs from 'dayjs';

import { getDoomsdayWithinMonth, getFullWeekday, getMonthMnemonicForDate } from '../../math/dates';
import { commonStyles } from '../../common';
import { ReactNode } from 'react';

const formatWeekDistance = (howManySevens: number) => `minus ${howManySevens} week${howManySevens > 1 ? 's' : ''}`;

const DoomsdayDifference = ({ isoDate }: { isoDate: string }) => {
  const target = dayjs(isoDate);
  const { common, monthNumber } = getMonthMnemonicForDate(target);
  const targetDayOfMonth = target.date();

  if (common === targetDayOfMonth) {
    return `Target date is doomsday ${targetDayOfMonth} === ${common}`;
  }
  let equationStuff: ReactNode;
  const doomsday = getDoomsdayWithinMonth(target, common);
  const doomsdayWeekday = getFullWeekday(doomsday);
  if (common < targetDayOfMonth) {
    const diffTargetMinusDoomsday = targetDayOfMonth - common;
    const howManySevens = Math.floor(diffTargetMinusDoomsday / 7);
    const moduloSeven = diffTargetMinusDoomsday % 7;
    const addSevensLongWay = Array.from({ length: howManySevens }, () => '+ 7').join(' ');
    const sevensOrNah = howManySevens
      ? <>{formatWeekDistance(howManySevens)} = {monthNumber}/{howManySevens * 7 + common} is the nearest {doomsdayWeekday}</>
      : <></>;
    equationStuff = <>{sevensOrNah} {moduloSeven}</>;
  }
  if (targetDayOfMonth < common) {
    const diffDoomsdayMinusTarget = common - targetDayOfMonth;
    const howManySevens = Math.floor(diffDoomsdayMinusTarget / 7);
    const moduloSeven = diffDoomsdayMinusTarget % 7;
    const subtractSevens = <>minus {howManySevens} weeks</>;
    const sevensLongWay = Array.from({ length: howManySevens }, () => '- 7').join(' ');

    const sevensOrNah = howManySevens
      ? <>{formatWeekDistance(howManySevens)} = {monthNumber}/{common - howManySevens * 7} is the nearest {doomsdayWeekday}</>
      : <></>;
    equationStuff = <>{sevensOrNah} -{moduloSeven}</>
  }
  return (
    <span className='doomsday-difference text-xs'>
      <span className={commonStyles.step1}>
        Doomsday is {monthNumber}/{common}
      </span>
      &nbsp;
      {equationStuff}
    </span>
  );
};

export default DoomsdayDifference;
