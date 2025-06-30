import { useState } from 'react';

import { DateTime } from 'luxon';

import { timeoutMs } from './common';
import { DoomsyearEquation } from './components/doomsyear-equation';
import GuessDisplay from './components/guess-display';
import QuizResults from './components/quiz-results';
import { GuessActions, Hint } from './components/shared';
import useAnswerHistory from './hooks/use-answer-history';
import { formatGuessDate } from './math/dates';
import { Weekday } from './math/weekdays';
import { getDoomsdayForYear, getRandomDateInModernity } from './math/year';
import { GuessPayload } from './modules/module.types';
import WeekdayGuesser from './modules/weekday-guesser';

const GuessDateDoomsdayInModernity = () => {
  const startWithTimeAlready = getRandomDateInModernity();
  const [autoNext, setAutoNext] = useState(false);
  const [dateToGuess, setCurrentDateToGuess] = useState<DateTime>(startWithTimeAlready);
  const [enableDoomsdayClick, setEnableDoomsdayClick] = useState(true);
  const [guessingAgain, setGuessingAgain] = useState(false);
  const [nextGuessIncoming, setNextGuessIncoming] = useState(false);
  const [wronglyGuessedDates, setWronglyGuessedDates] = useState<Array<DateTime>>([]);

  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime } = useAnswerHistory();

  const dateStringToGuess = formatGuessDate(dateToGuess);

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
    const newRandomDate = getRandomDateInModernity();
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
          explainIncorrect={`is on ${dateToGuess.toFormat('cccc')}`}
          questionText='What day of the week is:'
          guessText={dateStringToGuess}
          guessedCorrectly={lastAnswerCorrect}
        />
      </div>
      <div id='quiz__bottom-bit' className='h-72'>
        <div className='pt-3' id='quiz__actions'>
          <WeekdayGuesser
            className='pb-2'
            correctDay={getDoomsdayForYear(dateToGuess.year).toFormat('ccc') as Weekday}
            key={`doomsyear_${startTime}`}
            onGuess={handleDoomsyearGuess}
            minimizeOnGuess
          />
          <WeekdayGuesser
            correctDay={dateToGuess.toFormat('ccc') as Weekday}
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
        <Hint key={dateToGuess.year}>
          <DoomsyearEquation fullYear={dateToGuess.year} />
        </Hint>
      </div>
    </div>
  );
};

export default GuessDateDoomsdayInModernity;
