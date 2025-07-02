import dayjs from 'dayjs';
import { useLocalStorage } from 'usehooks-ts';

export type AvailableLocales = 'en' | 'en-gb';

const useLocale = () => {
  const [storedLocale, setCurrentLocale] = useLocalStorage<string>('date-locale', 'en');
  const currentLocale = dayjs().locale();

  if (storedLocale !== currentLocale && ['en', 'en-gb'].includes(storedLocale)) {
    console.info(`:: Loading stored locale: ${storedLocale}`);
    dayjs.locale(storedLocale);
  }

  const setLocale = (locale: AvailableLocales) => {
    setCurrentLocale(locale);
  };

  return [dayjs().locale(), setLocale] as [AvailableLocales, (locale: AvailableLocales) => void];
};

export default useLocale;
