import { useState } from 'react';

import { betterDaysTable, CalendarDay, timeoutMs } from '../common';
import CalendarTable from '../components/calendar-table';
import GuessDisplay from '../components/guess-display';
import { PageDescribe } from '../components/page-describe';
import { GuessActions } from '../components/shared';
import { allDaysFromMnemonics, getRandomMnemonic } from '../math/month-doomsdays';
import { chunkArray, pickRandomlyFromArray } from '../utils';

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
  const [incorrectOptions, setIncorrectOptions] = useState<Array<number>>(
    pickRandomlyFromArray(allIncorrectOptions, 3)
  );

  const combinedOptions = new Set([...correctOptions, ...incorrectOptions]);

  const handleDayClick = ({ dayNumber }: CalendarDay) => {
    if (!combinedOptions.has(dayNumber)) {
      return;
    }
    setAnswerClicked(dayNumber);
    setLastAnswerCorrect(correctOptions.includes(dayNumber));
    if (autoNext) {
      setTimeout(() => heroClick(), timeoutMs);
    }
  };

  const heroClick = () => {
    setRandomMnemonic(getRandomMnemonic());
    setLastAnswerCorrect(undefined);
    setAnswerClicked(undefined);
    setIncorrectOptions(pickRandomlyFromArray(allIncorrectOptions, 3));
  };

  return (
    <div className='long-calendar flex w-full flex-col items-start justify-center'>
      <PageDescribe title='Month Doomsday Practice' className='text-sm' collapsible initCollapsed>
        Use this page to practice recalling the doomsday month mnemonic for a given month. You will
        be prompted with a month and a calendar with 4 highlighted dates, choose the correct
        doomsday date.
      </PageDescribe>
      <GuessDisplay
        autoMode={autoNext}
        className=''
        explainCorrect={memeticHandle}
        explainIncorrect=' '
        questionText='What is the doomsday for:'
        guessText={monthName}
        guessedCorrectly={lastAnswerCorrect}
        guessTextClassName='text-6xl'
      />
      <div className='flex w-full flex-col items-center justify-center p-2'>
        <CalendarTable
          baseCellClassName=''
          chunkedDayArray={monthChunked}
          getButtonClassName={({ dayNumber, dayJsDay }) => {
            if (dayJsDay.month() !== 0) {
              return 'invisible';
            }
            if (answerClicked !== undefined) {
              if (correctOptions.includes(dayNumber)) {
                return 'text-white bg-green-600';
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
        <GuessActions
          btnLabel='Random Month'
          onClick={heroClick}
          autoEnabled={autoNext}
          toggleAuto={() => setAutoNext(!autoNext)}
        />
      </div>
    </div>
  );
};

export default MonthDoomsdayCalendar;
