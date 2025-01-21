import React, { useState } from 'react';

import { getRandomMnemonic, mnemonics } from './common';
import Button from './components/button';
import MonthDoomsdayCalendar from './components/month-doomsday-calendar';
import GuessOnlyDate from './guess-only-date';

const StepDisplay = ({
  children,
  show = true,
}: {
  children: React.ReactNode | Array<React.ReactNode> | string;
  show?: boolean;
}) => {
  if (!show) {
    return <></>;
  }
  return <div className='step-display'>{children}</div>;
};

const getRandom = (range: number) => Math.trunc(Math.random() * range);

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

const StepOne = () => {
  const [step, setStep] = useState(1);
  console.log('step', step);
  return (
    <div className='' id='page__step-one'>
      <OffsetIllustrated />
      <div className='steps-wrapper'>
        <StepDisplay show={false}>
          <div>
            <a href='https://en.wikipedia.org/wiki/Doomsday_rule#Memorable_dates_that_always_land_on_Doomsday'>
              wikipedia: Memorable Dates table
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Doomsday</th>
                <th>Handle</th>
              </tr>
            </thead>
            <tbody>
              {mnemonics.map(({ common, leap, memeticHandle, monthName, monthNumber }) => (
                <tr key={monthName}>
                  <td className=''>{monthName}</td>
                  <td className=''>
                    {monthNumber}/{common}
                    {!!leap && (
                      <span className='px-4 text-violet-500'>
                        {monthNumber}/{leap}
                      </span>
                    )}
                  </td>
                  <td>{memeticHandle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StepDisplay>
        <StepDisplay>
          <GuessOnlyDate />
        </StepDisplay>
        <StepDisplay>
          <MonthDoomsdayCalendar />
          <div>
            This will help you improve at converting the English word for the month to the month
            number.
          </div>
          <Button onClick={() => setStep((previous) => previous + 1)}>Next</Button>
        </StepDisplay>
        <StepDisplay show={false}>
          <div>
            <p>
              First, you need to commit the month mnemonics to memory. They’re only 12 of them, and
              there are mnemonics that you can use to help you remember them. You can customize
              these based on what is the most memorable for you. For instance, if one of these dates
              falls on your birthday that will be more memetically sticky. Part of committing
              something to memory is to link it to something familiar to reinforce those connections
              within your brain.
            </p>
          </div>
          <div className='explainer'>
            {mnemonics.map(({ monthName, common, monthNumber }) => {
              return (
                <div
                  key={monthName}
                  className='flex flex-row items-center justify-between text-center'
                >
                  {monthName}
                  <div className=''>
                    {monthNumber}/{common}
                  </div>
                </div>
              );
            })}
          </div>
        </StepDisplay>
      </div>
    </div>
  );
};

export default StepOne;
