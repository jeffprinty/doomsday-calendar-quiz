import { ReactNode } from 'react';

import clsx from 'clsx';
import dayjs from 'dayjs';

import { commonStyles } from '../../common';
import {
  getDoomsdayWithinMonth,
  getMonthMnemonicForDate,
  getWeekdayForDate,
} from '../../math/dates';

const dayOffsetStyle = 'text-indigo-300';

const formatWeekDistance = (howManySevens: number) =>
  `${howManySevens} week${howManySevens > 1 ? 's' : ''}`;

const DoomsdayDifference = ({ className, isoDate }: { className?: string; isoDate: string }) => {
  const target = dayjs(isoDate);
  const { common, monthNumber } = getMonthMnemonicForDate(target);
  const targetDayOfMonth = target.date();

  if (common === targetDayOfMonth) {
    return (
      <span className='text-green-500'>
        Target date is doomsday {targetDayOfMonth} == {common}
      </span>
    );
  }
  let equationStuff: ReactNode;
  const doomsday = getDoomsdayWithinMonth(target, common);
  const doomsdayWeekday = getWeekdayForDate(doomsday);
  const weekdayForTarget = getWeekdayForDate(target);
  const doomsdayShortMonth = `${monthNumber}/${common}`;
  const targetDayShortMonth = `${monthNumber}/${targetDayOfMonth}`;

  const sevenMath = (
    howManySevens: number,
    moduloSeven: number,
    nearestDoomsDate: number,
    plus: boolean
  ) => {
    const weekMath = formatWeekDistance(howManySevens);
    const operator = plus ? '+' : '-';
    return (
      <>
        <span className={commonStyles.step5}>
          {doomsdayWeekday} {doomsdayShortMonth}
        </span>
        &nbsp;
        <span className={plus ? 'text-green-200' : 'text-red-200'}>
          {plus ? 'plus' : 'minus'} {weekMath}
        </span>
        <> = </>
        <span className={commonStyles.step5}>
          {monthNumber}/{nearestDoomsDate} {doomsdayWeekday}
        </span>
        &nbsp;
        {!!moduloSeven && (
          <span>
            <span className={dayOffsetStyle}>
              {operator} {moduloSeven}
            </span>{' '}
            = {weekdayForTarget} {targetDayShortMonth}
          </span>
        )}
      </>
    );
  };

  if (common < targetDayOfMonth) {
    const diffTargetMinusDoomsday = targetDayOfMonth - common;
    const howManySevens = Math.floor(diffTargetMinusDoomsday / 7);
    const moduloSeven = diffTargetMinusDoomsday % 7;
    if (howManySevens) {
      const nearestDoomsDate = howManySevens * 7 + common;
      equationStuff = sevenMath(howManySevens, moduloSeven, nearestDoomsDate, true);
    } else {
      equationStuff = (
        <>
          <span className={commonStyles.step5}>
            {doomsdayWeekday} {doomsdayShortMonth}
          </span>
          <span className={dayOffsetStyle}> + {moduloSeven}</span> = {weekdayForTarget}
        </>
      );
    }
  }
  if (targetDayOfMonth < common) {
    const diffDoomsdayMinusTarget = common - targetDayOfMonth;
    const howManySevens = Math.floor(diffDoomsdayMinusTarget / 7);
    const moduloSeven = diffDoomsdayMinusTarget % 7;
    if (howManySevens) {
      const nearestDoomsDate = common - howManySevens * 7;
      equationStuff = sevenMath(howManySevens, moduloSeven, nearestDoomsDate, false);
    } else {
      equationStuff = (
        <>
          <span className={commonStyles.step5}>
            {doomsdayWeekday} {doomsdayShortMonth}
          </span>
          <span className={dayOffsetStyle}> - {moduloSeven}</span> = {weekdayForTarget}
        </>
      );
    }
  }
  return (
    <span className={clsx('doomsday-difference', className)}>
      &nbsp;
      {equationStuff}
    </span>
  );
};

export default DoomsdayDifference;
