import { ReactNode, useState } from 'react';

import { DateTime } from 'luxon';

import Button from './components/button';
import MnemonicsTable from './components/mnemonics-table';
import MonthDoomsdayCalendar from './components/month-doomsday-calendar';
import { PageDescribe } from './components/page-describe';
import GuessDateDoomsdayWithinYear from './guess-date-doomsday-within-year';
import GuessOnlyDate from './guess-only-date';
import { getDoomsdayForYear } from './math/year';
import OddPlusEleven from './modules/odd-plus-eleven';

const Hint = ({ children }: { children: ReactNode | Array<ReactNode> }) => {
  const [showHint, setShowHint] = useState(false);
  return (
    <div className='hint'>
      <Button onClick={() => setShowHint(!showHint)}>{showHint ? 'Hide' : 'Show'} Hint</Button>
      {showHint && <div className=''>{children}</div>}
    </div>
  );
};

const stepClassName = 'pb-6';
const stepHeadingClassName = 'text-2xl';

const AllSteps = () => {
  const now = DateTime.now();
  const currentYear = now.year;
  const currentYearDoomsday = getDoomsdayForYear(currentYear).toFormat('cccc');
  return (
    <div id='page__all-steps'>
      <h3>All Steps</h3>
      <div className={stepClassName}>
        <h4 className={stepHeadingClassName}>Step 1: MonthDoomsdayCalendar</h4>
        <PageDescribe>First learn the doomsday for the months</PageDescribe>
        <MonthDoomsdayCalendar />
        <Hint>
          <MnemonicsTable />
        </Hint>
      </div>
      <div className={stepClassName}>
        <h4 className={stepHeadingClassName}>Step 2: GuessOnlyDate</h4>
        <GuessOnlyDate />
      </div>
      <div className={stepClassName}>
        <h4 className={stepHeadingClassName}>
          Step 3: Remember the Doomsday for {currentYear} is {currentYearDoomsday}
        </h4>
        <PageDescribe>
          Now we start to care about years. For the initial stages of learning, we focus on the most
          useful aspect, the doomsday for the current year.
        </PageDescribe>
      </div>
      <div className={stepClassName}>
        <h4 className={stepHeadingClassName}>Step 4: GuessDateDoomsdayWithinYear</h4>
        <GuessDateDoomsdayWithinYear year={currentYear} />
      </div>
      <div className={stepClassName}>
        <h4 className={stepHeadingClassName}>Step 5: GuessDateDoomsdayWithinYear</h4>
        <OddPlusEleven />
      </div>
      <div className={stepClassName}>
        <h4 className={stepHeadingClassName}>Step ?: Doomsyear</h4>
        <div></div>
      </div>
    </div>
  );
};

export default AllSteps;
