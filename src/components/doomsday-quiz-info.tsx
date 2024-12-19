import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime, Interval } from 'luxon';

import { correctColor, Day, getRandomYear, incorrectColor, mnemonics, PastAnswer } from '../common';
import Button from './button';
import { DayOfWeekGuesser } from './doomsday-quiz';
import Hints from './hints';
import QuizResults from './quiz-results';
import { GuessDisplay, MathStepHelper } from './shared';

const DoomsdayInfo = () => {
  const initYear = getRandomYear();

  const [showHints, setShowHints] = useState(false);
  const [showResults, setShowResults] = useState(true);

  // TODO: Allow set year
  const [guessingYear, setGuessingYear] = useState(initYear);

  const [startTime, setStartTime] = useState<DateTime>(DateTime.now());
  const [pastAnswers, setPastAnswers] = useState<Array<PastAnswer>>([]);

  const [correctDay, setCorrectDay] = useState<Day>();
  const [daySelected, setSelectedDay] = useState<Day>();

  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();

  const doomsdayOnYear = DateTime.fromObject({
    year: guessingYear,
    month: 4,
    day: 4
  });

  const correctDoomsday = doomsdayOnYear.toFormat('ccc') as Day;

  const getNewYear = () => {
    const randomYearAsInt = getRandomYear();
    setLastAnswerCorrect(undefined);
    setGuessingYear(randomYearAsInt);
    setCorrectDay(undefined);
    setSelectedDay(undefined);
    setStartTime(DateTime.now());
  };

  const handleDayGuess = (guess: Day) => {
    setSelectedDay(guess);
    setCorrectDay(correctDoomsday);
    const dayGuessedCorrectly = guess === correctDoomsday;
    setLastAnswerCorrect(dayGuessedCorrectly);

    if (startTime) {
      const interval = Interval.fromDateTimes(startTime, DateTime.now());
      const intervalInSeconds = interval.length('seconds');
      if (intervalInSeconds) {
        setPastAnswers((previous) => [
          ...previous,
          [intervalInSeconds, dayGuessedCorrectly, doomsdayOnYear]
        ]);
      }
    }
  };

  return (
    <div>
      <GuessDisplay
        questionText='What is the doomsday for:'
        guessText={guessingYear}
        guessedCorrectly={lastAnswerCorrect}
        guessTextClassName='text-6xl'
      />
      <div
        id='quiz__year-to-guess'
        className={clsx([
          'my-4 flex w-full flex-col items-center justify-center pb-6 pt-4 text-center',
          lastAnswerCorrect === undefined && 'bg-gray-600',
          lastAnswerCorrect === true && correctColor,
          lastAnswerCorrect === false && incorrectColor
        ])}
      >
        <span className=''>What is the doomsday for:</span>
        <h2 className='text-6xl'>{guessingYear}</h2>
      </div>
      <MathStepHelper key={guessingYear} />
      <DayOfWeekGuesser
        key={`week_${guessingYear}`}
        correctDay={correctDay}
        daySelected={daySelected}
        onDayClick={handleDayGuess}
      />
      <Button onClick={getNewYear} className='my-2 h-16 w-full'>
        Random Year
      </Button>
      <Button onClick={() => setShowHints((previous) => !previous)}>
        {showHints ? 'hide' : 'show'} hints
      </Button>
      <Button onClick={() => setShowResults((previous) => !previous)}>
        {showResults ? 'hide' : 'show'} results
      </Button>
      {showHints && <Hints key={`hints_${guessingYear}`} year={guessingYear} />}
      {showResults && (
        <QuizResults
          answers={pastAnswers}
          currentGuess={guessingYear.toString()}
          dateFormat='yyyy'
        />
      )}
      <div className='explainer hidden'>
        {mnemonics.map(({ monthName, common }, index) => {
          const hackyMonthNumber = index + 1;
          return (
            <div key={monthName} className='flex flex-row items-center justify-between text-center'>
              {monthName}
              <div className=''>
                {hackyMonthNumber}/{common}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoomsdayInfo;
