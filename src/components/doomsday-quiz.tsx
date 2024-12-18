import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime, Interval } from 'luxon';
import randomInt from 'random-int';
import { PieChart } from 'react-minimal-pie-chart';

import Button from './button';

//ES6 const, let
//ES6 Destructuring

const startDate = DateTime.fromISO('2025-01-01');

const daysOfWeek: Array<Day> = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
type Day = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

const correctColor = 'bg-green-600';
const incorrectColor = 'bg-red-900';

const DoomsdayQuiz = () => {
  const [dt, setDt] = useState<DateTime>();
  const [startTime, setStartTime] = useState<DateTime>();
  const [answerTimes, setAnswerTimes] = useState<Array<[number, boolean, string]>>([]);
  console.log('answerTimes', answerTimes);
  const [correctDay, setCorrectDay] = useState<Day>();
  const [daySelected, setDaySelected] = useState<Day>();
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();
  const [correctIncorrect, setCorrectIncorrect] = useState<[number, number]>([0, 0]);
  const [enableDayClick, setEnableDayClick] = useState(false);
  const [wronglyGuessedDates, setWronglyGuessedDates] = useState<Array<string>>([]);
  console.log('wronglyGuessedDates', wronglyGuessedDates);

  const dateStringToGuess = dt?.toFormat('MMMM dd, yyyy') || '';

  const generateRandomDate = () => {
    const randomNumber = randomInt(0, 365);
    const randomDate = startDate.plus({ days: randomNumber });
    setStartTime(DateTime.now());
    setDt(randomDate);
    setEnableDayClick(true);
    setCorrectDay(undefined);
    setLastAnswerCorrect(undefined);
  };

  const handleDayClick = (day: Day) => {
    if (!dt) {
      return;
    }
    setDaySelected(day);
    const dayShortName = dt.toFormat('ccc') as Day;
    const correctDayGuessed = dayShortName === day;
    setCorrectIncorrect(([correct, incorrect]) => {
      if (correctDayGuessed) {
        return [correct + 1, incorrect] as const;
      }
      return [correct, incorrect + 1] as const;
    });
    setLastAnswerCorrect(correctDayGuessed);
    if (!correctDayGuessed) {
      setWronglyGuessedDates((previous) => [...previous, dateStringToGuess]);
    }
    if (startTime) {
      const interval = Interval.fromDateTimes(startTime, DateTime.now());
      const intervalInSeconds = interval.length('seconds');
      if (intervalInSeconds) {
        setAnswerTimes((previous) => [
          ...previous,
          [intervalInSeconds, correctDayGuessed, dateStringToGuess]
        ]);
      }
    }
    setEnableDayClick(false);
    setCorrectDay(dayShortName);
  };

  const [correctValue, incorrectValue] = correctIncorrect;

  return (
    <section className='container flex h-screen w-full flex-col items-center justify-between border border-tertiary bg-secondary lg:w-2/3'>
      <div id='quiz__top-bit'>
        <div className='flex h-32 w-full flex-row items-center justify-center bg-indigo-900 md:rounded-bl-2xl md:rounded-br-2xl'>
          <h1 className='text-center text-5xl'>Doomsday Calendar Quiz</h1>
        </div>
        <div
          id='quiz__results'
          className='grid h-64 w-full grid-cols-2 flex-row items-start justify-between'
        >
          <div className='flex h-64 flex-col items-center justify-center px-8'>
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
          <div className='flex h-64 flex-col justify-start overflow-y-auto'>
            <ul className='w-full'>
              {[...answerTimes].reverse().map(([timeInSeconds, isCorrect, dateString]) => (
                <li
                  className={clsx(
                    'flex w-full flex-row justify-between bg-opacity-40 px-2',
                    isCorrect ? correctColor : incorrectColor
                  )}
                  key={`${timeInSeconds}_${isCorrect}`}
                >
                  <span>{timeInSeconds}</span>
                  <span>{dateString}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        id='quiz__date-to-guess'
        className={clsx([
          'flex h-20 w-full flex-col items-center justify-center text-center',
          lastAnswerCorrect === undefined && 'bg-gray-600',
          lastAnswerCorrect === true && correctColor,
          lastAnswerCorrect === false && incorrectColor
        ])}
      >
        {!!dt && <h2 className='text-4xl'>{dateStringToGuess}</h2>}
      </div>
      <div id='quiz__bottom-bit'>
        <div id='quiz__actions'>
          <div className='grid w-full grid-cols-7'>
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
                  disabled={!enableDayClick}
                  key={day}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                  {thisDayIsCorrect && <span className='correct-indicator'>✅</span>}
                </Button>
              );
            })}
          </div>
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
    </section>
  );
};

export default DoomsdayQuiz;
