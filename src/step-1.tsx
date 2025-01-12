import React, { useState } from 'react';

import { mnemonics } from './common';

const StepOne = () => {
  const [step, setStep] = useState();
  return (
    <div className='md:w-1/2' id='page__step-one'>
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
      <div className='steps-wrapper'>
        <div></div>
      </div>
      <div>
        <p>
          First, you need to commit the month mnemonics to memory. They’re only 12 of them, and
          there are mnemonics that you can use to help you remember them. You can customize these
          based on what is the most memorable for you. For instance, if one of these dates falls on
          your birthday that will be more memetically sticky. Part of committing something to memory
          is to link it to something familiar to reinforce those connections within your brain.
        </p>
      </div>
      <div className='explainer'>
        {mnemonics.map(({ monthName, common, monthNumber }) => {
          return (
            <div key={monthName} className='flex flex-row items-center justify-between text-center'>
              {monthName}
              <div className=''>
                {monthNumber}/{common}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepOne;
