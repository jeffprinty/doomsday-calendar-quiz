import dayjs, { Dayjs } from 'dayjs';
import { useSessionStorage } from 'usehooks-ts';

import { getRandomDateInModernity, getRandomDateInYear } from '../math/dates';

const randomGuessingDate = (initYear?: number) =>
  initYear ? getRandomDateInYear(initYear) : getRandomDateInModernity();

const useGuessingDate = (id: string, initYear?: number) => {
  const initRandomDate = randomGuessingDate(initYear);
  const [guessingDate, setGuessingDate] = useSessionStorage<Dayjs>(id, initRandomDate, {
    serializer: (value) => dayjs(value).toISOString(),
    deserializer: (isoString) => dayjs(isoString),
    initializeWithValue: false,
  });

  const getNewDate = () => {
    let newRandomDate = randomGuessingDate(initYear);
    if (newRandomDate.format('ddd') === guessingDate.format('ddd')) {
      console.info('same day twice in a row, rereoll');
      newRandomDate = randomGuessingDate(initYear);
    }
    setGuessingDate(newRandomDate);
  };

  return [guessingDate, getNewDate, setGuessingDate] as [Dayjs, () => void, (date: Dayjs) => void];
};

export default useGuessingDate;
