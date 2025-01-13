import React, { useState } from 'react';

import { DateTime } from 'luxon';

import { Day, getRandomDateInYear, getRandomYear, guessDateFormat } from './common';
import Button from './components/button';
import QuizResults from './components/quiz-results';
import { DayOfWeekGuesser, GuessDisplay } from './components/shared';
import YearGuessingHelper from './components/year-guessing-helper';
import useAnswerHistory from './hooks/use-answer-history';

const GuessFullDateV1 = () => {
  const initYear = getRandomYear();
  const initRandomDateWithinYear = getRandomDateInYear(initYear);

  const [guessingDate, setGuessingDate] = useState(initRandomDateWithinYear);

  const guessingYear = Number(guessingDate.toFormat('yyyy'));

  const [showResults, setShowResults] = useState(true);
  const [showYearHints, setShowYearHints] = useState(false);

  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime } = useAnswerHistory();

  const [correctDoomsdayForYear, setCorrectDoomsdayForYear] = useState<Day>();
  const [selectedDoomsdayForYear, setSelectedDoomsdayForYear] = useState<Day>();

  const [correctWeekdayForDate, setCorrectWeekdayForDate] = useState<Day>();
  const [selectedWeekdayForDate, setSelectedWeekdayForDate] = useState<Day>();

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
    onNewQuestion();

    setCorrectDoomsdayForYear(undefined);
    setSelectedDoomsdayForYear(undefined);

    setCorrectWeekdayForDate(undefined);
    setSelectedWeekdayForDate(undefined);

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
    onAnswer(doomsdayOnYear, dayWeekdayGuessedCorrectly);
    setShowAllAnswers(true);
  };

  return (
    <div id='page__guess-full-date' className='w-full'>
      <GuessDisplay
        questionText={lastAnswerCorrect ? 'Correct! The doomsday for' : 'What is the doomsday for:'}
        guessText={guessingDate.toFormat(guessDateFormat)}
        guessedCorrectly={lastAnswerCorrect}
        isLeapYear={guessingDate.isInLeapYear}
        explainCorrect={
          <>
            is <strong>{guessingDate.toFormat('cccc')}</strong>
          </>
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

export default GuessFullDateV1;
