import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime, Interval } from 'luxon';
import randomInt from 'random-int';
import { PieChart } from 'react-minimal-pie-chart';

import Button from './button';

//ES6 const, let
//ES6 Destructuring

const startDate = DateTime.fromISO('2025-01-01');

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const correctColor = 'bg-green-600';
const incorrectColor = 'bg-red-900';

const DoomsdayQuiz = () => {
  const [dt, setDt] = useState<DateTime>();
  const [startTime, setStartTime] = useState<DateTime>();
  const [answerTimes, setAnswerTimes] = useState<Array<[number, boolean, string]>>([]);
  const [correctDay, setCorrectDay] = useState<string>('');
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();
  const [correctIncorrect, setCorrectIncorrect] = useState<[number, number]>([0, 0]);
  const [enableDayClick, setEnableDayClick] = useState(false);

  const dateStringToGuess = dt?.toFormat('MMMM dd, yyyy') || '';

  const generateRandomDate = () => {
    const randomNumber = randomInt(0, 365);
    const randomDate = startDate.plus({ days: randomNumber });
    setStartTime(DateTime.now());
    setDt(randomDate);
    setEnableDayClick(true);
    setCorrectDay('');
    setLastAnswerCorrect(undefined);
  };

  const handleDayClick = (day: string) => {
    if (!dt) {
      return;
    }
    const dayShortName = dt.toFormat('ccc');
    const correctDayGuessed = dayShortName === day;
    setCorrectIncorrect(([correct, incorrect]) => {
      if (correctDayGuessed) {
        return [correct + 1, incorrect] as const;
      }
      return [correct, incorrect + 1] as const;
    });
    setLastAnswerCorrect(correctDayGuessed);
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
    setCorrectDay(dayShortName);
  };

  const [correctValue, incorrectValue] = correctIncorrect;

  return (
    <section className='container flex h-full w-full flex-col items-center justify-between rounded-xl border border-tertiary bg-secondary py-10 lg:w-1/3'>
      <div className='grid h-64 w-full grid-cols-2 flex-row items-start justify-between'>
        <div className='px-16'>
          <PieChart
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
            data={[
              { title: 'Correct', value: correctValue, color: '#66FF66' },
              { title: 'Incorrect', value: incorrectValue, color: '#C13C37' }
            ]}
          />
        </div>
        <div className='flex h-64 flex-col justify-start overflow-y-auto px-8'>
          <ul>
            {[...answerTimes].reverse().map(([timeInSeconds, isCorrect, dateString]) => (
              <li
                className={clsx(
                  'flex flex-row justify-between',
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
      <div
        className={clsx([
          'flex h-20 w-full flex-col items-center justify-center text-center',
          lastAnswerCorrect === undefined && 'bg-gray-600',
          lastAnswerCorrect === true && correctColor,
          lastAnswerCorrect === false && incorrectColor
        ])}
      >
        {!!dt && <h2 className='text-4xl'>{dateStringToGuess}</h2>}
      </div>
      <div className='grid w-full grid-cols-7'>
        {daysOfWeek.map((day) => (
          <Button disabled={!enableDayClick} key={day} onClick={() => handleDayClick(day)}>
            {day} {correctDay === day && '✅'}
          </Button>
        ))}
      </div>
      <div className='flex-row items-center justify-center'>
        <Button onClick={generateRandomDate}>click</Button>
      </div>
    </section>
  );
};

export default DoomsdayQuiz;
