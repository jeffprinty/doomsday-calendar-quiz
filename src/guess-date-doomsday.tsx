import { useState } from 'react';

import { Dayjs } from 'dayjs';

import { timeoutMs } from './common';
import { DoomsyearEquation } from './components/doomsyear-equation';
import DoomsdayDifference from './components/equations/doomsday-difference';
import GuessDisplay from './components/guess-display';
import QuizResults from './components/quiz-results';
import { GuessActions, Hint } from './components/shared';
import useAnswerHistory from './hooks/use-answer-history';
import {
  formatDayjsGuessDate,
  getDayjsRandomDateInModernity,
  getDoomsdayWeekdayForYear,
  getFullWeekday,
} from './math/dates';
import { Weekday } from './math/weekdays';
import { GuessPayload } from './modules/module.types';
import WeekdayGuesser from './modules/weekday-guesser';

const GuessDateDoomsdayInModernity = () => {
  const startWithTimeAlready = getDayjsRandomDateInModernity();
  const [autoNext, setAutoNext] = useState(false);
  const [dateToGuess, setCurrentDateToGuess] = useState<Dayjs>(startWithTimeAlready);
  const [enableDoomsdayClick, setEnableDoomsdayClick] = useState(true);
  const [guessingAgain, setGuessingAgain] = useState(false);
  const [nextGuessIncoming, setNextGuessIncoming] = useState(false);
  const [wronglyGuessedDates, setWronglyGuessedDates] = useState<Array<Dayjs>>([]);

  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime } = useAnswerHistory();

  const dateStringToGuess = formatDayjsGuessDate(dateToGuess);

  const generateRandomDate = () => {
    getNextDate();
    setEnableDoomsdayClick(true);
    setNextGuessIncoming(false);
    onNewQuestion();
  };

  const handleGuess = ({ isCorrect }: GuessPayload<Weekday>) => {
    onAnswer({ isCorrect, answer: dateToGuess });
    if (!isCorrect) {
      setWronglyGuessedDates((previous) => [...previous, dateToGuess]);
    }
    setEnableDoomsdayClick(false);
    if (autoNext) {
      setNextGuessIncoming(true);
      if (isCorrect) {
        setTimeout(() => {
          generateRandomDate();
        }, timeoutMs);
      }
    }
  };
  const handleDoomsyearGuess = ({ isCorrect }: GuessPayload<Weekday>) => {
    console.log('handleDoomsyearGuess', isCorrect);
    setEnableDoomsdayClick(true);
  };

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
    const newRandomDate = getDayjsRandomDateInModernity();
    setCurrentDateToGuess(newRandomDate);
    return newRandomDate;
  };

  return (
    <div
      className='md:min-h-1/2 flex w-full flex-col justify-between md:h-1/2 md:justify-start'
      id='page__guess-date-doomsday'
    >
      <div className='' id='quiz__top-bit'>
        <QuizResults answers={pastAnswers} currentGuess={dateStringToGuess} />
        <GuessDisplay
          autoMode={autoNext}
          autoProcessing={nextGuessIncoming}
          explainIncorrect={`is on ${getFullWeekday(dateToGuess)}`}
          questionText='What day of the week is:'
          guessText={dateStringToGuess}
          guessedCorrectly={lastAnswerCorrect}
        />
      </div>
      <div id='quiz__bottom-bit' className='h-72'>
        <div className='pt-3' id='quiz__actions'>
          <WeekdayGuesser
            className='pb-2'
            correctDay={getDoomsdayWeekdayForYear(dateToGuess.year())}
            key={`doomsyear_${startTime}`}
            onGuess={handleDoomsyearGuess}
            minimizeOnGuess
          />
          <WeekdayGuesser
            correctDay={dateToGuess.format('ccc') as Weekday}
            key={`date_${startTime}`}
            onGuess={handleGuess}
          />
          <GuessActions
            disabled={enableDoomsdayClick}
            onClick={generateRandomDate}
            autoEnabled={autoNext}
            toggleAuto={() => setAutoNext(!autoNext)}
          />
        </div>
        <Hint contentClassName='text-right' key={dateToGuess.year()}>
          <DoomsyearEquation fullYear={dateToGuess.year()} />
          <br />
          <DoomsdayDifference isoDate={dateToGuess.toISOString()} />
        </Hint>
      </div>
    </div>
  );
};

export default GuessDateDoomsdayInModernity;
