import React, { useState } from 'react';

import { DateTime } from 'luxon';
import randomInt from 'random-int';

import Button from './button';

//ES6 const, let
//ES6 Destructuring

const startDate = DateTime.fromISO('2025-01-01');

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DoomsdayQuiz = () => {
  const [dt, setDt] = useState<DateTime>();
  const [correctDay, setCorrectDay] = useState<string>('');
  const generateNumber = () => {
    const randomNumber = randomInt(0, 365);
    const randomDate = startDate.plus({ days: randomNumber });
    setDt(randomDate);
    setCorrectDay('');
  };

  const handleDayClick = (day: string) => {
    if (!dt) {
      return;
    }
    // setShowDay(false);
    // const randomNum = randomInt(0, 365);
    // const randomDate = startDate.plus({ days: randomNum });
    // setDt(randomDate);
    const dayShortName = dt.toFormat('ccc');
    const correctDayGuessed = dayShortName === day;
    console.log('correctDayGuessed', dayShortName, day, correctDayGuessed);
    setCorrectDay(dayShortName);
  };

  return (
    <section className='container flex h-72 w-1/3 flex-col items-center justify-between rounded-xl border border-tertiary bg-secondary py-10'>
      <div className='flex h-20 w-full flex-col items-center justify-center bg-gray-600 text-center'>
        {!!dt && <h2 className='text-5xl'>{dt.toFormat('MMMM dd, yyyy')}</h2>}
      </div>
      <div className='grid grid-cols-7'>
        {daysOfWeek.map((day) => (
          <Button key={day} onClick={() => handleDayClick(day)}>
            {day} {correctDay === day && '✅'}
          </Button>
        ))}
      </div>
      <div className='flex-row items-center justify-center'>
        <Button onClick={generateNumber}>click</Button>
      </div>
    </section>
  );
};

export default DoomsdayQuiz;
