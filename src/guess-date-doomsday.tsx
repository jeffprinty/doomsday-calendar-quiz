import { useState } from 'react';

import { DateTime } from 'luxon';

import { guessDateFormat, timeoutMs } from './common';
import { DoomsyearEquation } from './components/doomsyear-equation';
import GuessDisplay from './components/guess-display';
import QuizResults from './components/quiz-results';
import { GuessActions, Hint } from './components/shared';
import useAnswerHistory from './hooks/use-answer-history';
import { Weekday } from './math/weekdays';
import { getDoomsdayForYear, getRandomDateInModernity } from './math/year';
import { WeekdayGuesserSelfContained } from './modules/weekday-guesser';

const GuessDateDoomsdayInModernity = () => {
  const startWithTimeAlready = getRandomDateInModernity();
  const [guessingAgain, setGuessingAgain] = useState(false);

  const [dateToGuess, setCurrentDateToGuess] = useState<DateTime>(startWithTimeAlready);
  const [wronglyGuessedDates, setWronglyGuessedDates] = useState<Array<DateTime>>([]);

  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime } = useAnswerHistory();
  const [enableDayClick, setEnableDayClick] = useState(true);
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
    console.log('handleGuess answer', answer);
    onAnswer(dateToGuess, isCorrect);
    if (!isCorrect) {
      setWronglyGuessedDates((previous) => [...previous, dateToGuess]);
    }
    setEnableDayClick(false);
    if (autoNext) {
      setNextGuessIncoming(true);
      if (isCorrect) {
        setTimeout(() => {
          generateRandomDate();
        }, timeoutMs);
      }
    }
  };
  const handleDoomsyearGuess = (answer: Weekday, isCorrect: boolean) => {
    console.log('handleDoomsyearGuess answer', answer, isCorrect);
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
          <WeekdayGuesserSelfContained
            className='pb-2'
            correctDay={getDoomsdayForYear(dateToGuess.year).toFormat('ccc') as Weekday}
            key={`doomsyear_${startTime}`}
            onGuess={handleDoomsyearGuess}
            minimizeOnGuess
          />
          <WeekdayGuesserSelfContained
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
        <Hint key={dateToGuess.year}>
          <DoomsyearEquation fullYear={dateToGuess.year} />
        </Hint>
      </div>
    </div>
  );
};

export default GuessDateDoomsdayInModernity;
