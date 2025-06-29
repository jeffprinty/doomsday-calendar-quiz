import { useState } from 'react';

import clsx from 'clsx';

import { betterDaysTable, CalendarDay, chunkArray, pickRandomlyFromArray } from '../common';
import { allDaysFromMnemonics, getRandomMnemonic } from '../mnemonics';
import CalendarTable from './calendar-table';
import { PageDescribe } from './page-describe';
import { GuessActions, GuessDisplay } from './shared';

const MonthDoomsdayCalendar = () => {
  const daysTable = betterDaysTable(32);
  const initRandomMnemonic = getRandomMnemonic();
  const [randomMnemonic, setRandomMnemonic] = useState(initRandomMnemonic);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();
  const [answerClicked, setAnswerClicked] = useState<number | undefined>();

  const [autoNext, setAutoNext] = useState(false);

  const chunkedByWeek = chunkArray(daysTable, 7);
  const monthChunked = [...chunkedByWeek].slice(0, 5);

  const { common, leap, memeticHandle, monthName } = randomMnemonic;
  const correctOptions = [common];
  if (leap) {
    correctOptions.push(leap);
  }
  const allIncorrectOptions = allDaysFromMnemonics.filter((d) => !correctOptions.includes(d));
  const incorrectOptions = pickRandomlyFromArray(allIncorrectOptions, 3);

  const combinedOptions = new Set([...correctOptions, ...incorrectOptions]);

  const handleDayClick = ({ dayNumber }: CalendarDay) => {
    if (!combinedOptions.has(dayNumber)) {
      return;
    }
    setAnswerClicked(dayNumber);
    setLastAnswerCorrect(correctOptions.includes(dayNumber));
    setTimeout(() => heroClick(), 2000);
  };

  const heroClick = () => {
    setRandomMnemonic(getRandomMnemonic());
    setLastAnswerCorrect(undefined);
    setAnswerClicked(undefined);
  };

  return (
    <div className='long-calendar flex w-full flex-col items-start justify-center'>
      <PageDescribe title='Month Doomsday Practice' className='text-sm'>
        Use this page to practice recalling the doomsday month mnemonic for a given month. You will
        be prompted with a month and a calendar with 4 highlighted dates, choose the correct
        doomsday date.
      </PageDescribe>
      <GuessDisplay
        className={clsx(!!answerClicked && 'animate-pulse')}
        explainCorrect={memeticHandle}
        questionText='What is the doomsday for:'
        guessText={monthName}
        guessedCorrectly={lastAnswerCorrect}
        guessTextClassName='text-6xl'
      />
      <div className='flex w-full flex-col items-center justify-center'>
        <CalendarTable
          baseCellClassName='p-3'
          chunkedDayArray={monthChunked}
          getButtonClassName={({ dayNumber, date }) => {
            if (date.month !== 1) {
              return 'invisible';
            }
            if (answerClicked !== undefined) {
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
          handleDayClick={handleDayClick}
          hideYear
          hideHeader
        />
      </div>
      <GuessActions
        btnLabel='Random Month'
        onClick={heroClick}
        autoEnabled={autoNext}
        toggleAuto={() => setAutoNext(!autoNext)}
      />
    </div>
  );
};

export default MonthDoomsdayCalendar;
