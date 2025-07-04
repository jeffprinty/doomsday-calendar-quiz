import { useState } from 'react';

import dayjs from 'dayjs';

import Button from '../components/button';
import GuessDisplay from '../components/guess-display';
import QuizResults from '../components/quiz-results';
import { YearStepHelperHorizontal } from '../components/shared';
import useAnswerHistory from '../hooks/use-answer-history';
import { getDoomsdayForYear, getWeekdayForDate } from '../math/dates';
import { getRandomYear } from '../math/year';
import WeekdayGuesser from '../modules/weekday-guesser';

const GuessYearDoomsday = () => {
  const initYear = getRandomYear();
  const [showResults, setShowResults] = useState(true);
  const [guessingYear, setGuessingYear] = useState(initYear);
  const { answerHistory, lastAnswerCorrect, onAnswer, onNewQuestion, startTime } =
    useAnswerHistory('guess-full-date');

  const doomsdayOnYear = getDoomsdayForYear(guessingYear);
  const correctDoomsday = getWeekdayForDate(doomsdayOnYear);

  const getNewYear = () => {
    const randomYearAsInt = getRandomYear();
    setGuessingYear(randomYearAsInt);
    onNewQuestion();
  };

  return (
    <div id='page__guess-year-doomsday'>
      <GuessDisplay
        questionText='What is the doomsday for:'
        guessText={guessingYear}
        guessedCorrectly={lastAnswerCorrect}
        guessTextClassName='text-6xl'
      />
      <YearStepHelperHorizontal key={guessingYear} />
      <WeekdayGuesser
        correctDay={correctDoomsday}
        key={`date_${startTime}`}
        onGuess={({ isCorrect }) => {
          onAnswer({ isCorrect, answer: doomsdayOnYear });
        }}
      />
      <Button onClick={getNewYear} className='my-2 h-16 w-full'>
        Random Year
      </Button>
      <Button onClick={() => setShowResults((previous) => !previous)}>
        {showResults ? 'hide' : 'show'} results
      </Button>
      {showResults && (
        <QuizResults
          answers={answerHistory}
          currentGuess={guessingYear.toString()}
          dateFormat={(date) => dayjs(date).format('YYYY')}
        />
      )}
    </div>
  );
};

export default GuessYearDoomsday;
