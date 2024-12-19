import React, { useState } from 'react';

import { DateTime, Interval } from 'luxon';

import { Day, guessDateFormat, PastAnswer } from '../common';
import Button from './button';
import QuizResults from './quiz-results';
import { DayOfWeekGuesser, GuessDisplay, PageContainer } from './shared';

const GuessDateDoomsdayWithinYear = ({
  dateToGuess,
  getNextDate,
  onIncorrectGuess
}: {
  dateToGuess?: DateTime;
  getNextDate: () => DateTime;
  onIncorrectGuess: (dateGuessed: DateTime) => void;
}) => {
  const [startTime, setStartTime] = useState<DateTime>(DateTime.now());
  const [pastAnswers, setPastAnswers] = useState<Array<PastAnswer>>([]);
  const [correctDay, setCorrectDay] = useState<Day>();
  const [daySelected, setDaySelected] = useState<Day>();
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();
  const [enableDayClick, setEnableDayClick] = useState(true);

  const dateStringToGuess = dateToGuess?.toFormat(guessDateFormat) || '';

  const generateRandomDate = () => {
    const randomDate = getNextDate();
    console.log('TODO, do I need this?', randomDate.toISO());
    setStartTime(DateTime.now());
    setEnableDayClick(true);
    setCorrectDay(undefined);
    setLastAnswerCorrect(undefined);
  };

  const handleDayClick = (day: Day) => {
    if (!dateToGuess) {
      return;
    }
    setDaySelected(day);
    const dayShortName = dateToGuess.toFormat('ccc') as Day;
    const correctDayGuessed = dayShortName === day;
    setLastAnswerCorrect(correctDayGuessed);
    if (!correctDayGuessed) {
      onIncorrectGuess(dateToGuess);
    }
    if (startTime) {
      const interval = Interval.fromDateTimes(startTime, DateTime.now());
      const intervalInSeconds = interval.length('seconds');
      if (intervalInSeconds) {
        setPastAnswers((previous) => [
          ...previous,
          [intervalInSeconds, correctDayGuessed, dateToGuess]
        ]);
      }
    }
    setEnableDayClick(false);
    setCorrectDay(dayShortName);
  };

  return (
    <div id='page__guess-date-within-year'>
      <div id='quiz__top-bit'>
        <div className='flex w-full flex-row items-center justify-center bg-indigo-900 py-2 md:rounded-bl-2xl md:rounded-br-2xl'>
          <h1 className='text-center text-3xl'>Doomsday Calendar Quiz</h1>
        </div>
        <QuizResults answers={pastAnswers} currentGuess={dateStringToGuess} />
      </div>
      <div id='quiz__bottom-bit' className=''>
        <GuessDisplay
          questionText='What day of the week is:'
          guessText={dateStringToGuess}
          guessedCorrectly={lastAnswerCorrect}
        />
        <div id='quiz__actions'>
          <DayOfWeekGuesser
            correctDay={correctDay}
            daySelected={daySelected}
            onDayClick={handleDayClick}
          />
          <div className='flex-row items-center justify-center p-2'>
            <Button
              className='my-2 h-16 w-full'
              disabled={enableDayClick}
              onClick={generateRandomDate}
            >
              New Date
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuessDateDoomsdayWithinYear;