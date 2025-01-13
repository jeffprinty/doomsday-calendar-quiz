import React, { useState } from 'react';

import { DateTime } from 'luxon';

import { Day, getRandomDateInYear, guessDateFormat } from './common';
import Button from './components/button';
import QuizResults from './components/quiz-results';
import { GuessDisplay } from './components/shared';
import useAnswerHistory from './hooks/use-answer-history';
import useDayOfWeekGuesser from './hooks/use-day-of-week-guesser';
import DayOfWeekGuesser from './modules/day-of-week-guesser';

const GuessDateDoomsdayWithinYear = ({
  dateToGuess,
  getNextDate,
  onIncorrectGuess,
  updateYear,
}: {
  dateToGuess?: DateTime;
  getNextDate: () => DateTime;
  onIncorrectGuess: (dateGuessed: DateTime) => void;
  updateYear: (updatedYear: number) => void;
}) => {
  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers } = useAnswerHistory();
  const { correctDay, daySelected, onDayClick, onNewDayGuess } = useDayOfWeekGuesser();

  const [enableDayClick, setEnableDayClick] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const dateStringToGuess = dateToGuess?.toFormat(guessDateFormat) || '';

  const generateRandomDate = () => {
    const randomDate = getNextDate();
    console.log('TODO, do I need this?', randomDate.toISO());
    setEnableDayClick(true);
    onNewDayGuess();
    onNewQuestion();
  };

  const handleDayClick = (day: Day) => {
    if (!dateToGuess) {
      return;
    }
    const dayShortName = dateToGuess.toFormat('ccc') as Day;
    onDayClick(day, dayShortName);
    const correctDayGuessed = dayShortName === day;
    onAnswer(dateToGuess, correctDayGuessed);
    if (!correctDayGuessed) {
      onIncorrectGuess(dateToGuess);
    }
    setEnableDayClick(false);
  };

  return (
    <div id='page__guess-date-within-year'>
      <div id='quiz__top-bit'>
        <QuizResults answers={pastAnswers} currentGuess={dateStringToGuess} />
      </div>
      <div id='quiz__bottom-bit' className=''>
        <div className='relative'>
          <GuessDisplay
            questionText='What day of the week is:'
            guessText={dateStringToGuess}
            guessedCorrectly={lastAnswerCorrect}
          />
          <button
            className='absolute bottom-2 right-2'
            onClick={() => setShowSettings(!showSettings)}
          >
            Cog
          </button>
        </div>
        <div id='quiz__actions'>
          <DayOfWeekGuesser
            correctDay={correctDay}
            daySelected={daySelected}
            onDayClick={handleDayClick}
          />
          <div className='flex-row items-center justify-center p-2'>
            <Button
              className='my-2 h-16 w-full'
              disabled={enableDayClick}
              onClick={generateRandomDate}
            >
              New Date
            </Button>
          </div>
        </div>
        {showSettings && (
          <YearInput onSubmit={updateYear} initYear={Number(dateToGuess?.toFormat('yyyy'))} />
        )}
      </div>
    </div>
  );
};

const YearInput = ({
  onSubmit,
  initYear,
}: {
  onSubmit: (year: number) => void;
  initYear?: number;
}) => {
  const [year, setYear] = useState(initYear || 2025);

  return (
    <div>
      <input
        type='number'
        className='text-black'
        onChange={({ target: { value } }) => setYear(Number(value))}
        value={year}
      />
      <button onClick={() => onSubmit(year)}>Set Year</button>
    </div>
  );
};

const GuessDateWithinYearWrap = () => {
  const initYear = 2025;
  const startWithTimeAlready = getRandomDateInYear(initYear);
  // TODO: Allow set year
  const [guessingYear, setGuessingYear] = useState(2025);
  const [guessingAgain, setGuessingAgain] = useState(false);

  const [currentDateToGuess, setCurrentDateToGuess] = useState<DateTime>(startWithTimeAlready);
  const [wronglyGuessedDates, setWronglyGuessedDates] = useState<Array<DateTime>>([]);
  const getNextDate = () => {
    if (guessingAgain) {
      // return next item in wrong guesses array
      // get oldest wrong guess
      const [oldestWrongGuess, ...remainingWrongGuesses] = wronglyGuessedDates;
      if (oldestWrongGuess === undefined) {
        // no guesses left, flip switch
        setGuessingAgain(false);
      } else {
        setWronglyGuessedDates(remainingWrongGuesses);
        setCurrentDateToGuess(oldestWrongGuess);
        return oldestWrongGuess;
      }
    }
    const newRandomDate = getRandomDateInYear(guessingYear);
    setCurrentDateToGuess(newRandomDate);
    return newRandomDate;
  };

  const handleIncorrectGuess = (dateGuessed: DateTime) => {
    setWronglyGuessedDates((previous) => [...previous, dateGuessed]);
  };
  return (
    <GuessDateDoomsdayWithinYear
      dateToGuess={currentDateToGuess}
      getNextDate={getNextDate}
      onIncorrectGuess={handleIncorrectGuess}
      updateYear={setGuessingYear}
    />
  );
};

export default GuessDateWithinYearWrap;
