import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime } from 'luxon';

import { mnemonics } from '../mnemonics';
import Button from './button';
import { GuessDisplay } from './shared';

const makeButtonClassName = (bgClassName: string) =>
  `${bgClassName} hover:${bgClassName} focus:${bgClassName} active:${bgClassName} disabled:${bgClassName}`;

export const OffsetGuesser = ({
  guessingDate,
  onAnswer,
  indicate,
}: {
  guessingDate: DateTime;
  onAnswer: (correct: boolean) => void;
  indicate?: boolean;
}) => {
  const [selectedOffset, setSelectedOffset] = useState<number | undefined>();
  const [answerIsCorrect, setAnswerIsCorrect] = useState<boolean | undefined>();
  const isAnswered = answerIsCorrect !== undefined;
  const showDay = false;

  const mnemonicForMonth = mnemonics.find(({ monthNumber }) => monthNumber === guessingDate.month);
  console.log('mnemonicForMonth', mnemonicForMonth);
  if (!mnemonicForMonth) {
    return <></>;
  }
  const doomsdayInMonth = DateTime.fromObject({
    year: guessingDate.year,
    month: guessingDate.month,
    day: mnemonicForMonth.common,
  });
  const fullOffset = guessingDate.day - doomsdayInMonth.day;
  const correctOffset = fullOffset % 7;

  // there is almost certainly a sexier way to do this math
  const alternateOffset = correctOffset > 0 ? correctOffset - 7 : 7 + correctOffset;

  const onClick = (clickedOffset: number) => {
    const guessIsCorrect = clickedOffset === correctOffset;
    const alternateCorrect = clickedOffset === alternateOffset;
    setAnswerIsCorrect(guessIsCorrect || alternateCorrect);
    onAnswer(guessIsCorrect || alternateCorrect);
    setSelectedOffset(clickedOffset);
  };

  return (
    <div id='offset-guesser'>
      <GuessDisplay
        className={clsx(indicate && 'animate-pulse', 'mb-4')}
        questionText={answerIsCorrect ? 'Correct! The offset for' : 'What is the day offset for:'}
        guessText={guessingDate.toFormat('MMMM dd')}
        guessedCorrectly={answerIsCorrect}
        isLeapYear={guessingDate.isInLeapYear}
        explainCorrect={
          <>
            is <strong>{correctOffset}</strong>
            {correctOffset !== 0 && (
              <>
                &nbsp;or&nbsp;
                <strong>{alternateOffset}</strong>
              </>
            )}
          </>
        }
      />
      <div
        id='guess-weekday-for-date'
        className='flex w-full flex-row items-center justify-between'
      >
        {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((offset) => (
          <Button
            className={clsx([
              'h-20 px-3 text-center',
              isAnswered && [
                correctOffset === offset && makeButtonClassName('bg-green-600'),
                alternateOffset === offset && makeButtonClassName('bg-green-800'),
                answerIsCorrect === false &&
                  selectedOffset === offset &&
                  makeButtonClassName('bg-red-900'),
                // TODO: Show border on selected
              ],
            ])}
            key={offset}
            onClick={() => onClick(offset)}
          >
            {offset}
            {showDay && <div className='text-xs'>day</div>}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default OffsetGuesser;

// borf
export const AwareButton = ({
  alternateOffset,
  correctOffset,
  isAnswered,
  offset,
  onClick,
  selectedOffset,
}: {
  alternateOffset: number;
  correctOffset: number;
  isAnswered: boolean;
  offset: number;
  onClick: (offset: number) => void;
  selectedOffset?: number;
}) => {
  const thisIsSelected = offset === selectedOffset;
  const answerIsCorrect = thisIsSelected && selectedOffset === correctOffset;
  const answerIsAlternateCorrect = offset === alternateOffset;
  const answerIsWrong = thisIsSelected && !answerIsCorrect && !answerIsAlternateCorrect;
  return (
    <Button
      className={clsx([
        'h-20 px-3 text-center',
        isAnswered && [
          answerIsCorrect && makeButtonClassName('bg-green-600'),
          answerIsAlternateCorrect && makeButtonClassName('bg-green-800'),
          answerIsWrong && makeButtonClassName('bg-red-900'),
          // TODO: Show border on selected
        ],
      ])}
      key={offset}
      onClick={() => onClick(offset)}
    >
      {offset}
    </Button>
  );
};
