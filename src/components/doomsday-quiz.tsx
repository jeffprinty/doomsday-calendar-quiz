import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import clsx from 'clsx';
import { DateTime, Interval } from 'luxon';
import randomInt from 'random-int';

import Button from './button';

//ES6 const, let
//ES6 Destructuring

const startDate = DateTime.fromISO('2025-01-01');

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DoomsdayQuiz = () => {
  const [dt, setDt] = useState<DateTime>();
  const [startTime, setStartTime] = useState<DateTime>();
  const [answerTimes, setAnswerTimes] = useState<Array<[number, boolean]>>([]);
  const [correctDay, setCorrectDay] = useState<string>('');
  const [correctIncorrect, setCorrectIncorrect] = useState<[number, number]>([0, 0]);
  const [enableDayClick, setEnableDayClick] = useState(false);

  const generateRandomDate = () => {
    const randomNumber = randomInt(0, 365);
    const randomDate = startDate.plus({ days: randomNumber });
    setStartTime(DateTime.now());
    setDt(randomDate);
    setEnableDayClick(true);
    setCorrectDay('');
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
    if (startTime) {
      const interval = Interval.fromDateTimes(startTime, DateTime.now());
      const intervalInSeconds = interval.length('seconds');
      if (intervalInSeconds) {
        setAnswerTimes((previous) => [...previous, [intervalInSeconds, correctDayGuessed]]);
      }
    }
    setCorrectDay(dayShortName);
  };

  const [correctValue, incorrectValue] = correctIncorrect;

  return (
    <section className='container flex h-full w-full flex-col items-center justify-between rounded-xl border border-tertiary bg-secondary py-10 lg:w-1/3'>
      <div className='flex h-20 w-full flex-col items-center justify-center bg-gray-600 text-center'>
        {!!dt && <h2 className='text-4xl'>{dt.toFormat('MMMM dd, yyyy')}</h2>}
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
      <div className='grid w-full grid-cols-2 flex-row items-center justify-between'>
        <div className='p-8'>
          <PieChart
            label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
            data={[
              { title: 'Correct', value: correctValue, color: '#66FF66' },
              { title: 'Incorrect', value: incorrectValue, color: '#C13C37' }
            ]}
          />
        </div>
        <div className='flex h-64 flex-col justify-start overflow-y-auto p-8'>
          <ul>
            {[...answerTimes].reverse().map(([timeInSeconds, isCorrect]) => (
              <li
                className={clsx(isCorrect ? 'bg-green-600' : 'bg-red-600')}
                key={`${timeInSeconds}_${isCorrect}`}
              >
                {timeInSeconds}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default DoomsdayQuiz;
