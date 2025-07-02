import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { PieChart } from 'react-minimal-pie-chart';
import colors from 'tailwindcss/colors';

import { correctColor, incorrectColor, PastAnswer } from '../common';
import { formatDayjsGuessDate } from '../math/dates';

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const QuizResults = ({
  answers,
  currentGuess,
  dateFormat,
}: {
  answers: Array<PastAnswer<Dayjs>>;
  currentGuess: string;
  dateFormat?: (date: Dayjs) => string;
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
          {[...answers].reverse().map(([answerTime, timeInSeconds, isCorrect, dateGuessed]) => (
            <li
              className={clsx(
                'flex w-full flex-row justify-between bg-opacity-40 px-2',
                isCorrect ? correctColor : incorrectColor
              )}
              key={+answerTime}
            >
              <span>{timeInSeconds.toFixed(1)}s</span>
              <span>
                {formatDayjsGuessDate(dateGuessed) === currentGuess && '⚪️ '}
                {typeof dateFormat === 'function'
                  ? dateFormat(dateGuessed)
                  : formatDayjsGuessDate(dateGuessed)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizResults;
