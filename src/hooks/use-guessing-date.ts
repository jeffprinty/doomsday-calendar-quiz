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
  });

  const getNewDate = () => {
    let newRandomDate = randomGuessingDate(initYear);
    console.log(
      "newRandomDate.format('ddd')",
      newRandomDate.format('ddd'),
      guessingDate.format('ddd')
    );
    if (newRandomDate.format('ddd') === guessingDate.format('ddd')) {
      console.info('same day twice in a row, rereoll');
      newRandomDate = randomGuessingDate(initYear);
    }
    setGuessingDate(newRandomDate);
  };

  return [guessingDate, getNewDate] as [Dayjs, () => void];
};

export default useGuessingDate;
