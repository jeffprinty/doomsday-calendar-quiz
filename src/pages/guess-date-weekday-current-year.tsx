import { useState } from 'react';

import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import { BiCog, BiHelpCircle } from 'react-icons/bi';

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
  getWeekdayForDate,
} from '../math/dates';
import { Weekday } from '../math/weekdays';
import { GuessPayload } from '../modules/module.types';
import WeekdayGuesser from '../modules/weekday-guesser';

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

const GuessDateWeekdayCurrentYear = () => {
  const currentYear = new Date().getFullYear();
  const [yearInput, setYearInput] = useState(currentYear);
  const [enableDayClick, setEnableDayClick] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const { answerHistory, lastAnswerCorrect, onAnswer, onNewQuestion, startTime } =
    useAnswerHistory('guess-full-date');
  const [guessingDate, getNewDate] = useGuessingDate('current-year', yearInput);

  const getNextDate = () => {
    getNewDate();
    onNewQuestion();
  };

  const [autoNext, setAutoNext, onAnswerAuto, { nextGuessIncoming }] = useAutoNext({
    callback: getNextDate,
  });

  const handleIncorrectGuess = (dateGuessed: Dayjs) => {
    console.log('handleIncorrectGuess', dateGuessed);
  };

  const handleGuess = ({ isCorrect }: GuessPayload<Weekday>) => {
    onAnswer({ isCorrect, answer: guessingDate });
    onAnswerAuto(isCorrect);
    if (!isCorrect) {
      handleIncorrectGuess(guessingDate);
    }
    setEnableDayClick(false);
  };

  const guessingYear = guessingDate.year();
  const dateStringToGuess = formatDayjsGuessDate(guessingDate);
  return (
    <>
      <PageDescribe>
        Guess a given date within the current year. Use this once you&apos;ve committed the doomsday
        for {guessingYear} to memory.
      </PageDescribe>
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
              explainIncorrect={`is on ${getFullWeekday(guessingDate)}`}
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
          {showSettings && (
            <YearInput onSubmit={(year) => setYearInput(year)} initYear={guessingDate.year()} />
          )}
        </div>
        {showHint && (
          <div className='flex flex-row items-center justify-center'>
            <DoomsdayDifference isoDate={guessingDate.toISOString()} />
          </div>
        )}

        <div id='quiz__bottom-bit' className='h-72'>
          <div className='pt-3' id='quiz__actions'>
            <WeekdayGuesser
              correctDay={getWeekdayForDate(guessingDate)}
              disableOnGuess
              key={`date_${startTime}`}
              onGuess={handleGuess}
            />
            <GuessActions
              disabled={enableDayClick}
              onClick={getNextDate}
              autoEnabled={autoNext}
              toggleAuto={() => setAutoNext(!autoNext)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GuessDateWeekdayCurrentYear;
