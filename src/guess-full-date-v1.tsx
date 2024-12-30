import React, { useState } from 'react';

import { DateTime, Interval } from 'luxon';

import { Day, getRandomDateInYear, getRandomYear, guessDateFormat, PastAnswer } from './common';
import Button from './components/button';
import QuizResults from './components/quiz-results';
import { DayOfWeekGuesser, GuessDisplay } from './components/shared';
import YearGuessingHelper from './components/year-guessing-helper';

const GuessFullDate = () => {
  const initYear = getRandomYear();
  const initRandomDateWithinYear = getRandomDateInYear(initYear);

  const [guessingDate, setGuessingDate] = useState(initRandomDateWithinYear);

  const guessingYear = Number(guessingDate.toFormat('yyyy'));

  const [showResults, setShowResults] = useState(true);
  const [showYearHints, setShowYearHints] = useState(false);

  const [startTime, setStartTime] = useState<DateTime>(DateTime.now());
  const [pastAnswers, setPastAnswers] = useState<Array<PastAnswer>>([]);

  const [correctDoomsdayForYear, setCorrectDoomsdayForYear] = useState<Day>();
  const [selectedDoomsdayForYear, setSelectedDoomsdayForYear] = useState<Day>();

  const [correctWeekdayForDate, setCorrectWeekdayForDate] = useState<Day>();
  const [selectedWeekdayForDate, setSelectedWeekdayForDate] = useState<Day>();

  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();

  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const doomsdayOnYear = DateTime.fromObject({
    year: guessingDate.get('year'),
    month: 4,
    day: 4,
  });

  const correctDoomsday = doomsdayOnYear.toFormat('ccc') as Day;

  const getNewGuess = () => {
    const randomYearAsInt = getRandomYear();
    const randomDateWithinYear = getRandomDateInYear(randomYearAsInt);
    setGuessingDate(randomDateWithinYear);
    setLastAnswerCorrect(undefined);

    setCorrectDoomsdayForYear(undefined);
    setSelectedDoomsdayForYear(undefined);

    setCorrectWeekdayForDate(undefined);
    setSelectedWeekdayForDate(undefined);

    setStartTime(DateTime.now());
    setShowYearHints(false);
    setShowAllAnswers(false);
  };

  const handleYearDoomsdayGuess = (guess: Day) => {
    setSelectedDoomsdayForYear(guess);
    setCorrectDoomsdayForYear(correctDoomsday);
    setShowAllAnswers(true);
  };

  const handleDateWeekdayGuess = (guess: Day) => {
    const correctWeekdayForDate = guessingDate.toFormat('ccc') as Day;
    setCorrectWeekdayForDate(correctWeekdayForDate);

    const dayWeekdayGuessedCorrectly = guess === correctWeekdayForDate;
    setLastAnswerCorrect(dayWeekdayGuessedCorrectly);

    setShowAllAnswers(true);

    if (startTime) {
      const interval = Interval.fromDateTimes(startTime, DateTime.now());
      const intervalInSeconds = interval.length('seconds');
      if (intervalInSeconds) {
        setPastAnswers((previous) => [
          ...previous,
          [intervalInSeconds, dayWeekdayGuessedCorrectly, doomsdayOnYear],
        ]);
      }
    }
  };

  return (
    <div id='page__guess-full-date' className='w-full md:w-2/3 lg:w-96'>
      <GuessDisplay
        questionText={lastAnswerCorrect ? 'Correct! The doomsday for' : 'What is the doomsday for:'}
        guessText={guessingDate.toFormat(guessDateFormat)}
        guessedCorrectly={lastAnswerCorrect}
        isLeapYear={guessingDate.isInLeapYear}
        subText={
          lastAnswerCorrect ? (
            <>
              is <strong>{guessingDate.toFormat('cccc')}</strong>
            </>
          ) : undefined
        }
      />
      <div id='guess-doomsday-for-year'>
        <YearGuessingHelper
          key={`hints_${guessingYear}`}
          year={guessingYear}
          showAnswers={showAllAnswers}
        />
        <div className='text-center'>
          <span>Doomsday for Year</span>&nbsp; (
          <button
            onClick={() => setShowYearHints((previous) => !previous)}
            className='text-blue-400'
          >
            {showYearHints ? 'hide' : 'show'} hints
          </button>
          )
        </div>
        <DayOfWeekGuesser
          key={`year_${startTime}`}
          correctDay={correctDoomsdayForYear}
          daySelected={selectedDoomsdayForYear}
          onDayClick={handleYearDoomsdayGuess}
          disabled={selectedDoomsdayForYear !== undefined}
        />
      </div>
      <div id='guess-weekday-for-date'>
        <div className='text-center'>Doomsday for Date</div>
        <DayOfWeekGuesser
          key={`date_${startTime}`}
          correctDay={correctWeekdayForDate}
          daySelected={selectedWeekdayForDate}
          onDayClick={handleDateWeekdayGuess}
          disabled={selectedDoomsdayForYear === undefined}
        />
      </div>
      <Button onClick={getNewGuess} className='my-2 h-16 w-full'>
        Random Date
      </Button>
      <Button onClick={() => setShowResults((previous) => !previous)}>
        {showResults ? 'hide' : 'show'} results
      </Button>
      {showResults && <QuizResults answers={pastAnswers} currentGuess={guessingDate.toString()} />}
    </div>
  );
};

export default GuessFullDate;
