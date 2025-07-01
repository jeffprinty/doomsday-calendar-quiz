import { useState } from 'react';

import clsx from 'clsx';
import { BiSolidCheckCircle } from 'react-icons/bi';

import Button from '../components/button';
import { daysOfWeek, Weekday } from '../math/weekdays';
import { OnGuess } from './module.types';

export const WeekdayGuesser = ({
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
  const [selectedDay, setSelectedDay] = useState<Weekday>();
  const onDayClick = (dayClicked: Weekday) => {
    setSelectedDay(dayClicked);
    onGuess({ isCorrect: dayClicked === correctDay, answer: dayClicked });
  };
  return (
    <div className={clsx(className, 'grid w-full grid-cols-7')}>
      {daysOfWeek.map((day: Weekday) => {
        const thisDayIsCorrect = selectedDay !== undefined && correctDay === day;
        const thisDayWasSelected = selectedDay === day;
        const incorrectSelection = selectedDay !== correctDay;
        console.log('selectedDay !== correctDay', selectedDay, correctDay);
        return (
          <Button
            className={clsx([
              'quiz__day-of-week mx-1 px-1 text-center',
              minimizeOnGuess && !!selectedDay ? 'h-12' : 'h-24',
              incorrectSelection && thisDayWasSelected && 'bg-red-900 disabled:bg-red-900',
              thisDayIsCorrect && 'active:text-black disabled:bg-green-600 disabled:text-white',
            ])}
            data-correct-day={thisDayIsCorrect}
            disabled={disabled || (disableOnGuess && !!selectedDay)}
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

export default WeekdayGuesser;
