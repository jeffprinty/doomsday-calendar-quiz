import dayjs from 'dayjs';

import { getDoomsdayWithinMonth, getFullWeekday, getMonthMnemonicForDate, getWeekdayForDate } from '../../math/dates';
import { commonStyles } from '../../common';
import { ReactNode } from 'react';

const formatWeekDistance = (howManySevens: number) => `${howManySevens} week${howManySevens > 1 ? 's' : ''}`;

const DoomsdayDifference = ({ isoDate }: { isoDate: string }) => {
  const target = dayjs(isoDate);
  const { common, monthNumber } = getMonthMnemonicForDate(target);
  const targetDayOfMonth = target.date();

  if (common === targetDayOfMonth) {
    return `Target date is doomsday ${targetDayOfMonth} === ${common}`;
  }
  let equationStuff: ReactNode;
  const doomsday = getDoomsdayWithinMonth(target, common);
  const doomsdayWeekday = getWeekdayForDate(doomsday);
  const weekdayForTarget = getWeekdayForDate(target);
  if (common < targetDayOfMonth) {
    const diffTargetMinusDoomsday = targetDayOfMonth - common;
    const howManySevens = Math.floor(diffTargetMinusDoomsday / 7);
    const moduloSeven = diffTargetMinusDoomsday % 7;
    const weekMath = formatWeekDistance(howManySevens);
    if (howManySevens) {
      const sevens = (<>
        <span className={commonStyles.step4}>plus {weekMath}</span>
        <> = </>
        <span className={commonStyles.step5}>{monthNumber}/{howManySevens * 7 + common} {doomsdayWeekday}</span>
        &nbsp;
        <span> + {moduloSeven} = {weekdayForTarget}</span>
      </>);
      equationStuff = sevens;
    } else {
      equationStuff = <>{doomsdayWeekday} + {moduloSeven} = {weekdayForTarget}</>;
    }
  }
  if (targetDayOfMonth < common) {
    const diffDoomsdayMinusTarget = common - targetDayOfMonth;
    const howManySevens = Math.floor(diffDoomsdayMinusTarget / 7);
    const moduloSeven = diffDoomsdayMinusTarget % 7;
    const sevensOrNah = howManySevens
      ? <>minus {formatWeekDistance(howManySevens)} = {monthNumber}/{common - howManySevens * 7} is the nearest {doomsdayWeekday}</>
      : <>{doomsdayWeekday}</>;
    equationStuff = <>{sevensOrNah} - {moduloSeven}</>
  }
  const doomsdayShortMonth = <>{monthNumber}/{common}</>
  return (
    <span className='doomsday-difference'>
      <span className={commonStyles.step1}>
        {doomsdayShortMonth}
      </span>
      &nbsp;
      {equationStuff}
    </span>
  );
};

export default DoomsdayDifference;
