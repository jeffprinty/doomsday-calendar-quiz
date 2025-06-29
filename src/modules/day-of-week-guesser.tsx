import { useState } from 'react';

import clsx from 'clsx';

import Button from '../components/button';
import { daysOfWeek, Weekday } from '../math/weekdays';
import { OnGuess } from './module.types';

export const DayOfWeekGuesserSelfContained = ({
  correctDay,
  disabled,
  disableOnGuess,
  onGuess,
}: {
  correctDay: Weekday;
  disabled?: boolean;
  disableOnGuess?: boolean;
  onGuess: OnGuess<Weekday>;
}) => {
  const [daySelected, setDaySelected] = useState<Weekday>();
  const handleDayClick = (dayClicked: Weekday) => {
    setDaySelected(dayClicked);
    onGuess(dayClicked, dayClicked === correctDay);
  };
  return (
    <DayOfWeekGuesser
      correctDay={correctDay}
      daySelected={daySelected}
      onDayClick={handleDayClick}
      disabled={disabled || (disableOnGuess && !!daySelected)}
    />
  );
};

const DayOfWeekGuesser = ({
  correctDay,
  daySelected,
  disabled = false,
  onDayClick,
}: {
  correctDay?: Weekday;
  daySelected?: Weekday;
  disabled?: boolean;
  onDayClick: (dayClicked: Weekday) => void;
}) => {
  return (
    <div className='grid w-full grid-cols-7'>
      {daysOfWeek.map((day: Weekday) => {
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
