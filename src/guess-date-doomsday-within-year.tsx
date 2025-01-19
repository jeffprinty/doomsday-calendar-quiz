import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime } from 'luxon';
import { MdBolt } from 'react-icons/md';

import { Day, getRandomDateInYear, guessDateFormat } from './common';
import Button from './components/button';
import QuizResults from './components/quiz-results';
import { GuessDisplay } from './components/shared';
import useAnswerHistory from './hooks/use-answer-history';
import { DayOfWeekGuesserSelfContained } from './modules/day-of-week-guesser';

const GuessDateDoomsdayWithinYear = ({
  dateToGuess,
  getNextDate,
  onIncorrectGuess,
  updateYear,
}: {
  dateToGuess: DateTime;
  getNextDate: () => DateTime;
  onIncorrectGuess: (dateGuessed: DateTime) => void;
  updateYear: (updatedYear: number) => void;
}) => {
  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime } = useAnswerHistory();

  const [enableDayClick, setEnableDayClick] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  const [nextGuessIncoming, setNextGuessIncoming] = useState(false);

  const dateStringToGuess = dateToGuess?.toFormat(guessDateFormat) || '';

  const generateRandomDate = () => {
    const randomDate = getNextDate();
    console.log('TODO, do I need this?', randomDate.toISO());
    setEnableDayClick(true);
    setNextGuessIncoming(false);
    onNewQuestion();
  };

  const handleGuess = (answer: Day, isCorrect: boolean) => {
    onAnswer(dateToGuess, isCorrect);
    if (!isCorrect) {
      onIncorrectGuess(dateToGuess);
    }
    setEnableDayClick(false);
    if (autoNext) {
      setNextGuessIncoming(true);
      setTimeout(() => {
        generateRandomDate();
      }, 1000);
    }
  };

  return (
    <div
      className='md:min-h-1/2 flex h-dvh min-h-dvh flex-col justify-between md:h-1/2'
      id='page__guess-date-within-year'
    >
      <div className='' id='quiz__top-bit'>
        <QuizResults answers={pastAnswers} currentGuess={dateStringToGuess} />
        <div className='relative'>
          <GuessDisplay
            explainIncorrect={`is on ${dateToGuess.toFormat('cccc')}`}
            questionText='What day of the week is:'
            guessText={dateStringToGuess}
            guessedCorrectly={lastAnswerCorrect}
          />
          {autoNext && (
            <div
              className={clsx(
                'absolute right-2 top-2',
                autoNext && nextGuessIncoming && 'animate-spin duration-150'
              )}
            >
              <MdBolt className='h-6 w-6' />
            </div>
          )}
          <button
            className='absolute bottom-2 right-2'
            onClick={() => setShowSettings(!showSettings)}
          >
            Cog
          </button>
        </div>
        {showSettings && (
          <YearInput onSubmit={updateYear} initYear={Number(dateToGuess?.toFormat('yyyy'))} />
        )}
      </div>
      <div id='quiz__bottom-bit' className='h-72'>
        <div className='pt-3' id='quiz__actions'>
          <DayOfWeekGuesserSelfContained
            correctDay={dateToGuess.toFormat('ccc') as Day}
            key={`date_${startTime}`}
            onGuess={handleGuess}
          />
          <div className='row grid grid-cols-3 flex-row items-center justify-center gap-3 p-2'>
            <Button
              className='col-span-2 my-2 h-16 w-full px-1'
              disabled={enableDayClick}
              onClick={generateRandomDate}
            >
              New Date
            </Button>
            <Button
              className={clsx('col-span-1 my-2 h-16 w-full')}
              onClick={() => setAutoNext(!autoNext)}
              selected={autoNext}
            >
              Auto
            </Button>
          </div>
        </div>
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
