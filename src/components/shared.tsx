import React, { useState } from 'react';

import clsx from 'clsx';

import {
  correctColor,
  Day,
  daysOfWeek,
  incorrectColor,
  stepFive,
  stepFour,
  stepOne,
  Steps,
  stepThree,
  stepTwo
} from '../common';
import Button from './button';

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='container flex h-full w-full flex-col items-center justify-start border border-tertiary bg-secondary lg:w-2/3'>
      {children}
    </section>
  );
};

export const GuessDisplay = ({
  guessedCorrectly,
  guessText,
  guessTextClassName = 'text-4xl',
  questionText
}: {
  guessedCorrectly?: boolean;
  guessText: string | number;
  guessTextClassName?: string;
  questionText: string;
}) => {
  return (
    <div
      id='quiz__year-to-guess'
      className={clsx([
        'my-4 flex w-full flex-col items-center justify-center pb-6 pt-4 text-center',
        guessedCorrectly === undefined && 'bg-gray-600',
        guessedCorrectly === true && correctColor,
        guessedCorrectly === false && incorrectColor
      ])}
    >
      <span className=''>{questionText}</span>
      <h2 className={guessTextClassName}>{guessText}</h2>
    </div>
  );
};

export const MathStepHelper = () => {
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
    <div className='flex flex-col items-center'>
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

export const DayOfWeekGuesser = ({
  correctDay,
  daySelected,
  disabled = false,
  onDayClick
}: {
  correctDay?: Day;
  daySelected?: Day;
  disabled?: boolean;
  onDayClick: (dayClicked: Day) => void;
}) => {
  return (
    <div className='grid w-full grid-cols-7 pt-6'>
      {daysOfWeek.map((day: Day) => {
        const thisDayIsCorrect = correctDay === day;
        const thisDayWasSelected = daySelected === day;
        const incorrectSelection = daySelected !== correctDay;
        return (
          <Button
            className={clsx([
              'quiz__day-of-week mx-1 h-24 px-1 text-center',
              incorrectSelection && thisDayWasSelected && 'disabled:bg-red-900',
              thisDayIsCorrect && 'disabled:bg-green-600 disabled:text-black'
            ])}
            data-correct-day={thisDayIsCorrect}
            disabled={disabled}
            key={day}
            onClick={() => onDayClick(day)}
          >
            {day}
            {thisDayIsCorrect && <span className='correct-indicator'>✅</span>}
          </Button>
        );
      })}
    </div>
  );
};
