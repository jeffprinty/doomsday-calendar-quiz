import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime } from 'luxon';

import {
  Day,
  getRandomDateInYear,
  getRandomYear,
  guessDateFormat,
  mnemonics,
  PastAnswer
} from './common';
import Button from './components/button';
import QuizResults from './components/quiz-results';
import { DayOfWeekGuesser, GuessDisplay } from './components/shared';
import YearGuessingHelper from './components/year-guessing-helper';

const GuessOnlyDate = () => {
  const initYear = getRandomYear();
  const initRandomDateWithinYear = getRandomDateInYear(2025);

  const [guessingDate, setGuessingDate] = useState(initRandomDateWithinYear);

  const [startTime, setStartTime] = useState<DateTime>(DateTime.now());

  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();

  const doomsdayOnYear = DateTime.fromObject({
    year: guessingDate.get('year'),
    month: 4,
    day: 4
  });

  const correctDoomsday = doomsdayOnYear.toFormat('ccc') as Day;

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
  console.log('fullOffset', fullOffset);
  const correctOffset = fullOffset % 7;
  console.log('correctOffset', correctOffset);

  const getNewGuess = () => {
    setGuessingDate(getRandomDateInYear(2025));
    setLastAnswerCorrect(undefined);
  };

  const handleGuess = (clickedOffset: number) => {
    const guessIsCorrect = clickedOffset === correctOffset;
    console.log('invert', clickedOffset, correctOffset, 7 - clickedOffset);
    const alternateCorrect = Math.abs(correctOffset - clickedOffset) === 7;
    console.log('alternateCorrect', alternateCorrect);
    setLastAnswerCorrect(guessIsCorrect || alternateCorrect);
  };

  const tuples = [
    [-1, 6], // 7 + -1 | 7 - 6
    [-2, 5], // 7 + -2 | 7 - 5
    [-3, 4],
    [-4, 3],
    [-5, 2],
    [-6, 1]
  ];

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
              &nbsp;or&nbsp;
              <strong>
                {/* there is almost certainly a sexier way to do this math */}
                {correctOffset > 0 ? 7 - correctOffset : 7 + correctOffset}
              </strong>
            </>
          ) : undefined
        }
      />
      <div id='guess-weekday-for-date flex flex-row'>
        {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((offset) => (
          <Button
            className={clsx([
              'mx-1 h-24 px-2 text-center'
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
