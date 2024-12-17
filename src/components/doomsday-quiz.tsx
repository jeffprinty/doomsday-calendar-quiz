import React, { useState } from 'react';

import { DateTime } from 'luxon';
import randomInt from 'random-int';

//ES6 const, let
//ES6 Destructuring

const startDate = DateTime.fromISO('2025-01-01');

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DoomsdayQuiz = () => {
  const [dt, setDt] = useState<DateTime | null>(null);
  const [correctDay, setCorrectDay] = useState<string>('');
  const [showDay, setShowDay] = useState(false);
  const generateNumber = () => {
    setShowDay(false);
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
    <div>
      <div>{!!dt && dt.toFormat('MMMM dd')}</div>
      <div>{!!showDay && !!dt && dt.toFormat('EEEE')}</div>
      <br />
      <button onClick={generateNumber}>click</button>
      <br />
      <br />
      <div>
        {daysOfWeek.map((day) => (
          <button key={day} onClick={() => handleDayClick(day)}>
            {day} {correctDay === day && '✅'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DoomsdayQuiz
