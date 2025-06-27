import { ReactNode, useEffect, useState } from 'react';

import clsx from 'clsx';
import { IoMdEye, IoMdEyeOff, IoMdRefresh } from 'react-icons/io';

import { Day, getAnchorDay, getDoomsdayForYearV2, getRandomYear } from '../common';
import Button from '../components/button';
import NumberInput from '../components/number-input';
import YearInput from '../components/year-input';
import { DayOfWeekGuesserSelfContained } from './day-of-week-guesser';

// const Step = ({
//   children,
//   className,
//   show = true,
//   step,
//   stepId,
// }: {
//   children: ReactNode;
//   className?: string;
//   show?: boolean;
//   step: number;
//   stepId: number;
// }) => {
//   if (!show || step > stepId) {
//     return <></>;
//   }
//   return <div className={clsx(className, 'step')}>{children}</div>;
// };

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

const Revealable = ({
  children,
  className,
  forceShow = false,
}: {
  children: ReactNode;
  className?: string;
  forceShow?: boolean;
}) => {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!revealed && forceShow) {
      setRevealed(true);
    }
  }, [forceShow]);
  return (
    <button
      className={clsx(className, 'revealable', !revealed && 'blur-sm')}
      onClick={() => setRevealed(!revealed)}
    >
      {children}
    </button>
  );
};

const OddPlusEleven = () => {
  const [showWork, setShowWork] = useState(true);
  const [revealAll, setRevealAll] = useState(false);
  const [fullYearValue, setFullYearValue] = useState<number>();
  const [[century, year], setYearParts] = useState<[number, number]>([0, 0]);
  const yearPadded = year.toString().padStart(2, '0');
  const correctDoomsday = getDoomsdayForYearV2(fullYearValue);
  useEffect(() => {
    if (fullYearValue?.toString().length === 4) {
      const stringified = fullYearValue.toString();
      const firstHalf = Number(stringified.slice(0, 2));
      const lastHalf = Number(stringified.slice(2, 4));
      setYearParts([firstHalf, lastHalf]);
      // const [century, year] = stringified.
    }
  }, [fullYearValue]);

  const handleClick = () => {
    setRevealAll(false);
    const rando = getRandomYear();
    setFullYearValue(rando);
  };

  const stepRow = 'flex flex-row items-center justify-around';
  const yearStyle = 'text-yellow-400';
  const centuryStyle = 'text-green-400';
  const iconButtonStyle = 'flex flex-row items-center justify-center w-8';

  const yearIsEven = year % 2 === 0;
  const firstResult = yearIsEven ? year / 2 : year + 11;
  const firstResultIsEven = firstResult % 2 === 0;
  const secondResult = firstResultIsEven ? firstResult / 2 : firstResult + 11;
  const secondResultIsOdd = secondResult % 2 !== 0;
  const thirdResult = secondResult + 11;

  const beforeModule = secondResultIsOdd ? thirdResult : secondResult;

  const afterModulo = beforeModule % 7;
  const moduloFromSeven = afterModulo === 0 ? 0 : 7 - afterModulo;

  const centuryAnchorDay = getAnchorDay(century);

  return (
    <div>
      <div className='flex flex-row items-center justify-center'>
        <YearInput value={fullYearValue} setValue={setFullYearValue} />
        <Button className={iconButtonStyle} onClick={handleClick}>
          <IoMdRefresh />
        </Button>
        <Button className={iconButtonStyle} onClick={() => setShowWork(!showWork)}>
          {showWork ? <IoMdEyeOff /> : <IoMdEye />}
        </Button>
      </div>
      {century && correctDoomsday && showWork && (
        <div key={fullYearValue}>
          <div className='flex flex-row items-center justify-center text-2xl'>
            {century && <div className={centuryStyle}>{century}</div>}
            {year && <div className={yearStyle}>{yearPadded}</div>}
          </div>
          <div className={clsx(stepRow, yearStyle)}>{yearPadded}</div>
          <div className={stepRow}>
            <Fork highlight={yearIsEven}>/ 2</Fork>
            <Fork highlight={!yearIsEven}>+11</Fork>
          </div>
          <div className={stepRow}>
            <Revealable forceShow={revealAll}>{firstResult}</Revealable>
          </div>
          <div className={stepRow}>
            <Fork highlight={firstResultIsEven}>/ 2</Fork>
            <Fork highlight={!firstResultIsEven}>+11</Fork>
          </div>
          <div className={stepRow}>
            <Revealable forceShow={revealAll}>{secondResult}</Revealable>
          </div>
          {secondResultIsOdd && (
            <>
              <div className={stepRow}>Second Result is Odd</div>
              <div className={stepRow}>
                <Fork highlight>+11</Fork>
              </div>
              <div className={stepRow}>
                <Revealable forceShow={revealAll}>{thirdResult}</Revealable>
              </div>
            </>
          )}
          <div className={stepRow}>Modulo 7</div>
          <div className={stepRow}>
            <Revealable forceShow={revealAll}>{afterModulo}</Revealable>
          </div>
          <div className={stepRow}>Subtract Modulo from 7</div>
          <div className={stepRow}>
            <Revealable forceShow={revealAll}>{moduloFromSeven}</Revealable>
          </div>
          <div className={stepRow}>
            <p>
              Anchor day for <span className={centuryStyle}>{century}</span>00s is{' '}
              {centuryAnchorDay}
            </p>
          </div>
          <div className={stepRow}>
            <Revealable forceShow={revealAll}>
              {moduloFromSeven} + {centuryAnchorDay} = {moduloFromSeven + Number(centuryAnchorDay)}
            </Revealable>
          </div>
          <br />
          <DayOfWeekGuesserSelfContained
            correctDay={correctDoomsday as Day}
            key={`week_${fullYearValue}`}
            onGuess={(answer, isCorrect) => {
              console.log('answer, isCorrect', answer, isCorrect);
              setRevealAll(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OddPlusEleven;
