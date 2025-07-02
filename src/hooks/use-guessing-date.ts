import { useState } from 'react';

import { Dayjs } from 'dayjs';

import { getRandomDateInModernity, getRandomDateInYear } from '../math/dates';

const useGuessingDate = (id: string, initYear?: number) => {
  const initRandomDate = initYear ? getRandomDateInYear(initYear) : getRandomDateInModernity();
  const [guessingDate, setGuessingDate] = useState(initRandomDate);

  const getNewDate = () => {
    const newRandomDate = initYear ? getRandomDateInYear(initYear) : getRandomDateInModernity();
    setGuessingDate(newRandomDate);
  };

  return [guessingDate, getNewDate] as [Dayjs, () => void];
};

export default useGuessingDate;
