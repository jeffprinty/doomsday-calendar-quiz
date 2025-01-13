import { useState } from 'react';

import { Day } from '../common';

const useDayOfWeekGuesser = () => {
  const [correctDay, setCorrectDay] = useState<Day>();
  const [daySelected, setDaySelected] = useState<Day>();
  const onNewDayGuess = () => {
    setDaySelected(undefined);
    setCorrectDay(undefined);
  };
  const onDayClick = (clickedDay: Day, correctDay: Day) => {
    setDaySelected(clickedDay);
    setCorrectDay(correctDay);
  };
  return { correctDay, daySelected, onDayClick, onNewDayGuess };
};

export default useDayOfWeekGuesser;
