import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime } from 'luxon';

import {
  chance,
  correctColor,
  Day,
  incorrectColor,
  mnemonics,
  stepFive,
  stepFour,
  stepOne,
  Steps,
  stepThree,
  stepTwo
} from '../common';
import Button from './button';
import { DayOfWeekGuesser } from './doomsday-quiz';
import Hints from './hints';

const MathStepHelper = () => {
  const [inputHash, setInputHash] = useState({
    stepOne: '',
    stepTwo: '',
    stepThree: '',
    stepFour: '',
    stepFive: ''
  });
  const rememberRow: Array<{
    id: Steps;
    stepClassName: string;
    stepText: string;
  }> = [
    {
      id: 'stepOne',
      stepClassName: stepOne,
      stepText: 'How many twelves?'
    },
    {
      id: 'stepTwo',
      stepClassName: stepTwo,
      stepText: 'Minus nearest twelve'
    },
    {
      id: 'stepThree',
      stepClassName: stepThree,
      stepText: 'How many fours?'
    },
    {
      id: 'stepFour',
      stepClassName: stepFour,
      stepText: 'Remember anchor day.'
    },
    {
      id: 'stepFive',
      stepClassName: stepFive,
      stepText: 'Add it up.'
    }
  ];

  return (
    <div className='flex flex-col'>
      <div className='grid w-96 grid-cols-5 py-3'>
        {rememberRow.map(({ id, stepClassName, stepText }) => (
          <div
            key={id}
            className={clsx(
              stepClassName,
              'flex h-32 flex-col items-center justify-end text-center'
            )}
          >
            <div>{stepText}</div>
            <input
              type='number'
              className='mt-2 w-10 rounded-lg bg-indigo-900 py-2 text-center text-white'
              value={inputHash[id]}
              onChange={({ target: { value } }) =>
                setInputHash((previous) => ({
                  ...previous,
                  [id]: Number(value)
                }))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const DoomsdayInfo = () => {
  const initYear = chance.integer({ min: 1900, max: 2099 });
  // TODO: Allow set year
  const [guessingYear, setGuessingYear] = useState(initYear);
  console.log('guessingYear', guessingYear);

  const [correctDay, setCorrectDay] = useState<Day>();
  const [daySelected, setSelectedDay] = useState<Day>();

  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();

  const [inputHash, setInputHash] = useState<{ [key: string]: number }>({});
  console.log('inputHash', inputHash);

  const getNewYear = () => {
    const randomYearAsInt = chance.integer({ min: 1900, max: 2099 });
    setInputHash({});
    setLastAnswerCorrect(undefined);
    setGuessingYear(randomYearAsInt);
    setCorrectDay(undefined);
    setSelectedDay(undefined);
  };

  // DUPED
  const doomsdayOnYear = DateTime.fromObject({
    year: guessingYear,
    month: 4,
    day: 4
  });

  const correctDoomsday = doomsdayOnYear.toFormat('ccc') as Day;

  return (
    <div>
      <div
        id='quiz__year-to-guess'
        className={clsx([
          'my-4 flex w-full flex-col items-center justify-center pb-6 pt-4 text-center',
          lastAnswerCorrect === undefined && 'bg-gray-600',
          lastAnswerCorrect === true && correctColor,
          lastAnswerCorrect === false && incorrectColor
        ])}
      >
        <span className=''>What is the doomsday for:</span>
        <h2 className='text-6xl'>{guessingYear}</h2>
      </div>
      <MathStepHelper key={guessingYear} />
      <DayOfWeekGuesser
        key={`week_${guessingYear}`}
        correctDay={correctDay}
        daySelected={daySelected}
        onDayClick={(selected) => {
          setSelectedDay(selected);
          setCorrectDay(correctDoomsday);
          setLastAnswerCorrect(selected === correctDoomsday);
        }}
      />
      <Button onClick={getNewYear} className='my-2 h-16 w-full'>
        Random Year
      </Button>
      <Hints year={guessingYear} />
      <div className='explainer hidden'>
        {mnemonics.map(({ monthName, common }, index) => {
          const hackyMonthNumber = index + 1;
          return (
            <div key={monthName} className='flex flex-row items-center justify-between text-center'>
              {monthName}
              <div className=''>
                {hackyMonthNumber}/{common}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoomsdayInfo;
