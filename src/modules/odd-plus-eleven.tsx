import { ReactNode, useEffect, useState } from 'react';

import clsx from 'clsx';
import { BiHide, BiRefresh, BiShow } from 'react-icons/bi';

import { commonStyles, timeoutMs } from '../common';
import Button from '../components/button';
import { DoomsyearEquation } from '../components/doomsyear-equation';
import { Revealable } from '../components/shared';
import YearInput from '../components/year-input';
import { isOdd } from '../math/basic';
import { getAnchorDay } from '../math/century';
import { oddPlusElevenFull } from '../math/doomsyear-odd-plus-eleven';
import { Weekday } from '../math/weekdays';
import { getDoomsdayForYearV2, getRandomYear, splitYearIntoComponents } from '../math/year';
import WeekdayGuesser from './weekday-guesser';

const Fork = ({
  children,
  className,
  highlight,
}: {
  children: ReactNode;
  className?: string;
  highlight: boolean;
}) => {
  return (
    <div className={clsx(className, 'rounded-lg px-2 py-1', highlight && 'bg-indigo-400')}>
      {children}
    </div>
  );
};

const OddPlusEleven = () => {
  const [showWork, setShowWork] = useState(true);
  const [showWorkOnAnswer, setShowWorkOnAnswer] = useState(false);
  const [revealAll, setRevealAll] = useState(false);
  const initYear = getRandomYear();
  const [fullYearValue, setFullYearValue] = useState<number>(initYear);
  const [[century, year], setYearParts] = useState<[number, number]>([0, 0]);
  const yearPadded = year.toString().padStart(2, '0');
  const correctDoomsday = getDoomsdayForYearV2(fullYearValue);

  useEffect(() => {
    if (fullYearValue?.toString().length === 4) {
      const [firstHalf, lastHalf] = splitYearIntoComponents(fullYearValue);
      setYearParts([firstHalf, lastHalf]);
    }
  }, [fullYearValue]);

  const startGuessing = () => {
    setRevealAll(false);
    const rando = getRandomYear();
    setFullYearValue(rando);
    setShowWorkOnAnswer(false);
  };

  const handleGuess = (isCorrect: boolean) => {
    setRevealAll(true);
    setShowWorkOnAnswer(true);
    if (isCorrect) {
      setTimeout(() => {
        startGuessing();
      }, timeoutMs);
    }
  };

  const stepRow = 'flex flex-row items-center justify-around';
  const explainRow = 'text-center text-base';
  const iconButtonStyle = 'flex flex-row items-center justify-center w-8';

  const { firstResult, secondResult, moduloResult, moduloFromSeven } = oddPlusElevenFull(year);

  const yearIsOdd = isOdd(year);
  const firstResultIsOdd = isOdd(firstResult);

  const centuryAnchorDay = getAnchorDay(century);

  const showGuts = !!century && !!correctDoomsday && (showWork || showWorkOnAnswer);

  const extraStep = firstResult !== secondResult;

  return (
    <div className='sm-p-8 flex min-h-full flex-col items-center justify-between'>
      <div className='flex flex-row items-center justify-center pt-4'>
        <Button className={iconButtonStyle} onClick={() => setShowWork(!showWork)}>
          {showWork ? <BiHide /> : <BiShow />}
        </Button>
        <YearInput value={fullYearValue} setValue={setFullYearValue} />
        <Button className={iconButtonStyle} onClick={startGuessing}>
          <BiRefresh />
        </Button>
      </div>
      {showGuts && (
        <div
          className='sm-py-8 rounded-3xl border-2 border-indigo-800 px-12 py-2 text-2xl'
          key={fullYearValue}
        >
          <div className='flex flex-row items-center justify-center text-4xl'>
            {century && <div className={commonStyles.century}>{century}</div>}
            {year && <div className={commonStyles.year}>{yearPadded}</div>}
          </div>
          <div className={explainRow}>
            <span className={commonStyles.year}>{yearPadded}</span> is {yearIsOdd ? 'odd' : 'even'}{' '}
            so we
            {yearIsOdd ? ' add eleven and ' : ' '}
            divide by 2
          </div>
          <div className={stepRow}>
            <Fork highlight={yearIsOdd}>+11</Fork>
            <Fork highlight>/ 2</Fork>
          </div>
          <div className={stepRow}>
            <Revealable forceShow={revealAll}>{firstResult}</Revealable>
          </div>
          {extraStep && (
            <>
              <div className={explainRow}>First result is odd, so we add 11</div>
              <div className={stepRow}>
                <Fork highlight={firstResultIsOdd}>+ 11</Fork>
              </div>
              <div className={stepRow}>
                <Revealable forceShow={revealAll}>{secondResult}</Revealable>
              </div>
            </>
          )}
          <div className={stepRow}>Modulo 7</div>
          <div className={stepRow}>
            <Revealable forceShow={revealAll}>{moduloResult}</Revealable>
          </div>
          <div className={stepRow}>Subtract Modulo from 7</div>
          <div className={stepRow}>
            <Revealable forceShow={revealAll}>{moduloFromSeven}</Revealable>
          </div>
          <div className={stepRow}>
            <p>
              Anchor day for <span className={commonStyles.century}>{century}</span>00s is{' '}
              <Revealable forceShow={revealAll}>{centuryAnchorDay}</Revealable>
            </p>
          </div>
          <div className={stepRow}>
            <Revealable forceShow={revealAll}>
              {moduloFromSeven} + {centuryAnchorDay} = {moduloFromSeven + Number(centuryAnchorDay)}
            </Revealable>
          </div>
        </div>
      )}
      <DoomsyearEquation fullYear={fullYearValue} />
      <div className='pb-4'>
        <div className={stepRow}>What is the Doomsyear for {fullYearValue}</div>
        <WeekdayGuesser
          correctDay={correctDoomsday as Weekday}
          disableOnGuess
          key={`week_${fullYearValue}`}
          onGuess={handleGuess}
        />
      </div>
    </div>
  );
};

export default OddPlusEleven;
