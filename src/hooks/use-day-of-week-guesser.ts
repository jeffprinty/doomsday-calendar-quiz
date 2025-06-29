import { useState } from 'react';

import { Weekday } from '../math/weekdays';

const useDayOfWeekGuesser = () => {
  const [correctDay, setCorrectDay] = useState<Weekday>();
  const [daySelected, setDaySelected] = useState<Weekday>();
  const onNewDayGuess = () => {
    setDaySelected(undefined);
    setCorrectDay(undefined);
  };
  const onDayClick = (clickedDay: Weekday, correctDay: Weekday) => {
    setDaySelected(clickedDay);
    setCorrectDay(correctDay);
  };
  return { correctDay, daySelected, onDayClick, onNewDayGuess };
};

export default useDayOfWeekGuesser;
