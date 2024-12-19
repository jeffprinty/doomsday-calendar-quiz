import React from 'react';

import clsx from 'clsx';

import { correctColor, incorrectColor } from '../common';

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
