import { ReactNode } from 'react';

import { Route, Routes } from 'react-router-dom';

import AllSteps from './all-steps';
import { Home } from './components/home';
import LongCalendar from './components/long-calendar';
import MonthDoomsdayCalendar from './components/month-doomsday-calendar';
import NavBar, { NavItem } from './components/nav-bar';
import GuessDateDoomsdayInModernity from './guess-date-doomsday';
import GuessDateDoomsday from './guess-date-doomsday-within-year.old';
import GuessFullDateV1 from './guess-full-date-v1';
import GuessOffsetForDate from './guess-offset-for-date';
import GuessProgressive from './guess-progressive';
import GuessYearDoomsday from './guess-year-doomsday';
import OddPlusEleven from './modules/odd-plus-eleven';
import Reference from './reference';
import StepOne from './step-1';

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
    path: '/learn/doomsday',
    element: <MonthDoomsdayCalendar />,
    text: 'month doomsday',
    category: 'practice',
    description: 'Learn the Doomsdays for Each Month',
  },
  {
    path: '/learn/reference',
    element: <Reference />,
    text: 'reference',
    extra: true,
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
    element: <GuessDateDoomsday />,
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
      <h2>GuessDateDoomsday</h2>
      <GuessDateDoomsday />
      <h2>StepOne</h2>
      <StepOne />
      <h2>GuessYearDoomsday</h2>
      <GuessYearDoomsday />
      <h2>GuessFullDateV1</h2>
      <GuessFullDateV1 />
      <h2>GuessProgressive</h2>
      <GuessProgressive />
      <h2>LongCalendar</h2>
      <LongCalendar />
      <h2>GuessOffsetForDate</h2>
      <GuessOffsetForDate />
    </div>
  );
};

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const Base = () => {
  return (
    <main className='flex h-screen max-w-full flex-col items-center justify-start bg-primary text-color'>
      <NavBar navItems={navLinks} />
      <div className='flex w-full flex-grow flex-col items-center justify-start sm:w-1/2 md:max-w-[1240px]'>
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
