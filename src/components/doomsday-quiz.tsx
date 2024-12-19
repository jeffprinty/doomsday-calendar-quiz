import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime, Interval } from 'luxon';
import { PieChart } from 'react-minimal-pie-chart';

import {
  correctColor,
  Day,
  daysOfWeek,
  guessDateFormat,
  incorrectColor,
  PastAnswer
} from '../common';
import Button from './button';

//ES6 const, let
//ES6 Destructuring

export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='container flex h-full w-full flex-col items-center justify-start border border-tertiary bg-secondary lg:w-2/3'>
      {children}
    </section>
  );
};

export const DayOfWeekGuesser = ({
  correctDay,
  daySelected,
  disabled = false,
  onDayClick
}: {
  correctDay?: Day;
  daySelected?: Day;
  disabled?: boolean;
  onDayClick: (dayClicked: Day) => void;
}) => {
  return (
    <div className='grid w-full grid-cols-7 pt-6'>
      {daysOfWeek.map((day: Day) => {
        const thisDayIsCorrect = correctDay === day;
        const thisDayWasSelected = daySelected === day;
        const incorrectSelection = daySelected !== correctDay;
        return (
          <Button
            className={clsx([
              'quiz__day-of-week mx-1 h-24 px-1 text-center',
              incorrectSelection && thisDayWasSelected && 'disabled:bg-red-900',
              thisDayIsCorrect && 'disabled:bg-green-600 disabled:text-black'
            ])}
            data-correct-day={thisDayIsCorrect}
            disabled={disabled}
            key={day}
            onClick={() => onDayClick(day)}
          >
            {day}
            {thisDayIsCorrect && <span className='correct-indicator'>✅</span>}
          </Button>
        );
      })}
    </div>
  );
};

const DoomsdayQuiz = ({
  dateToGuess,
  getNextDate,
  onIncorrectGuess
}: {
  dateToGuess?: DateTime;
  getNextDate: () => DateTime;
  onIncorrectGuess: (dateGuessed: DateTime) => void;
}) => {
  const [startTime, setStartTime] = useState<DateTime>(DateTime.now());
  const [answerTimes, setAnswerTimes] = useState<Array<PastAnswer>>([]);
  console.log('answerTimes', answerTimes);
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
        setAnswerTimes((previous) => [
          ...previous,
          [intervalInSeconds, correctDayGuessed, dateToGuess]
        ]);
      }
    }
    setEnableDayClick(false);
    setCorrectDay(dayShortName);
  };

  return (
    <PageContainer>
      <div id='quiz__top-bit'>
        <div className='flex w-full flex-row items-center justify-center bg-indigo-900 py-2 md:rounded-bl-2xl md:rounded-br-2xl'>
          <h1 className='text-center text-3xl'>Doomsday Calendar Quiz</h1>
        </div>
        <QuizResults answers={answerTimes} currentGuess={dateStringToGuess} />
      </div>
      <div id='quiz__bottom-bit' className=''>
        <div
          id='quiz__date-to-guess'
          className={clsx([
            'my-10 flex w-full flex-col items-center justify-center pb-6 pt-4 text-center',
            lastAnswerCorrect === undefined && 'bg-gray-600',
            lastAnswerCorrect === true && correctColor,
            lastAnswerCorrect === false && incorrectColor
          ])}
        >
          <span className=''>What day of the week is:</span>
          {!!dateToGuess && <h2 className='text-4xl'>{dateStringToGuess}</h2>}
        </div>
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
    </PageContainer>
  );
};

export default DoomsdayQuiz;

export const QuizResults = ({
  answers,
  currentGuess
}: {
  answers: Array<PastAnswer>;
  currentGuess: string;
}) => {
  const correctValue = answers.filter(([, isCorrect]) => isCorrect).length;
  const incorrectValue = answers.filter(([, isCorrect]) => !isCorrect).length;
  return (
    <div
      id='quiz__results'
      className='grid h-48 w-full grid-cols-2 flex-row items-start justify-between bg-indigo-800 bg-opacity-40'
    >
      <div className='flex h-48 flex-col items-center justify-center px-8'>
        <PieChart
          label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
          data={[
            {
              title: 'Correct',
              value: correctValue,
              color: 'rgb(22 163 74/var(--tw-bg-opacity,1))'
            },
            { title: 'Incorrect', value: incorrectValue, color: '#C13C37' }
          ]}
        />
      </div>
      <div className='flex h-48 flex-col justify-start overflow-y-auto'>
        <ul className='w-full'>
          {[...answers].reverse().map(([timeInSeconds, isCorrect, dateGuessed]) => (
            <li
              className={clsx(
                'flex w-full flex-row justify-between bg-opacity-40 px-2',
                isCorrect ? correctColor : incorrectColor
              )}
              key={`${timeInSeconds}_${isCorrect}`}
            >
              <span>{timeInSeconds}</span>
              <span>
                {dateGuessed.toFormat(guessDateFormat) === currentGuess && '⚪️'}
                {dateGuessed.toFormat('MMM dd, yy')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
