import { useState } from 'react';

import clsx from 'clsx';
import { BiSolidCheckCircle } from 'react-icons/bi';

import Button from '../components/button';
import { daysOfWeek, Weekday } from '../math/weekdays';
import { OnGuess } from './module.types';

export const DayOfWeekGuesserSelfContained = ({
  className,
  correctDay,
  disabled,
  disableOnGuess,
  onGuess,
  minimizeOnGuess,
}: {
  className?: string;
  correctDay: Weekday;
  disabled?: boolean;
  disableOnGuess?: boolean;
  onGuess: OnGuess<Weekday>;
  minimizeOnGuess?: boolean;
}) => {
  const [daySelected, setDaySelected] = useState<Weekday>();
  const handleDayClick = (dayClicked: Weekday) => {
    setDaySelected(dayClicked);
    onGuess(dayClicked, dayClicked === correctDay);
  };
  return (
    <DayOfWeekGuesser
      className={className}
      correctDay={correctDay}
      daySelected={daySelected}
      onDayClick={handleDayClick}
      disabled={disabled || (disableOnGuess && !!daySelected)}
      minimizeOnGuess={minimizeOnGuess}
    />
  );
};

const DayOfWeekGuesser = ({
  className,
  correctDay,
  daySelected,
  disabled = false,
  onDayClick,
  minimizeOnGuess,
}: {
  className?: string;
  correctDay?: Weekday;
  daySelected?: Weekday;
  disabled?: boolean;
  onDayClick: (dayClicked: Weekday) => void;
  minimizeOnGuess?: boolean;
}) => {
  return (
    <div className={clsx(className, 'grid w-full grid-cols-7')}>
      {daysOfWeek.map((day: Weekday) => {
        const thisDayIsCorrect = daySelected !== undefined && correctDay === day;
        const thisDayWasSelected = daySelected === day;
        const incorrectSelection = daySelected !== correctDay;
        return (
          <Button
            className={clsx([
              'quiz__day-of-week mx-1 h-24 px-1 text-center',
              minimizeOnGuess && 'h-12',
              incorrectSelection && thisDayWasSelected && 'bg-red-900 disabled:bg-red-900',
              thisDayIsCorrect && 'active:text-black disabled:bg-green-600 disabled:text-white',
            ])}
            data-correct-day={thisDayIsCorrect}
            disabled={disabled}
            key={day}
            onClick={() => onDayClick(day)}
          >
            {day}
            {thisDayIsCorrect && (
              <span className='correct-indicator rounded-xl bg-white text-xl'>
                <BiSolidCheckCircle className='fill-green-600' />
              </span>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default DayOfWeekGuesser;
