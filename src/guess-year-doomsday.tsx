import { useState } from 'react';

import Button from './components/button';
import GuessDisplay from './components/guess-display';
import QuizResults from './components/quiz-results';
import { YearStepHelperHorizontal } from './components/shared';
import useAnswerHistory from './hooks/use-answer-history';
import { Weekday } from './math/weekdays';
import { getDoomsdayForYear, getRandomYear } from './math/year';
import WeekdayGuesser from './modules/weekday-guesser';

const GuessYearDoomsday = () => {
  const initYear = getRandomYear();

  const [showResults, setShowResults] = useState(true);

  // TODO: Allow set year
  const [guessingYear, setGuessingYear] = useState(initYear);

  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers } = useAnswerHistory();

  const doomsdayOnYear = getDoomsdayForYear(guessingYear);

  const correctDoomsday = doomsdayOnYear.toFormat('ccc') as Weekday;

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
        key={`week_${guessingYear}`}
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
          answers={pastAnswers}
          currentGuess={guessingYear.toString()}
          dateFormat='yyyy'
        />
      )}
    </div>
  );
};

export default GuessYearDoomsday;
