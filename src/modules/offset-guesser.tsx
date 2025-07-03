import { useState } from 'react';

import clsx from 'clsx';
import { Dayjs } from 'dayjs';

import Button from '../components/button';
import DoomsdayDifference from '../components/equations/doomsday-difference';
import GuessDisplay from '../components/guess-display';
import { getDoomsdayWithinMonth } from '../math/dates';
import { mnemonics } from '../math/month-doomsdays';

const makeButtonClassName = (bgClassName: string) =>
  `${bgClassName} hover:${bgClassName} focus:${bgClassName} active:${bgClassName} disabled:${bgClassName}`;

export const OffsetGuesser = ({
  autoMode,
  autoProcessing,
  disableOnAnswer,
  guessingDate,
  onAnswer,
}: {
  autoMode?: boolean;
  autoProcessing?: boolean;
  disableOnAnswer?: boolean;
  guessingDate: Dayjs;
  onAnswer: (correct: boolean) => void;
}) => {
  const [selectedOffset, setSelectedOffset] = useState<number | undefined>();
  const [answerIsCorrect, setAnswerIsCorrect] = useState<boolean | undefined>();
  const isAnswered = answerIsCorrect !== undefined;
  const showDay = false;

  const mnemonicForMonth = mnemonics.find(
    ({ monthNumber }) => monthNumber === guessingDate.month() + 1
  );
  if (!mnemonicForMonth) {
    return <></>;
  }
  const doomsdayInMonth = getDoomsdayWithinMonth(guessingDate, mnemonicForMonth.common);
  const fullOffset = guessingDate.date() - doomsdayInMonth.date();
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

  const showOldOffset = false;

  const oldOffsetExplainer = (
    <>
      is <strong>{correctOffset}</strong>
      {correctOffset !== 0 && (
        <>
          &nbsp;or&nbsp;
          <strong>{alternateOffset}</strong>
        </>
      )}
    </>
  );

  return (
    <div id='offset-guesser'>
      <GuessDisplay
        autoMode={autoMode}
        autoProcessing={autoProcessing}
        className={clsx('mb-2 md:mb-4')}
        questionText={answerIsCorrect ? 'Correct! The offset for' : 'What is the day offset for:'}
        guessText={guessingDate.format('MMMM D')}
        guessedCorrectly={answerIsCorrect}
        isLeapYear={guessingDate.isLeapYear()}
        explainCorrect={
          showOldOffset ? (
            oldOffsetExplainer
          ) : (
            <DoomsdayDifference
              className='rounded-xl bg-black bg-opacity-70 px-3 py-1 text-sm'
              isoDate={guessingDate.toISOString()}
            />
          )
        }
      />
      <div
        id='guess-weekday-for-date'
        className='mx-6 flex flex-col items-center justify-between md:mx-0 md:w-full md:flex-row'
      >
        {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((offset) => (
          <Button
            className={clsx([
              'mb-1 w-full !py-1 px-2 text-center text-sm md:mb-0 md:h-20 md:w-auto md:px-3 md:py-2 md:text-lg',
              isAnswered && [
                correctOffset === offset && makeButtonClassName('!bg-green-600'),
                alternateOffset === offset && makeButtonClassName('!bg-green-800'),
                answerIsCorrect === false &&
                  selectedOffset === offset &&
                  makeButtonClassName('!bg-red-900'),
              ],
            ])}
            disabled={disableOnAnswer && isAnswered}
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
