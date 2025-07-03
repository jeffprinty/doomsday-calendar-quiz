import { useState } from 'react';

import clsx from 'clsx';
import { BiHelpCircle } from 'react-icons/bi';

import DoomsdayDifference from '../components/equations/doomsday-difference';
import DoomsyearEquation from '../components/equations/doomsyear-equation';
import GuessDisplay from '../components/guess-display';
import QuizResults from '../components/quiz-results';
import { GuessActions } from '../components/shared';
import useAnswerHistory from '../hooks/use-answer-history';
import useAutoNext from '../hooks/use-auto-next';
import useGuessingDate from '../hooks/use-guessing-date';
import {
  formatDayjsGuessDate,
  getDoomsdayWeekdayForYear,
  getFullWeekday,
  getWeekdayForDate,
} from '../math/dates';
import { Weekday } from '../math/weekdays';
import { GuessPayload } from '../modules/module.types';
import WeekdayGuesser from '../modules/weekday-guesser';

const weekdayGuesserTitle = 'bg-purple-900 w-full text-center text-sm';

const GuessDateDoomsdayInModernity = () => {
  const { answerHistory, lastAnswerCorrect, onAnswer, onNewQuestion, startTime } =
    useAnswerHistory('guess-full-date');
  const [guessingDate, getNewDate] = useGuessingDate('modernity');
  const [yearDoomsdayClicked, setYearDoomsdayClicked] = useState<GuessPayload<Weekday>>();

  const getNewGuess = () => {
    getNewDate();
    onNewQuestion();
    setYearDoomsdayClicked(undefined);
  };
  const [autoNext, setAutoNext, onAnswerAuto, { nextGuessIncoming }] = useAutoNext({
    callback: getNewGuess,
  });
  const [showHint, setShowHint] = useState(false);

  const handleGuess = (guessPayload: GuessPayload<Weekday>) => {
    const { isCorrect } = guessPayload;
    console.log(`handleGuess: doomsday: ${guessPayload}, doomsyear: ${yearDoomsdayClicked}`);
    onAnswer({ isCorrect, answer: guessingDate });
    onAnswerAuto(isCorrect);
    if (!isCorrect) {
      // setWronglyGuessedDates((previous) => [...previous, guessingDate]);
    }
  };

  const dateStringToGuess = formatDayjsGuessDate(guessingDate);
  return (
    <div
      className='md:min-h-1/2 flex w-full flex-col justify-between md:h-1/2 md:justify-start'
      id='page__guess-date-doomsday'
    >
      <div className='' id='quiz__top-bit'>
        <QuizResults
          answers={answerHistory}
          currentGuess={dateStringToGuess}
          dateFormat={formatDayjsGuessDate}
        />
        <GuessDisplay
          autoMode={autoNext}
          autoProcessing={nextGuessIncoming}
          explainIncorrect={`is on ${getFullWeekday(guessingDate)}`}
          questionText='What day of the week is:'
          guessText={dateStringToGuess}
          guessedCorrectly={lastAnswerCorrect}
          renderButtons={() => (
            <button
              className={clsx(showHint && 'text-indigo-300')}
              onClick={() => setShowHint(!showHint)}
            >
              <BiHelpCircle size={20} />
            </button>
          )}
        />
        {showHint && (
          <>
            <DoomsyearEquation flat fullYear={guessingDate.year()} />
            <DoomsdayDifference
              className='flex flex-row justify-center'
              isoDate={guessingDate.toISOString()}
            />
          </>
        )}
      </div>
      <div id='quiz__bottom-bit' className='h-72'>
        <div className='' id='quiz__actions'>
          <div className={weekdayGuesserTitle}>Doomsday for Year</div>
          <WeekdayGuesser
            className=''
            correctDay={getDoomsdayWeekdayForYear(guessingDate.year())}
            disableOnGuess
            key={`doomsyear_${startTime}`}
            onGuess={setYearDoomsdayClicked}
            minimizeOnGuess
          />
          <div className={weekdayGuesserTitle}>
            Weekday for {guessingDate.format('MM-DD-YYYY')}:
          </div>
          <WeekdayGuesser
            correctDay={getWeekdayForDate(guessingDate)}
            disableOnGuess
            key={`date_${startTime}`}
            onGuess={handleGuess}
          />
          <GuessActions
            onClick={getNewGuess}
            autoEnabled={autoNext}
            toggleAuto={() => setAutoNext(!autoNext)}
          />
        </div>
      </div>
    </div>
  );
};

export default GuessDateDoomsdayInModernity;
