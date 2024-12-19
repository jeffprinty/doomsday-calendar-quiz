import React, { lazy, Suspense, useState } from 'react';

import { DateTime } from 'luxon';
import { NavLink, Route, Routes } from 'react-router-dom';

import { getRandomDateInYear } from '../common';
import GuessFullDate from './guess-full-date';

const GuessDateDoomsdayWithinYear = lazy(() => import('./guess-date-doomsday-within-year'));
const GuessYearDoomsday = lazy(() => import('./guess-year-doomsday'));

const activeLink = 'text-white';
const inactiveLink = 'text-blue-700';

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const Base = () => {
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
        <nav className='flex flex-col'>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
            to='/doomsday-calendar-quiz/'
            end
          >
            home
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
            to='/doomsday-calendar-quiz/year'
          >
            year
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
            to='/doomsday-calendar-quiz/full'
          >
            full
          </NavLink>
        </nav>
        <input
          type='checkbox'
          checked={guessingAgain}
          onChange={({ target: { checked } }) => setGuessingAgain(checked)}
        />
      </div>
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route
            path='/'
            index
            element={
              <GuessDateDoomsdayWithinYear
                dateToGuess={currentDateToGuess}
                getNextDate={getNextDate}
                onIncorrectGuess={handleIncorrectGuess}
              />
            }
          />
          <Route path='/year' element={<GuessYearDoomsday />} />
          <Route path='/full' element={<GuessFullDate />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Base;
