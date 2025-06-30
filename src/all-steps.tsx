import { useState } from 'react';

import { DateTime } from 'luxon';

import Button from './components/button';
import MnemonicsTable from './components/mnemonics-table';
import MonthDoomsdayCalendar from './components/month-doomsday-calendar';
import { PageDescribe } from './components/page-describe';
import { Hint, StepDisplay } from './components/shared';
import GuessDateDoomsdayInModernity from './guess-date-doomsday';
import GuessDateWithinYear from './guess-date-doomsday-within-year.old';
import GuessOffsetForDate from './guess-offset-for-date';
import { getDoomsdayForYear } from './math/year';
import OddPlusEleven from './modules/odd-plus-eleven';

const stepClassName = 'pb-6';
const stepHeadingClassName = 'text-2xl';

const AllSteps = () => {
  const now = DateTime.now();
  const currentYear = now.year;
  const currentYearDoomsday = getDoomsdayForYear(currentYear).toFormat('cccc');
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
      <StepDisplay className={stepClassName} show={showAllSteps || currentStep === 0}>
        <h4 className={stepHeadingClassName}>Step 1: MonthDoomsdayCalendar</h4>
        <PageDescribe>First learn the doomsday for the months</PageDescribe>
        <MonthDoomsdayCalendar />
        <Hint>
          <MnemonicsTable />
        </Hint>
      </StepDisplay>
      <StepDisplay className={stepClassName} show={showAllSteps || currentStep === 1}>
        <h4 className={stepHeadingClassName}>Step 2: GuessOffsetForDate</h4>
        <PageDescribe>
          Practice calculating the difference between a given day of a month and that month&apos;s
          doomsday.
        </PageDescribe>
        <GuessOffsetForDate />
      </StepDisplay>
      <StepDisplay className={stepClassName} show={showAllSteps || currentStep === 2}>
        <h4 className={stepHeadingClassName}>
          Step 3: Remember the Doomsday for {currentYear} is {currentYearDoomsday}
        </h4>
        <PageDescribe>
          Now we start to care about years. For the initial stages of learning, we focus on the most
          useful aspect, the doomsday for the current year.
        </PageDescribe>
      </StepDisplay>
      <StepDisplay className={stepClassName} show={showAllSteps || currentStep === 3}>
        <h4 className={stepHeadingClassName}>Step 4: GuessDateDoomsday</h4>
        <GuessDateWithinYear year={currentYear} />
      </StepDisplay>
      <StepDisplay className={stepClassName} show={showAllSteps || currentStep === 4}>
        <h4 className={stepHeadingClassName}>Step 5: GuessDateDoomsday</h4>
        <OddPlusEleven />
      </StepDisplay>
      <StepDisplay className={stepClassName} show={showAllSteps || currentStep === 5}>
        <h4 className={stepHeadingClassName}>Step ?: Doomsyear</h4>
        <div></div>
      </StepDisplay>
      <StepDisplay className={stepClassName} show={showAllSteps || currentStep === 3}>
        <h4 className={stepHeadingClassName}>Step 4: GuessDateDoomsday</h4>
        <GuessDateDoomsdayInModernity />
      </StepDisplay>
    </div>
  );
};

export default AllSteps;
