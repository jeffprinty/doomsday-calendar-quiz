import React from 'react';

import clsx from 'clsx';
import { DateTime } from 'luxon';
import { PieChart } from 'react-minimal-pie-chart';

import { correctColor, guessDateFormat, incorrectColor, PastAnswer } from '../common';

const QuizResults = ({
  answers,
  currentGuess,
  dateFormat = 'MMM dd, yy',
}: {
  answers: Array<PastAnswer<DateTime>>;
  currentGuess: string;
  dateFormat?: string;
}) => {
  const correctValue = answers.filter(([, isCorrect]) => isCorrect).length;
  const incorrectValue = answers.filter(([, isCorrect]) => !isCorrect).length;
  return (
    <div
      id='quiz-results'
      className='grid h-48 w-full grid-cols-2 flex-row items-start justify-between bg-indigo-800 bg-opacity-40'
    >
      <div className='flex h-48 flex-col items-center justify-center px-8'>
        <PieChart
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          data={[
            {
              title: 'Correct',
              value: correctValue,
              color: 'rgb(22 163 74/var(--tw-bg-opacity,1))',
            },
            { title: 'Incorrect', value: incorrectValue, color: '#C13C37' },
          ]}
        />
      </div>
      <div className='flex h-48 flex-col justify-start overflow-y-auto'>
        <ul className='w-full'>
          {[...answers].reverse().map(([timeInSeconds, isCorrect, dateGuessed]) => (
            <li
              className={clsx(
                'flex w-full flex-row justify-between bg-opacity-40 px-2',
                isCorrect ? correctColor : incorrectColor
              )}
              key={`${timeInSeconds}_${isCorrect}`}
            >
              <span>{timeInSeconds}</span>
              <span>
                {dateGuessed.toFormat(guessDateFormat) === currentGuess && '⚪️'}
                {dateGuessed.toFormat(dateFormat)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizResults;
