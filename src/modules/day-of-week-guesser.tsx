import React, { useState } from 'react';

import clsx from 'clsx';

import { Day, daysOfWeek } from '../common';
import Button from '../components/button';
import { OnGuess } from './module.types';

export const DayOfWeekGuesserSelfContained = ({
  correctDay,
  disabled,
  onGuess,
}: {
  correctDay: Day;
  disabled?: boolean;
  onGuess: OnGuess<Day>;
}) => {
  const [daySelected, setDaySelected] = useState<Day>();
  const handleDayClick = (dayClicked: Day) => {
    setDaySelected(dayClicked);
    onGuess(dayClicked, dayClicked === correctDay);
  };
  return (
    <DayOfWeekGuesser
      correctDay={correctDay}
      daySelected={daySelected}
      onDayClick={handleDayClick}
      disabled={disabled}
    />
  );
};

const DayOfWeekGuesser = ({
  correctDay,
  daySelected,
  disabled = false,
  onDayClick,
}: {
  correctDay?: Day;
  daySelected?: Day;
  disabled?: boolean;
  onDayClick: (dayClicked: Day) => void;
}) => {
  return (
    <div className='grid w-full grid-cols-7'>
      {daysOfWeek.map((day: Day) => {
        const thisDayIsCorrect = daySelected !== undefined && correctDay === day;
        const thisDayWasSelected = daySelected === day;
        const incorrectSelection = daySelected !== correctDay;
        return (
          <Button
            className={clsx([
              'quiz__day-of-week mx-1 h-24 px-1 text-center',
              incorrectSelection && thisDayWasSelected && 'disabled:bg-red-900',
              thisDayIsCorrect && 'active:text-black disabled:bg-green-600 disabled:text-white',
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

export default DayOfWeekGuesser;
