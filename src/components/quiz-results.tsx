import clsx from 'clsx';
import { DateTime } from 'luxon';
import { PieChart } from 'react-minimal-pie-chart';
import colors from 'tailwindcss/colors';

import { correctColor, incorrectColor, PastAnswer } from '../common';
import { formatGuessDate } from '../math/dates';

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
      className='grid h-32 max-h-32 w-full grid-cols-2 flex-row items-start justify-between bg-indigo-800 bg-opacity-40'
    >
      <div className='w-18 flex h-32 max-h-32 flex-col items-center justify-center overflow-hidden p-3'>
        <PieChart
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          labelStyle={{ fill: '#FFFFFF' }}
          background='#1C1A37'
          data={[
            { title: 'Correct', value: correctValue, color: colors.green[600] },
            { title: 'Incorrect', value: incorrectValue, color: colors.red[800] },
          ]}
        />
      </div>
      <div className='flex h-32 max-h-32 flex-col justify-start overflow-y-auto'>
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
                {formatGuessDate(dateGuessed) === currentGuess && '⚪️'}
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
