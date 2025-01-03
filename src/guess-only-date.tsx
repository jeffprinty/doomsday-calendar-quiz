import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime } from 'luxon';

import { getRandomDateInYear, mnemonics } from './common';
import Button from './components/button';
import { GuessDisplay } from './components/shared';

const GuessOnlyDate = () => {
  const initRandomDateWithinYear = getRandomDateInYear(2025);
  // const initRandomDateWithinYear = DateTime.fromObject({
  //   year: 2025,
  //   month: 4,
  //   day: 4
  // });

  const [guessingDate, setGuessingDate] = useState(initRandomDateWithinYear);

  const [startTime, setStartTime] = useState<DateTime>(DateTime.now());

  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();

  const mnemonicForMonth = mnemonics.find(({ monthNumber }) => monthNumber === guessingDate.month);
  console.log('mnemonicForMonth', mnemonicForMonth);
  if (!mnemonicForMonth) {
    return <></>;
  }
  const doomsdayInMonth = DateTime.fromObject({
    year: guessingDate.year,
    month: guessingDate.month,
    day: mnemonicForMonth.common
  });
  const fullOffset = guessingDate.day - doomsdayInMonth.day;
  const correctOffset = fullOffset % 7;

  // there is almost certainly a sexier way to do this math
  const alternateCorrectOffset = correctOffset > 0 ? correctOffset - 7 : 7 + correctOffset;

  const getNewGuess = () => {
    setGuessingDate(getRandomDateInYear(2025));
    setLastAnswerCorrect(undefined);
    setStartTime(DateTime.now());
  };

  const handleGuess = (clickedOffset: number) => {
    const guessIsCorrect = clickedOffset === correctOffset;
    const alternateCorrect = clickedOffset === alternateCorrectOffset;
    setLastAnswerCorrect(guessIsCorrect || alternateCorrect);
  };

  return (
    <div id='page__guess-only-date' className='w-full md:w-2/3 lg:w-96'>
      <GuessDisplay
        questionText={lastAnswerCorrect ? 'Correct! The offset for' : 'What is the day offset for:'}
        guessText={guessingDate.toFormat('MMMM dd')}
        guessedCorrectly={lastAnswerCorrect}
        isLeapYear={guessingDate.isInLeapYear}
        subText={
          lastAnswerCorrect ? (
            <>
              is <strong>{correctOffset}</strong>
              {correctOffset !== 0 && (
                <>
                  &nbsp;or&nbsp;
                  <strong>{alternateCorrectOffset}</strong>
                </>
              )}
            </>
          ) : undefined
        }
      />
      <div
        id='guess-weekday-for-date'
        className='flex w-full flex-row items-center justify-between'
      >
        {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((offset) => (
          <Button
            className={clsx([
              'mx-1 h-20 px-3 text-center'
              // incorrectSelection && thisDayWasSelected && 'disabled:bg-red-900',
              // thisDayIsCorrect && 'active:text-black disabled:bg-green-600 disabled:text-black'
            ])}
            key={offset}
            onClick={() => handleGuess(offset)}
          >
            {offset}
          </Button>
        ))}
      </div>
      <Button onClick={getNewGuess} className='my-2 h-16 w-full'>
        Random Date
      </Button>
    </div>
  );
};

export default GuessOnlyDate;
