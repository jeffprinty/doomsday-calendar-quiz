import { Fragment, ReactNode, useContext } from 'react';

import { Route, Routes } from 'react-router-dom';

import { AppContext } from './app.context';
import NavBar, { NavItem } from './components/nav-bar';
import AllSteps from './pages/all-steps';
import GuessDateDoomsdayInModernity from './pages/guess-date-doomsday';
import GuessDateDoomsdayWithinYear from './pages/guess-date-doomsday-within-year.old';
import GuessFullDateV1 from './pages/guess-full-date-v1';
import GuessOffsetForDate from './pages/guess-offset-for-date';
import GuessProgressive from './pages/guess-progressive';
import GuessYearDoomsday from './pages/guess-year-doomsday';
import Home from './pages/home';
import MonthDoomsdayCalendar from './pages/month-doomsday-calendar';
import OddPlusEleven from './pages/odd-plus-eleven';
import Reference from './pages/reference';
import StepOne from './pages/step-1';

const baseUrl = import.meta.env.BASE_URL;
const currentYear = new Date().getFullYear().toString();

interface RouteArray extends Pick<NavItem, 'category' | 'end' | 'extra' | 'text'> {
  path: string;
  element: ReactNode;
  index?: boolean;
  description?: string;
}

const routeArray: Array<RouteArray> = [
  {
    path: '/',
    index: true,
    element: <Home />,
    text: 'home',
    end: true,
    category: 'top',
  },
  {
    path: '/learn/reference',
    element: <Reference />,
    text: 'reference',
    extra: true,
    category: 'top',
  },
  {
    path: '/learn/doomsday',
    element: <MonthDoomsdayCalendar />,
    text: 'month doomsday',
    category: 'practice',
    description: 'Learn the Doomsdays for Each Month',
  },
  {
    path: '/odd',
    element: <OddPlusEleven />,
    text: 'Odd + 11',
    category: 'practice',
    description: 'Learn the Improved Method for Determining the Doomsyear',
  },
  {
    path: '/within',
    element: <GuessDateDoomsdayWithinYear />,
    text: currentYear,
    category: 'practice',
  },
  {
    path: '/within-modernity',
    element: <GuessDateDoomsdayInModernity />,
    text: 'modernity',
    category: 'practice',
  },
  {
    path: '/date-offset',
    element: <GuessOffsetForDate />,
    text: 'offset',
    category: 'practice',
  },
  {
    path: '/step1',
    element: <StepOne />,
    text: 'step1',
    extra: true,
    category: 'deprecated',
  },
  {
    path: '/steps',
    element: <AllSteps />,
    text: 'steps',
    extra: true,
    category: 'deprecated',
  },
  {
    path: '/year',
    element: <GuessYearDoomsday />,
    text: 'year',
    extra: true,
    category: 'deprecated',
  },
  {
    path: '/full',
    element: <GuessFullDateV1 />,
    text: 'full',
    extra: true,
    category: 'deprecated',
  },
  {
    path: '/progressive',
    element: <GuessProgressive />,
    text: 'progressive',
    extra: true,
    category: 'deprecated',
  },
];

const navLinks: Array<NavItem> = routeArray.map(({ path, element, index, ...navItem }) => ({
  to: `${baseUrl}${path}`,
  ...navItem,
}));

const AllPages = () => {
  return (
    <div className='flex flex-col'>
      {routeArray.map(({ element, text }) => (
        <Fragment key={text}>
          <h2>{text}</h2>
          {element}
        </Fragment>
      ))}
    </div>
  );
};

const Base = () => {
  const { locale } = useContext(AppContext);
  return (
    <main className='flex h-screen max-w-full flex-col items-center justify-start bg-primary text-color'>
      <NavBar navItems={navLinks} />
      <div
        className='flex w-full flex-grow flex-col items-center justify-start sm:w-1/2 md:max-w-[1240px]'
        key={locale}
      >
        <Routes>
          {routeArray.map((routeProps) => (
            <Route {...routeProps} key={routeProps.path} />
          ))}
          <Route path='/all' element={<AllPages />} />
        </Routes>
      </div>
    </main>
  );
};

export default Base;
