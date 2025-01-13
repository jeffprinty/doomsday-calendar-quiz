import React, { useState } from 'react';

import { DateTime } from 'luxon';

import { Day, getRandomYear, mnemonics } from './common';
import Button from './components/button';
import QuizResults from './components/quiz-results';
import { GuessDisplay, YearStepHelperHorizontal } from './components/shared';
import useAnswerHistory from './hooks/use-answer-history';
import { DayOfWeekGuesserSelfContained } from './modules/day-of-week-guesser';

const GuessYearDoomsday = () => {
  const initYear = getRandomYear();

  const [showResults, setShowResults] = useState(true);

  // TODO: Allow set year
  const [guessingYear, setGuessingYear] = useState(initYear);

  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers } = useAnswerHistory();

  const doomsdayOnYear = DateTime.fromObject({
    year: guessingYear,
    month: 4,
    day: 4,
  });

  const correctDoomsday = doomsdayOnYear.toFormat('ccc') as Day;

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
      <DayOfWeekGuesserSelfContained
        correctDay={correctDoomsday}
        key={`week_${guessingYear}`}
        onGuess={(answer, isCorrect) => {
          onAnswer(doomsdayOnYear, isCorrect);
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
      <div className='explainer hidden'>
        {mnemonics.map(({ monthName, common }, index) => {
          const hackyMonthNumber = index + 1;
          return (
            <div key={monthName} className='flex flex-row items-center justify-between text-center'>
              {monthName}
              <div className=''>
                {hackyMonthNumber}/{common}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GuessYearDoomsday;
