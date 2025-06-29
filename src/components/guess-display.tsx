import clsx from 'clsx';

import { correctColor, incorrectColor } from '../common';

const GuessDisplay = ({
  className,
  guessedCorrectly,
  guessText,
  guessTextClassName = 'text-4xl',
  isLeapYear,
  questionText,
  explainCorrect,
  explainIncorrect,
}: {
  className?: string;
  guessedCorrectly?: boolean;
  guessText: string | number;
  guessTextClassName?: string;
  isLeapYear?: boolean;
  questionText: string;
  explainCorrect?: string | React.ReactNode;
  explainIncorrect?: string | React.ReactNode;
}) => {
  const explainMessage = guessedCorrectly ? explainCorrect : explainIncorrect;
  return (
    <div
      id='quiz__year-to-guess'
      className={clsx([
        className,
        'flex w-full flex-col items-center justify-center pb-6 pt-4 text-center',
        guessedCorrectly === undefined && 'bg-gray-600',
        guessedCorrectly === true && correctColor,
        guessedCorrectly === false && incorrectColor,
      ])}
    >
      <span className=''>{questionText}</span>
      <h2 className={clsx(guessTextClassName, isLeapYear && 'text-blue-400')}>{guessText}</h2>
      {guessedCorrectly !== undefined && <span className='text-xl'>{explainMessage}</span>}
    </div>
  );
};

export default GuessDisplay;
