import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime } from 'luxon';

import {
  AnchorDayCentury,
  dayNames,
  fullDateWithWeekdayFormat,
  getAnchorDayForCentury,
  step0,
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
} from '../common';
import Button from './button';

const unrevealed = 'opacity-5';

const ProgressiveMathOld = ({ year }: { showAnswers?: boolean; year: number }) => {
  const [revealedSteps, setRevealedSteps] = useState(0);

  // <YEAR MATH>
  const twoDigitYear = Number(year.toString().slice(2, 4));
  const howManyTwelves = Math.floor(twoDigitYear / 12);
  const stepOneResult = howManyTwelves * 12;
  const stepTwoResult = twoDigitYear - stepOneResult;
  const howManyFours = Math.floor(stepTwoResult / 4);

  const century = year.toString().slice(0, 2);
  const anchorDayForCentury = getAnchorDayForCentury(century as AnchorDayCentury);

  const addedUp = howManyTwelves + stepTwoResult + howManyFours + anchorDayForCentury;

  const howManySevens = Math.floor(addedUp / 7);

  const resultAfterSubtractingSevens = addedUp - howManySevens * 7;

  const doomsdayIs = dayNames[resultAfterSubtractingSevens];
  // </YEAR MATH>

  const doomsdayOnYear = DateTime.fromObject({
    year,
    month: 4,
    day: 4,
  });

  return (
    <div className='hidden'>
      <Button onClick={() => setRevealedSteps((previous) => previous + 1)}>next step</Button>
      <div id='stepZero' className={clsx(revealedSteps < 0 && unrevealed)}>
        <span className=''>{century} </span>
        <span className={step0}>{twoDigitYear.toString()} </span>
      </div>
      <div id='stepOne' className={clsx(revealedSteps < 1 && unrevealed)}>
        <span className={step0}>{twoDigitYear} </span>
        <span className=''>/ 12</span>
        <span className=''> = </span>
        <span className={step1}> {howManyTwelves} </span>
        <span className=''>, </span>
        <span className={step1}>{howManyTwelves}</span>
        <span className=''> x 12 = </span>
        <span className=''> {stepOneResult} </span>
      </div>
      <div id='stepTwo' className={clsx(revealedSteps < 2 && unrevealed)}>
        <span className={step0}>{twoDigitYear} </span>
        <span className=''> - </span>
        <span className=''>{stepOneResult}</span>
        <span className=''> = </span>
        <span className={step2}> {stepTwoResult} </span>
      </div>
      {/*
      <div className=''>
        <span className=''>{twoDigitYear} </span>
        <span className=''> - </span>
        <span className=''> {howManyTwelves * 12} </span>
        <span className=''> = </span>
        <span className={stepTwo}> {stepTwoResult} </span>
      </div>
      */}
      <div id='stepThree' className={clsx(revealedSteps < 3 && unrevealed)}>
        <span className={step2}>{stepTwoResult} </span>
        <span className=''> / </span>
        <span className=''> 4 </span>
        <span className=''> = </span>
        <span className={step3}> {howManyFours} </span>
      </div>
      <div id='stepFour' className={clsx(revealedSteps < 4 && unrevealed)}>
        <span className=''>Anchor Day: </span>
        <span className={step4}> {anchorDayForCentury} </span>
      </div>
      <div id='stepFive' className={clsx(revealedSteps < 5 && unrevealed)}>
        <span className={step1}> {howManyTwelves} </span>
        <span className=''> + </span>
        <span className={step2}> {stepTwoResult} </span>
        <span className=''> + </span>
        <span className={step3}> {howManyFours} </span>
        <span className=''> + </span>
        <span className={step4}> {anchorDayForCentury} </span>
        <span className=''> = </span>
        <span className={step5}> {addedUp} </span>
      </div>
      <div id='stepSix' className={clsx(revealedSteps < 6 && unrevealed)}>
        <span className={step5}>{addedUp} </span>
        {Array.from({ length: howManySevens }, (x, index) => index).map((sevenIteration) => (
          <span key={sevenIteration}> - 7</span>
        ))}
        <span className=''> = </span>
        <span className={step6}> {resultAfterSubtractingSevens} </span>
      </div>
      <div className='hidden'>
        <span className={step5}>{addedUp}</span>
        <span className=''> / 7 </span>
        <span className=''> = </span>
        <span className=''> {howManySevens} </span>
      </div>
      <div className={clsx(revealedSteps < 7 && unrevealed)}>
        <span className=''>Doomsday is: </span>
        <span className=''> {doomsdayIs} </span>
      </div>
      <div className={clsx(revealedSteps < 7 && unrevealed)}>
        <span className=''>Double-check: </span>
        <span className=''> {doomsdayOnYear.toFormat(fullDateWithWeekdayFormat)} </span>
      </div>
    </div>
  );
};

export default ProgressiveMathOld;
