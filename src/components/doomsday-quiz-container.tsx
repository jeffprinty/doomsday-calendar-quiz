import React, { lazy, Suspense, useState } from 'react';

import { DateTime } from 'luxon';
import { NavLink, Route, Routes } from 'react-router-dom';

import { getRandomDateInYear } from '../common';

const DoomsdayQuiz = lazy(() => import('./doomsday-quiz'));
const DoomsdayInfo = lazy(() => import('./doomsday-quiz-info'));

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const DoomsdayQuizContainer = () => {
  const initYear = 2025;
  const startWithTimeAlready = getRandomDateInYear(initYear);
  // TODO: Allow set year
  const [guessingYear] = useState(2025);
  const [guessingAgain, setGuessingAgain] = useState(false);
  console.log('guessingAgain', guessingAgain);

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
    const newRandomDate = getRandomDateInYear(guessingYear);
    setCurrentDateToGuess(newRandomDate);
    return newRandomDate;
  };

  const handleIncorrectGuess = (dateGuessed: DateTime) => {
    console.log('dateGuessed', dateGuessed);
    setWronglyGuessedDates((previous) => [...previous, dateGuessed]);
  };

  return (
    <>
      <div className='quiz__header-menu absolute right-0 top-0'>
        <input
          type='checkbox'
          checked={guessingAgain}
          onChange={({ target: { checked } }) => setGuessingAgain(checked)}
        />
        <NavLink to='/doomsday-calendar-quiz/info'>info</NavLink>
        <NavLink to='/doomsday-calendar-quiz/'>home</NavLink>
      </div>
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route
            path='/'
            element={
              <DoomsdayQuiz
                dateToGuess={currentDateToGuess}
                getNextDate={getNextDate}
                onIncorrectGuess={handleIncorrectGuess}
              />
            }
          />
          <Route path='/info' element={<DoomsdayInfo />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default DoomsdayQuizContainer;
