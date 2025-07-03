import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { PieChart } from 'react-minimal-pie-chart';
import colors from 'tailwindcss/colors';

import { PastAnswer } from '../hooks/use-answer-history';
import { formatDayjsGuessDate } from '../math/dates';

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const QuizResults = ({
  answers,
  currentGuess,
  dateFormat,
}: {
  answers: Array<PastAnswer>;
  currentGuess: string;
  dateFormat?: (date: Dayjs) => string;
}) => {
  const correctValue = answers.filter(([, , isCorrect]) => isCorrect).length;
  const incorrectValue = answers.filter(([, , isCorrect]) => !isCorrect).length;
  return (
    <div
      id='quiz-results'
      className='grid h-32 max-h-32 w-full grid-cols-2 flex-row items-start justify-between bg-indigo-800 bg-opacity-40'
    >
      <div className='w-18 relative flex h-32 max-h-32 flex-col items-center justify-center overflow-hidden p-3'>
        <PieChart
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          labelStyle={{ fill: '#FFFFFF' }}
          background='#1C1A37'
          // startAngle={270}
          // lengthAngle={180}
          data={[
            { title: 'Correct', value: correctValue, color: colors.green[600] },
            { title: 'Incorrect', value: incorrectValue, color: colors.red[800] },
          ]}
        />
      </div>
      <div className='flex h-32 max-h-32 flex-col justify-start overflow-y-auto'>
        <ul className='w-full'>
          {[...answers].reverse().map(([answerTime, timeInSeconds, isCorrect, dateGuessedIso]) => {
            const dateGuessed = dayjs(dateGuessedIso);
            return (
              <li
                className={clsx(
                  'flex w-full flex-row justify-between bg-opacity-40 px-2',
                  isCorrect ? 'bg-green-500 odd:bg-green-800' : 'bg-red-900'
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
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuizResults;
