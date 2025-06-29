import { ReactNode, useEffect, useState } from 'react';

import clsx from 'clsx';

import { correctColor, incorrectColor, step1, step2, step3, step4, step5, Steps } from '../common';
import Button from './button';

export const PageContainer = ({ children, id }: { children: React.ReactNode; id: string }) => {
  return (
    <section
      id={id}
      className='container flex h-full w-full flex-col items-center justify-start border border-tertiary bg-secondary lg:w-2/3'
    >
      {children}
    </section>
  );
};

export const GuesserStep = ({
  children,
  description,
  show = true,
}: {
  children: React.ReactNode;
  description?: string | React.ReactNode;
  show?: boolean;
}) => {
  if (!show) {
    return <></>;
  }
  return (
    <>
      {!!description && <span className='hidden'>{description}</span>}
      {children}
    </>
  );
};

export const GuessDisplay = ({
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

export const YearStepHelperHorizontal = () => {
  const [inputHash, setInputHash] = useState({
    stepOne: '',
    stepTwo: '',
    stepThree: '',
    stepFour: '',
    stepFive: '',
    stepSix: '',
  });
  const rememberRow: Array<{
    id: Steps;
    stepClassName: string;
    stepText: string;
  }> = [
    {
      id: 'stepOne',
      stepClassName: step1,
      stepText: 'How many twelves?',
    },
    {
      id: 'stepTwo',
      stepClassName: step2,
      stepText: 'Minus nearest twelve',
    },
    {
      id: 'stepThree',
      stepClassName: step3,
      stepText: 'How many fours?',
    },
    {
      id: 'stepFour',
      stepClassName: step4,
      stepText: 'Remember anchor day.',
    },
    {
      id: 'stepFive',
      stepClassName: step5,
      stepText: 'Add it up.',
    },
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
                  [id]: Number(value),
                }))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export function GuesserButton({
  isAnswered,
  isCorrect,
  className,
  children,
  onClick,
  selectedCorrect = 'bg-green-600',
  selectedIncorrect = 'bg-red-900',
  ...properties
}: {
  isAnswered: boolean | undefined;
  isCorrect: boolean | undefined;
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  selectedCorrect?: string;
  selectedIncorrect?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  let correctnessClassName = '';
  if (isAnswered) {
    const buttonBgColor = isCorrect ? selectedCorrect : selectedIncorrect;
    correctnessClassName = `${buttonBgColor} hover:${buttonBgColor} focus:${buttonBgColor} active:${buttonBgColor} disabled:${buttonBgColor}`;
  }
  return (
    <Button
      type='button'
      className={clsx(['h-20 px-3 text-center', isAnswered && correctnessClassName, className])}
      onClick={onClick}
      {...properties}
    >
      {children}
    </Button>
  );
}

export function GuessActions({
  btnLabel,
  className,
  disabled,
  onClick,
  toggleAuto,
  autoEnabled,
}: {
  btnLabel?: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  toggleAuto: (selected: boolean) => void;
  autoEnabled: boolean;
}) {
  return (
    <div
      className={clsx(
        'row grid w-full grid-cols-3 flex-row items-center justify-center gap-3 pt-2',
        className
      )}
    >
      <Button
        className={clsx('col-span-1 my-2 h-16 w-full')}
        onClick={() => toggleAuto(!autoEnabled)}
        selected={autoEnabled}
      >
        Auto
      </Button>
      <Button className='col-span-2 my-2 h-16 w-full px-1' disabled={disabled} onClick={onClick}>
        {btnLabel || <>New Date</>}
      </Button>
    </div>
  );
}

export const StepDisplay = ({
  className,
  children,
  show = true,
}: {
  className?: string;
  children: React.ReactNode | Array<React.ReactNode> | string;
  show?: boolean;
}) => {
  if (!show) {
    return <></>;
  }
  return <div className={clsx('step-display', className)}>{children}</div>;
};

export const Hint = ({ children }: { children: ReactNode | Array<ReactNode> }) => {
  const [showHint, setShowHint] = useState(false);
  return (
    <div className='hint'>
      <Button onClick={() => setShowHint(!showHint)}>{showHint ? 'Hide' : 'Show'} Hint</Button>
      {showHint && <div className=''>{children}</div>}
    </div>
  );
};

export const StepAdvanced = ({
  children,
  className,
  show = true,
  step,
  stepId,
}: {
  children: ReactNode;
  className?: string;
  show?: boolean;
  step: number;
  stepId: number;
}) => {
  if (!show || step > stepId) {
    return <></>;
  }
  return <div className={clsx(className, 'step')}>{children}</div>;
};

export const Revealable = ({
  children,
  className,
  forceShow = false,
}: {
  children: ReactNode;
  className?: string;
  forceShow?: boolean;
}) => {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!revealed && forceShow) {
      setRevealed(true);
    }
  }, [forceShow, revealed]);
  return (
    <button
      className={clsx(className, 'revealable', !revealed && 'blur-md')}
      onClick={() => setRevealed(!revealed)}
    >
      {children}
    </button>
  );
};
