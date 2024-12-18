import React, { useState } from 'react';

import { DateTime } from 'luxon';
import randomInt from 'random-int';
import { Route, Routes } from 'react-router-dom';

import DoomsdayQuiz from './doomsday-quiz';

const getRandomDateInYear = (year: number) => {
  const randomNumber = randomInt(0, 364);
  const initYearStart = DateTime.fromISO(`${year}-01-01`);
  return initYearStart.plus({ days: randomNumber });
};

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
      <div className='quiz__header-menu'>
        <input
          type='checkbox'
          checked={guessingAgain}
          onChange={({ target: { checked } }) => setGuessingAgain(checked)}
        />
      </div>
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
        <Route
          path='/info'
          element={<div>another page of greater length so prettier will stfu</div>}
        />
      </Routes>
    </>
  );
};

export default DoomsdayQuizContainer;
