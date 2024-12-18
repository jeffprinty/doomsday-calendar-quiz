import React, { useState } from 'react';

import { DateTime } from 'luxon';
import randomInt from 'random-int';
import { Route, Routes } from 'react-router-dom';

import DoomsdayQuiz, { PageContainer } from './doomsday-quiz';

const getRandomDateInYear = (year: number) => {
  const randomNumber = randomInt(0, 364);
  const initYearStart = DateTime.fromISO(`${year}-01-01`);
  return initYearStart.plus({ days: randomNumber });
};

// const generateYearWithMetadataFromDate = ()

const sharedMemeticHandles = {
  doubles: '4/4, 6/6, 8/8, 10/10, 12/12',
  nineToFive: '9-to-5 at 7-11'
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const mnemonics = [
  {
    month: 'jan',
    monthName: 'January',
    common: 3,
    leap: 4
  },
  {
    month: 'feb',
    monthName: 'February',
    common: 28,
    leap: 29
  },
  {
    month: 'mar',
    monthName: 'March',
    common: 14,
    leap: 14,
    memeticHandle: 'pi day'
  },
  {
    month: 'apr',
    monthName: 'April',
    common: 4,
    leap: 4,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'may',
    monthName: 'May',
    common: 9,
    leap: 9,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'jun',
    monthName: 'June',
    common: 6,
    leap: 6,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'jul',
    monthName: 'July',
    common: 11,
    leap: 11,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'aug',
    monthName: 'August',
    common: 8,
    leap: 8,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'sep',
    monthName: 'September',
    common: 5,
    leap: 5,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'oct',
    monthName: 'October',
    common: 10,
    leap: 10,
    memeticHandle: sharedMemeticHandles.doubles
  },
  {
    month: 'nov',
    monthName: 'November',
    common: 7,
    leap: 7,
    memeticHandle: sharedMemeticHandles.nineToFive
  },
  {
    month: 'dec',
    monthName: 'December',
    common: 12,
    leap: 12,
    memeticHandle: sharedMemeticHandles.doubles
  }
];

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
      <div className='quiz__header-menu absolute top-0 right-0'>
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
          element={
            <PageContainer>
              <div className='explainer'>
                {mnemonics.map(({ monthName, common }, index) => {
                  const hackyMonthNumber = index + 1;
                  return (
                    <div
                      key={monthName}
                      className='flex flex-row items-center justify-between text-center'
                    >
                      {monthName}
                      <div className=''>
                        {hackyMonthNumber}/{common}
                      </div>
                    </div>
                  );
                })}
              </div>
            </PageContainer>
          }
        />
      </Routes>
    </>
  );
};

export default DoomsdayQuizContainer;
