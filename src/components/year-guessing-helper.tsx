import React, { useState } from 'react';

import clsx from 'clsx';
import { BiMath, BiSolidInfoCircle } from 'react-icons/bi';

import {
  AnchorDayCentury,
  getAnchorDayForCentury,
  step0,
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  Steps,
} from '../common';

interface RememberRow {
  id: Steps;
  stepClassName: string;
  stepText: string;
  answer: number;
  equation: React.ReactNode;
}

const YearGuessingHelper = ({ showAnswers, year }: { showAnswers?: boolean; year: number }) => {
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
  // </YEAR MATH>

  const rememberRowWithAnswers: Array<RememberRow> = [
    {
      id: 'stepOne',
      stepClassName: step1,
      stepText: 'How many twelves?',
      answer: howManyTwelves,
      equation: (
        <div>
          <span className={step0}>{twoDigitYear} </span>
          <span className=''>/ 12</span>
          <span className=''> = </span>
        </div>
      ),
    },
    {
      id: 'stepTwo',
      stepClassName: step2,
      stepText: 'Minus nearest twelve',
      answer: stepTwoResult,
      equation: (
        <div>
          <span className={step0}>{twoDigitYear} </span>
          <span className=''> - </span>
          <span className={step1}>{stepOneResult}</span>
          <span className=''> = </span>
        </div>
      ),
    },
    {
      id: 'stepThree',
      stepClassName: step3,
      stepText: 'How many fours?',
      answer: howManyFours,
      equation: (
        <div>
          <span className={step2}>{stepTwoResult} </span>
          <span className=''> / </span>
          <span className=''> 4 </span>
          <span className=''> = </span>
        </div>
      ),
    },
    {
      id: 'stepFour',
      stepClassName: step4,
      stepText: 'Remember anchor day.',
      answer: anchorDayForCentury,
      equation: (
        <div>
          <span className=''>{century} </span>
          <span className=''> = </span>
          <span className=''> {anchorDayForCentury} </span>
        </div>
      ),
    },
    {
      id: 'stepFive',
      stepClassName: step5,
      stepText: 'Add it up.',
      answer: addedUp,
      equation: (
        <div>
          <span className={step0}>{howManyTwelves} </span>
          <span className=''> + </span>
          <span className={step1}>{stepTwoResult}</span>
          <span className=''> + </span>
          <span className={step3}>{howManyFours}</span>
          <span className=''> + </span>
          <span className={step4}>{anchorDayForCentury}</span>
          <span className=''> = </span>
        </div>
      ),
    },
    {
      id: 'stepSix',
      stepClassName: step6,
      stepText: 'Subtract sevens',
      answer: resultAfterSubtractingSevens,
      equation: (
        <div>
          <span className={step5}>{addedUp} </span>
          {Array.from({ length: howManySevens }, (x, index) => index).map((sevenIteration) => (
            <span key={sevenIteration}> - 7</span>
          ))}
          <span className=''> = </span>
        </div>
      ),
    },
  ];

  return (
    <div id='hints'>
      <div className='flex flex-col items-center'>
        <div className='flex w-full flex-col py-3 md:w-4/5'>
          {rememberRowWithAnswers.map((data) => {
            return <HelperRow data={data} key={data.id} showAllAnswers={showAnswers} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default YearGuessingHelper;

const HelperRow = ({ data, showAllAnswers }: { data: RememberRow; showAllAnswers?: boolean }) => {
  const { id, stepClassName, stepText, equation, answer } = data;
  const [hintExpanded, setHintExpanded] = useState(false);
  const [mathExpanded, setMathExpanded] = useState(false);
  const [inputValue, setInputValue] = useState<number>();
  const [answerRevealed, setAnswerRevealed] = useState(false);
  return (
    <React.Fragment>
      <div key={id} className={clsx('mb-2 flex flex-row items-center justify-between')}>
        <div className={clsx(stepClassName, 'row flex-row items-center justify-start pr-4')}>
          <span>{stepText}</span>
          <button
            className='ml-2 transition-all duration-300 ease-in-out'
            onClick={() => setHintExpanded(!hintExpanded)}
          >
            <BiSolidInfoCircle />
          </button>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <button
            className={clsx(stepClassName, 'mr-2')}
            onClick={() => setMathExpanded(!mathExpanded)}
          >
            <BiMath />
          </button>
          <div className={clsx('mr-1 flex', !answerRevealed && !mathExpanded && 'hidden')}>
            {equation}
          </div>
          <input
            type='number'
            className={clsx(stepClassName, 'w-10 rounded-lg bg-indigo-900 py-2 text-center')}
            value={showAllAnswers ? answer : inputValue}
            onChange={({ target: { value } }) => setInputValue(Number(value))}
          />
          <button
            className={clsx(stepClassName, answerRevealed && 'invisible', 'ml-1 h-10 w-6')}
            onClick={() => {
              setInputValue(answer);
              setAnswerRevealed(true);
            }}
          >
            ?
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
