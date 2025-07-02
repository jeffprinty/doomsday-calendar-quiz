import { useState } from 'react';

import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { BiCog, BiHelpCircle } from 'react-icons/bi';

import { timeoutMs } from '../common';
import DoomsdayDifference from '../components/equations/doomsday-difference';
import GuessDisplay from '../components/guess-display';
import { PageDescribe } from '../components/page-describe';
import QuizResults from '../components/quiz-results';
import { GuessActions } from '../components/shared';
import useAnswerHistory from '../hooks/use-answer-history';
import {
  formatDayjsGuessDate,
  getDayjsRandomDateInYear,
  getFullWeekday,
  getWeekdayForDate,
} from '../math/dates';
import { Weekday } from '../math/weekdays';
import { GuessPayload } from '../modules/module.types';
import WeekdayGuesser from '../modules/weekday-guesser';

const GuessDateDoomsdayWithinYear = ({
  dateToGuess,
  getNextDate,
  onIncorrectGuess,
  updateYear,
}: {
  dateToGuess: Dayjs;
  getNextDate: () => Dayjs;
  onIncorrectGuess: (dateGuessed: Dayjs) => void;
  updateYear: (updatedYear: number) => void;
}) => {
  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime } = useAnswerHistory();

  const [enableDayClick, setEnableDayClick] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  const [nextGuessIncoming, setNextGuessIncoming] = useState(false);

  const dateStringToGuess = formatDayjsGuessDate(dateToGuess);

  const generateRandomDate = () => {
    getNextDate();
    setEnableDayClick(true);
    setNextGuessIncoming(false);
    onNewQuestion();
  };

  const handleGuess = ({ isCorrect }: GuessPayload<Weekday>) => {
    onAnswer({ isCorrect, answer: dateToGuess });
    if (!isCorrect) {
      onIncorrectGuess(dateToGuess);
    }
    setEnableDayClick(false);
    if (autoNext) {
      if (isCorrect) {
        setNextGuessIncoming(true);
        setTimeout(() => {
          generateRandomDate();
        }, timeoutMs);
      }
    }
  };

  return (
    <div
      className='md:min-h-1/2 flex w-full flex-col justify-between md:h-1/2 md:justify-start'
      id='page__guess-date-within-year'
    >
      <div className='' id='quiz__top-bit'>
        <QuizResults answers={pastAnswers} currentGuess={dateStringToGuess} dateFormat='MMM D' />
        <div className='relative'>
          <GuessDisplay
            autoMode={autoNext}
            autoProcessing={nextGuessIncoming}
            explainIncorrect={`is on ${getFullWeekday(dateToGuess)}`}
            questionText='What day of the week is:'
            guessText={dateStringToGuess}
            guessedCorrectly={lastAnswerCorrect}
          />
          <div className='absolute bottom-3 right-1 flex w-16 flex-row justify-around'>
            <button
              className={clsx(showSettings && 'text-indigo-300')}
              onClick={() => setShowSettings(!showSettings)}
            >
              <BiCog size={20} />
            </button>
            <button
              className={clsx(showHint && 'text-indigo-300')}
              onClick={() => setShowHint(!showHint)}
            >
              <BiHelpCircle size={20} />
            </button>
          </div>
        </div>
        {showSettings && <YearInput onSubmit={updateYear} initYear={dateToGuess.year()} />}
      </div>
      {showHint && (
        <div className='flex flex-row items-center justify-center'>
          <DoomsdayDifference isoDate={dateToGuess.toISOString()} />
        </div>
      )}

      <div id='quiz__bottom-bit' className='h-72'>
        <div className='pt-3' id='quiz__actions'>
          <WeekdayGuesser
            correctDay={getWeekdayForDate(dateToGuess)}
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

const GuessDateWithinYear = ({ year }: { year?: number }) => {
  const initYear = year || new Date().getFullYear();
  const startWithTimeAlready = getDayjsRandomDateInYear(initYear);
  const [guessingYear, setGuessingYear] = useState(initYear);
  const [guessingAgain, setGuessingAgain] = useState(false);

  const [currentDateToGuess, setCurrentDateToGuess] = useState<Dayjs>(startWithTimeAlready);
  const [wronglyGuessedDates, setWronglyGuessedDates] = useState<Array<Dayjs>>([]);
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
    const newRandomDate = getDayjsRandomDateInYear(guessingYear);
    setCurrentDateToGuess(newRandomDate);
    return newRandomDate;
  };

  const handleIncorrectGuess = (dateGuessed: Dayjs) => {
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

export default GuessDateWithinYear;
