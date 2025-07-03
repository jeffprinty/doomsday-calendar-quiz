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
import useAutoNext from '../hooks/use-auto-next';
import useGuessingDate from '../hooks/use-guessing-date';
import {
  formatDayjsGuessDate,
  formatYearlessDateShortMonth,
  getFullWeekday,
  getRandomDateInYear,
  getWeekdayForDate,
} from '../math/dates';
import { Weekday } from '../math/weekdays';
import { GuessPayload } from '../modules/module.types';
import WeekdayGuesser from '../modules/weekday-guesser';

const GuessDateWeekday = ({
  dateToGuess,
  getNextDate,
  onIncorrectGuess,
  updateYear,
}: {
  dateToGuess: Dayjs;
  getNextDate: () => void;
  onIncorrectGuess: (dateGuessed: Dayjs) => void;
  updateYear?: (updatedYear: number) => void;
}) => {
  const [enableDayClick, setEnableDayClick] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { answerHistory, lastAnswerCorrect, onAnswer, onNewQuestion, startTime } =
    useAnswerHistory('guess-full-date');

  const generateRandomDate = () => {
    getNextDate();
    setEnableDayClick(true);
    onNewQuestion();
  };

  const [autoNext, setAutoNext, onAnswerAuto, { nextGuessIncoming }] = useAutoNext({
    callback: generateRandomDate,
  });

  const handleGuess = ({ isCorrect }: GuessPayload<Weekday>) => {
    onAnswer({ isCorrect, answer: dateToGuess });
    onAnswerAuto(isCorrect);
    if (!isCorrect) {
      onIncorrectGuess(dateToGuess);
    }
    setEnableDayClick(false);
    if (autoNext) {
      if (isCorrect) {
        setTimeout(() => {
          generateRandomDate();
        }, timeoutMs);
      }
    }
  };

  const dateStringToGuess = formatDayjsGuessDate(dateToGuess);
  return (
    <div
      className='md:min-h-1/2 flex w-full flex-col justify-between md:h-1/2 md:justify-start'
      id='page__guess-date-within-year'
    >
      <div className='' id='quiz__top-bit'>
        <QuizResults
          answers={answerHistory}
          currentGuess={dateStringToGuess}
          dateFormat={(date) => formatYearlessDateShortMonth(date)}
        />
        <div className='relative'>
          <GuessDisplay
            autoMode={autoNext}
            autoProcessing={nextGuessIncoming}
            explainIncorrect={`is on ${getFullWeekday(dateToGuess)}`}
            questionText='What day of the week is:'
            guessText={dateStringToGuess}
            guessedCorrectly={lastAnswerCorrect}
            renderButtons={() => (
              <>
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
              </>
            )}
          />
        </div>
        {showSettings && updateYear && (
          <YearInput onSubmit={updateYear} initYear={dateToGuess.year()} />
        )}
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
            disableOnGuess
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

const GuessDateWeekdayCurrentYear = ({ year }: { year?: number }) => {
  const [guessingDate, getNewDate] = useGuessingDate('current-year', year);

  const getNextDate = () => {
    getNewDate();
  };

  const handleIncorrectGuess = (dateGuessed: Dayjs) => {
    console.log('handleIncorrectGuess', dateGuessed);
  };

  const guessingYear = guessingDate.year();
  return (
    <>
      <PageDescribe>
        Guess a given date within the current year. Use this once you&apos;ve committed the doomsday
        for {guessingYear} to memory.
      </PageDescribe>
      <GuessDateWeekday
        dateToGuess={guessingDate}
        getNextDate={getNextDate}
        onIncorrectGuess={handleIncorrectGuess}
      />
    </>
  );
};

export default GuessDateWeekdayCurrentYear;
