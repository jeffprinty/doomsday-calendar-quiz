import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime } from 'luxon';
import { IoChevronDownOutline } from 'react-icons/io5';

import {
  AnchorDayCentury,
  dayNames,
  getAnchorDayForCentury,
  step0,
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  Steps
} from '../common';
import Button from './button';

const unrevealed = 'opacity-5';

const YearGuessingHelper = ({ showAnswers, year }: { showAnswers?: boolean; year: number }) => {
  const [revealedSteps, setRevealedSteps] = useState(0);

  const [inputHash, setInputHash] = useState({
    stepOne: '',
    stepTwo: '',
    stepThree: '',
    stepFour: '',
    stepFive: ''
  });
  const [expandedHintHash, setExpandedHintHash] = useState({
    stepOne: '',
    stepTwo: '',
    stepThree: '',
    stepFour: '',
    stepFive: ''
  });

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
    day: 4
  });

  const rememberRowWithAnswers: Array<{
    id: Steps;
    stepClassName: string;
    stepText: string;
    answer: number;
    equation: React.ReactNode;
  }> = [
    {
      id: 'stepOne',
      stepClassName: step1,
      stepText: 'How many twelves?',
      answer: howManyTwelves,
      equation: (
        <>
          How many times does 12 fit into the year?
          <div id='stepOne' className={clsx(revealedSteps < 1 && unrevealed)}>
            <span className={step0}>{twoDigitYear} </span>
            <span className=''>/ 12</span>
            <span className=''> = </span>
            <span className={step1}> {howManyTwelves} </span>
          </div>
        </>
      )
    },
    {
      id: 'stepTwo',
      stepClassName: step2,
      stepText: 'Minus nearest twelve',
      answer: stepTwoResult,
      equation: <>year - nearest twelve</>
    },
    {
      id: 'stepThree',
      stepClassName: step3,
      stepText: 'How many fours?',
      answer: howManyFours,
      equation: <>How many fours fit into the product of the above</>
    },
    {
      id: 'stepFour',
      stepClassName: step4,
      stepText: 'Remember anchor day.',
      answer: anchorDayForCentury,
      equation: <>Get the anchor day</>
    },
    {
      id: 'stepFive',
      stepClassName: step5,
      stepText: 'Add it up.',
      answer: addedUp,
      equation: <>add all four of the above numbers</>
    }
  ];

  const showAllAnswers = () => {
    for (const { id, answer } of rememberRowWithAnswers) {
      setInputHash((previous) => ({
        ...previous,
        [id]: answer
      }));
    }
  };

  const handleStepAnswerClick = (stepClicked: Steps) => {
    const stepData = rememberRowWithAnswers.find(({ id }) => stepClicked === id);
    if (stepData) {
      const { answer } = stepData;
      setInputHash((previous) => ({
        ...previous,
        [stepClicked]: answer
      }));
    }
  };

  return (
    <div id='hints'>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col py-3'>
          {rememberRowWithAnswers.map(({ id, stepClassName, stepText, answer, equation }) => (
            <React.Fragment key={id}>
              <div
                key={id}
                className={clsx(stepClassName, 'mb-2 flex flex-row items-center justify-between')}
              >
                <div className='row flex-row items-center justify-start pr-4'>
                  <span>{stepText}</span>
                  <button
                    className={clsx(
                      expandedHintHash[id] ? 'rotate-0' : 'rotate-90',
                      'ml-2 transition-all duration-300 ease-in-out'
                    )}
                    onClick={() =>
                      setExpandedHintHash((previous) => ({
                        ...previous,
                        [id]: !previous[id]
                      }))
                    }
                  >
                    <IoChevronDownOutline />
                  </button>
                </div>
                <div className='flex flex-row justify-center items-center'>
                  <div className={clsx('flex')}>
                    {equation}
                  </div>
                  <input
                    type='number'
                    className={clsx(
                      stepClassName,
                      'w-10 rounded-lg bg-indigo-900 py-2 text-center'
                    )}
                    value={showAnswers ? answer : inputHash[id]}
                    onChange={({ target: { value } }) =>
                      setInputHash((previous) => ({
                        ...previous,
                        [id]: Number(value)
                      }))
                    }
                  />
                  <Button className='ml-2 h-10 w-8' onClick={() => handleStepAnswerClick(id)}>
                    ?
                  </Button>
                </div>
              </div>
              <div className={!clsx(expandedHintHash[id] && 'hidden', 'flex w-64 flex-col')}>
                {equation}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div>
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
          <span className=''> {doomsdayOnYear.toFormat('cccc MMMM dd, yyyy')} </span>
        </div>
      </div>
    </div>
  );
};

export default YearGuessingHelper;
