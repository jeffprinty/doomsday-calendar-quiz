import dayjs, { Dayjs } from 'dayjs';
import { useSessionStorage } from 'usehooks-ts';

import { getRandomDateInModernity, getRandomDateInYear } from '../math/dates';

const randomGuessingDate = (initYear?: number) =>
  initYear ? getRandomDateInYear(initYear) : getRandomDateInModernity();

const useGuessingDate = (id: string, initYear?: number) => {
  const initRandomDate = randomGuessingDate(initYear);
  const [guessingDate, setGuessingDate] = useSessionStorage<Dayjs>(id, initRandomDate, {
    // initializeWithValue: false,
    serializer: (value) => dayjs(value).toISOString(),
    deserializer: (isoString) => dayjs(isoString),
  });

  const getNewDate = () => {
    const newRandomDate = randomGuessingDate(initYear);
    setGuessingDate(newRandomDate);
  };

  return [guessingDate, getNewDate] as [Dayjs, () => void];
};

export default useGuessingDate;
