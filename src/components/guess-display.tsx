import clsx from 'clsx';
import { BiLoaderCircle } from 'react-icons/bi';

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
  console.debug('explainMessage', explainMessage);
  const isAnswered = guessedCorrectly !== undefined;

  return (
    <div
      id='quiz__year-to-guess'
      className={clsx([
        className,
        'relative flex w-full flex-col items-center justify-center bg-gradient-to-r pb-3 pt-4 text-center',
        isAnswered && autoMode && 'animate-pulse',
        guessedCorrectly === undefined && 'from-blue-500 to-blue-800',
        guessedCorrectly === true && 'from-green-500 to-green-800',
        guessedCorrectly === false && 'from-red-600 to-orange-600',
      ])}
    >
      <span className=''>{questionText}</span>
      <h2 className={clsx(guessTextClassName, isLeapYear && 'text-blue-400')}>{guessText}</h2>
      <div className={clsx('mt-1 text-xl', isAnswered ? 'visible' : 'invisible')}>
        {explainCorrect}
      </div>
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
