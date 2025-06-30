import { useState } from 'react';

import { DateTime } from 'luxon';

import { guessDateFormat, timeoutMs } from './common';
import GuessDisplay from './components/guess-display';
import QuizResults from './components/quiz-results';
import { GuessActions } from './components/shared';
import useAnswerHistory from './hooks/use-answer-history';
import { Weekday } from './math/weekdays';
import { getRandomDateInModernity } from './math/year';
import { DayOfWeekGuesserSelfContained } from './modules/day-of-week-guesser';

const GuessDateDoomsdayWithinYear = ({
  dateToGuess,
  getNextDate,
  onIncorrectGuess,
}: {
  dateToGuess: DateTime;
  getNextDate: () => DateTime;
  onIncorrectGuess: (dateGuessed: DateTime) => void;
}) => {
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
      onIncorrectGuess(dateToGuess);
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

  return (
    <div
      className='md:min-h-1/2 flex w-full flex-col justify-between md:h-1/2 md:justify-start'
      id='page__guess-date-within-year'
    >
      <div className='' id='quiz__top-bit'>
        <QuizResults answers={pastAnswers} currentGuess={dateStringToGuess} />
        <GuessDisplay
          autoMode
          autoProcessing={nextGuessIncoming}
          explainIncorrect={`is on ${dateToGuess.toFormat('cccc')}`}
          questionText='What day of the week is:'
          guessText={dateStringToGuess}
          guessedCorrectly={lastAnswerCorrect}
        />
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

const GuessDateDoomsdayInModernity = () => {
  const startWithTimeAlready = getRandomDateInModernity();
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
    const newRandomDate = getRandomDateInModernity();
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
    />
  );
};

export default GuessDateDoomsdayInModernity;
