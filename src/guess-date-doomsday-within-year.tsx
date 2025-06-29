import { useState } from 'react';

import clsx from 'clsx';
import { DateTime } from 'luxon';
import { MdBolt, MdSettings } from 'react-icons/md';

import { guessDateFormat } from './common';
import { PageDescribe } from './components/page-describe';
import QuizResults from './components/quiz-results';
import { GuessActions, GuessDisplay } from './components/shared';
import useAnswerHistory from './hooks/use-answer-history';
import { Weekday } from './math/weekdays';
import { getRandomDateInYear } from './math/year';
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

  const handleGuess = (answer: Weekday, isCorrect: boolean) => {
    onAnswer(dateToGuess, isCorrect);
    if (!isCorrect) {
      onIncorrectGuess(dateToGuess);
    }
    setEnableDayClick(false);
    if (autoNext) {
      setNextGuessIncoming(true);
      if (isCorrect) {
        setTimeout(() => {
          generateRandomDate();
        }, 2000);
      }
    }
  };

  return (
    <div
      className='md:min-h-1/2 flex w-full flex-col justify-between md:h-1/2 md:justify-start'
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
                autoNext && nextGuessIncoming && 'animate-spin'
              )}
            >
              <MdBolt className='h-6 w-6' />
            </div>
          )}
          <button
            className={clsx('absolute bottom-2 right-2', showSettings && 'text-indigo-300')}
            onClick={() => setShowSettings(!showSettings)}
          >
            <MdSettings />
          </button>
        </div>
        {showSettings && (
          <YearInput onSubmit={updateYear} initYear={Number(dateToGuess?.toFormat('yyyy'))} />
        )}
      </div>
      <div id='quiz__bottom-bit' className='h-72'>
        <div className='pt-3' id='quiz__actions'>
          <DayOfWeekGuesserSelfContained
            correctDay={dateToGuess.toFormat('ccc') as Weekday}
            key={`date_${startTime}`}
            onGuess={handleGuess}
          />
          <GuessActions
            disabled={enableDayClick}
            onClick={generateRandomDate}
            autoEnabled={autoNext}
            toggleAuto={() => setAutoNext(!autoNext)}
          />
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

const GuessDateWithinYearWrap = ({ year }: { year?: number }) => {
  const initYear = year || DateTime.now().year;
  const startWithTimeAlready = getRandomDateInYear(initYear);
  const [guessingYear, setGuessingYear] = useState(initYear);
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
    <>
      <PageDescribe>
        Guess a given date within the current year. Use this once you&apos;ve committed the doomsday
        for {guessingYear} to memory.
      </PageDescribe>
      <GuessDateDoomsdayWithinYear
        dateToGuess={currentDateToGuess}
        getNextDate={getNextDate}
        onIncorrectGuess={handleIncorrectGuess}
        updateYear={setGuessingYear}
      />
    </>
  );
};

export default GuessDateWithinYearWrap;
