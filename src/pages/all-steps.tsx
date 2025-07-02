import { useState } from 'react';

import clsx from 'clsx';

import Button from '../components/button';
import MnemonicsTable from '../components/mnemonics-table';
import { PageDescribe } from '../components/page-describe';
import { Hint } from '../components/shared';
import { getDoomsdayFullWeekdayForYear } from '../math/dates';
import GuessDateDoomsdayInModernity from '../pages/guess-date-doomsday';
import GuessDateWithinYear from '../pages/guess-date-doomsday-within-year.old';
import MonthDoomsdayCalendar from '../pages/month-doomsday-calendar';
import OddPlusEleven from '../pages/odd-plus-eleven';
import GuessOffsetForDate from './guess-offset-for-date';

const stepClassName = 'pb-6';
const stepHeadingClassName = 'text-2xl';

const Step = ({
  className,
  children,
  show = true,
}: {
  className?: string;
  children: React.ReactNode | Array<React.ReactNode> | string;
  show?: boolean;
}) => {
  return (
    <div
      className={clsx(
        'step-display',
        'my-6 rounded-2xl border border-solid border-indigo-600 p-4',
        !show && 'hidden',
        className
      )}
    >
      {children}
    </div>
  );
};

const AllSteps = () => {
  const currentYear = new Date().getFullYear();
  const currentYearDoomsday = getDoomsdayFullWeekdayForYear(currentYear);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(true);

  const steps = [
    { title: 'Learn Doomsday for Months' },
    { title: 'Practice calculating offset' },
    { title: 'Remember doomsday for current year' },
  ];

  return (
    <div id='page__all-steps'>
      <h3>All Steps</h3>
      <div></div>
      <div>
        {steps.map(({ title }, index) => (
          <Button
            key={title}
            onClick={() => setCurrentStep(index)}
            selected={currentStep === index}
          >
            Step {index + 1}
          </Button>
        ))}
        <Button onClick={() => setShowAllSteps(!showAllSteps)}>
          {showAllSteps ? 'Hide' : 'Show'} All Steps
        </Button>
      </div>
      <Step className={stepClassName} show={showAllSteps || currentStep === 0}>
        <h4 className={stepHeadingClassName}>Step 1: MonthDoomsdayCalendar</h4>
        <PageDescribe>First learn the doomsday for the months</PageDescribe>
        <MonthDoomsdayCalendar />
        <Hint>
          <MnemonicsTable />
        </Hint>
      </Step>
      <Step className={stepClassName} show={showAllSteps || currentStep === 1}>
        <h4 className={stepHeadingClassName}>Step 2: GuessOffsetForDate</h4>
        <PageDescribe>
          Practice calculating the difference between a given day of a month and that month&apos;s
          doomsday.
        </PageDescribe>
        <GuessOffsetForDate />
      </Step>
      <Step className={stepClassName} show={showAllSteps || currentStep === 2}>
        <h4 className={stepHeadingClassName}>
          Step 3: Remember the Doomsday for {currentYear} is {currentYearDoomsday}
        </h4>
        <PageDescribe>
          Now we start to care about years. For the initial stages of learning, we focus on the most
          useful aspect, the doomsday for the current year.
        </PageDescribe>
      </Step>
      <Step className={stepClassName} show={showAllSteps || currentStep === 3}>
        <h4 className={stepHeadingClassName}>Step 4: GuessDateDoomsday</h4>
        <GuessDateWithinYear year={currentYear} />
      </Step>
      <Step className={stepClassName} show={showAllSteps || currentStep === 4}>
        <h4 className={stepHeadingClassName}>Step 5: GuessDateDoomsday</h4>
        <OddPlusEleven />
      </Step>
      <Step className={stepClassName} show={showAllSteps || currentStep === 5}>
        <h4 className={stepHeadingClassName}>Step ?: Doomsyear</h4>
        <div></div>
      </Step>
      <Step className={stepClassName} show={showAllSteps || currentStep === 3}>
        <h4 className={stepHeadingClassName}>Step 4: GuessDateDoomsday</h4>
        <GuessDateDoomsdayInModernity />
      </Step>
    </div>
  );
};

export default AllSteps;
