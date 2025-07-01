import clsx from 'clsx';
import { BiLoaderCircle } from 'react-icons/bi';

import { correctColor, incorrectColor } from '../common';

const GuessDisplay = ({
  autoMode,
  autoProcessing,
  className,
  guessedCorrectly,
  guessText,
  guessTextClassName = 'text-4xl',
  isLeapYear,
  questionText,
  explainCorrect,
  explainIncorrect,
}: {
  autoMode?: boolean;
  autoProcessing?: boolean;
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
        'relative flex w-full flex-col items-center justify-center pb-6 pt-4 text-center',
        guessedCorrectly === undefined && 'bg-gray-600',
        guessedCorrectly === true && correctColor,
        guessedCorrectly === false && incorrectColor,
      ])}
    >
      <span className=''>{questionText}</span>
      <h2 className={clsx(guessTextClassName, isLeapYear && 'text-blue-400')}>{guessText}</h2>
      {guessedCorrectly !== undefined && <span className='text-xl'>{explainMessage}</span>}
      {autoMode && autoProcessing && (
        <div
          className={clsx(
            'absolute right-2 top-2',
            autoMode && autoProcessing && 'animate-spin ease-in-out'
          )}
        >
          <BiLoaderCircle className='h-6 w-6' />
        </div>
      )}
      {/*
      <button
        className={clsx('absolute bottom-2 right-2', showSettings && 'text-indigo-300')}
        onClick={() => setShowSettings(!showSettings)}
      >
        <MdSettings />
      </button>
      */}
    </div>
  );
};

export default GuessDisplay;
