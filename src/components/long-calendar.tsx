import React, { useState } from 'react';

import {
  allDaysFromMnemonics,
  betterDaysTable,
  chunkArray,
  getRandomDateInYear,
  Mnemonic,
  mnemonics,
  pickRandomlyFromArray,
} from '../common';
import Button from './button';
import CalendarTable from './calendar-table';
import { GuessDisplay } from './shared';

const LongCalendar = () => {
  const daysTable = betterDaysTable(1000);
  const initRandomDate = getRandomDateInYear(2025);
  const [randomDate, setRandomDate] = useState(initRandomDate);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();
  const [answerClicked, setAnswerClicked] = useState<number | undefined>();
  const chunkedByWeek = chunkArray(daysTable, 7);

  const monthChunked = [...chunkedByWeek].slice(0, 5);

  const monthName = randomDate.toFormat('MMMM');
  const monthMnemonic = mnemonics.find((mne) => mne.monthName === monthName) as Mnemonic;
  console.log('monthMnemonic', monthMnemonic);
  const { common, leap } = monthMnemonic;
  const correctOptions = [common];
  if (leap) {
    correctOptions.push(leap);
  }
  console.log('correctOptions', correctOptions);
  const allIncorrectOptions = allDaysFromMnemonics.filter((d) => !correctOptions.includes(d));
  console.log('allIncorrectOptions', allIncorrectOptions);
  const incorrectOptions = pickRandomlyFromArray(allIncorrectOptions, 3);
  console.log('incorrectOptions', incorrectOptions);

  const combinedOptions = new Set([...correctOptions, ...incorrectOptions]);

  const heroClick = () => {
    setRandomDate(getRandomDateInYear(2025));
    setLastAnswerCorrect(undefined);
  };

  return (
    <div className='long-calendar flex w-full flex-col items-start justify-center'>
      <GuessDisplay
        questionText='What is the doomsday for:'
        guessText={monthName}
        guessedCorrectly={lastAnswerCorrect}
        guessTextClassName='text-6xl'
      />
      <div className='flex w-full flex-col items-center justify-center'>
        <CalendarTable
          chunkedDayArray={monthChunked}
          getCellClassName={({ dayNumber, date }) => {
            if (date.month !== 1) {
              return 'invisible';
            }
            if (lastAnswerCorrect !== undefined) {
              if (correctOptions.includes(dayNumber)) {
                return 'text-green-800';
              }
              if (incorrectOptions.includes(dayNumber)) {
                return 'text-red-400';
              }
            }
            if (combinedOptions.has(dayNumber)) {
              return 'bg-blue-500 text-gray-100';
            }
            return 'text-gray-100';
          }}
          handleDayClick={({ dayNumber }) => {
            if (!combinedOptions.has(dayNumber)) {
              return;
            }
            setAnswerClicked(dayNumber);
            setLastAnswerCorrect(correctOptions.includes(dayNumber));
          }}
        />
      </div>
      <Button className='mt-4 w-full py-4 text-center' onClick={heroClick}>
        Get Random Month
      </Button>
      <div className='hidden'>
        <CalendarTable
          chunkedDayArray={chunkedByWeek}
          getCellClassName={({ isDoomsday, sameWeekdayAsDoomsday }) => {
            let cellClassName = 'text-gray-600';
            if (isDoomsday) {
              cellClassName = 'bg-indigo-400 text-gray-100';
            } else if (sameWeekdayAsDoomsday) {
              cellClassName = 'bg-indigo-900 text-gray-400';
            }
            return cellClassName;
          }}
        />
      </div>
    </div>
  );
};

export default LongCalendar;
