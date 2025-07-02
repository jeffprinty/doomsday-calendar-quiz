import { createContext, ReactNode } from 'react';

import useLocale, { AvailableLocales } from './hooks/use-locale';

interface AppContextShape {
  locale: AvailableLocales;
}

export const AppContext = createContext<AppContextShape>({ locale: 'en' });

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [locale] = useLocale();
  return <AppContext.Provider value={{ locale }}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
