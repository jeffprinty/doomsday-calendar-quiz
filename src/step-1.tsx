import { useState } from 'react';

import Button from './components/button';
import MonthDoomsdayCalendar from './components/month-doomsday-calendar';
import { StepDisplay } from './components/shared';
import GuessOffsetForDate from './guess-offset-for-date';
import { mnemonics } from './math/month-doomsdays';

const StepOne = () => {
  const [step, setStep] = useState(1);
  console.log('step', step);
  return (
    <div className='' id='page__step-one'>
      <div className='steps-wrapper'>
        <StepDisplay>
          <div>
            <a href='https://en.wikipedia.org/wiki/Doomsday_rule#Memorable_dates_that_always_land_on_Doomsday'>
              wikipedia: Memorable Dates table
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Doomsday</th>
                <th>Handle</th>
              </tr>
            </thead>
            <tbody>
              {mnemonics.map(({ common, leap, memeticHandle, monthName, monthNumber }) => (
                <tr key={monthName}>
                  <td className=''>{monthName}</td>
                  <td className=''>
                    {monthNumber}/{common}
                    {!!leap && (
                      <span className='px-4 text-violet-500'>
                        {monthNumber}/{leap}
                      </span>
                    )}
                  </td>
                  <td>{memeticHandle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StepDisplay>
        <StepDisplay>
          <GuessOffsetForDate />
        </StepDisplay>
        <StepDisplay>
          <MonthDoomsdayCalendar />
          <div>
            This will help you improve at converting the English word for the month to the month
            number.
          </div>
          <Button onClick={() => setStep((previous) => previous + 1)}>Next</Button>
        </StepDisplay>
        <StepDisplay>
          <div>
            <p>
              First, you need to commit the month mnemonics to memory. They’re only 12 of them, and
              there are mnemonics that you can use to help you remember them. You can customize
              these based on what is the most memorable for you. For instance, if one of these dates
              falls on your birthday that will be more memetically sticky. Part of committing
              something to memory is to link it to something familiar to reinforce those connections
              within your brain.
            </p>
          </div>
          <div className='explainer'>
            {mnemonics.map(({ monthName, common, monthNumber }) => {
              return (
                <div
                  key={monthName}
                  className='flex flex-row items-center justify-between text-center'
                >
                  {monthName}
                  <div className=''>
                    {monthNumber}/{common}
                  </div>
                </div>
              );
            })}
          </div>
        </StepDisplay>
      </div>
    </div>
  );
};

export default StepOne;
