import React, { useState } from 'react';

import clsx from 'clsx';
import { BiMath, BiSolidInfoCircle } from 'react-icons/bi';

import { commonStyles, Steps } from '../common';
import { AnchorDayCentury, getAnchorDayForCentury } from '../math/century';

interface RememberRow {
  hint?: React.ReactNode;
  id: Steps;
  stepClassName: string;
  stepText: string;
  answer: number;
  equation: React.ReactNode;
}

const twelves = Array.from({ length: 8 }, (x, index) => (index + 1) * 12);

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
      hint: (
        <table>
          <thead>
            {twelves.map((multiple, index) => (
              <th key={`th_${multiple}`}>{index + 1}</th>
            ))}
          </thead>
          <tbody>
            <tr>
              {twelves.map((multiple) => (
                <td key={`td_${multiple}`}>{multiple}</td>
              ))}
            </tr>
          </tbody>
        </table>
      ),
      id: 'stepOne',
      stepClassName: commonStyles.step1,
      stepText: 'How many twelves?',
      answer: howManyTwelves,
      equation: (
        <div>
          <span className={commonStyles.step0}>{twoDigitYear} </span>
          <span className=''>/ 12</span>
          <span className=''> = </span>
        </div>
      ),
    },
    {
      id: 'stepTwo',
      stepClassName: commonStyles.step2,
      stepText: 'Minus nearest twelve',
      answer: stepTwoResult,
      equation: (
        <div>
          <span className={commonStyles.step0}>{twoDigitYear} </span>
          <span className=''> - </span>
          <span className={commonStyles.step1}>{stepOneResult}</span>
          <span className=''> = </span>
        </div>
      ),
    },
    {
      id: 'stepThree',
      stepClassName: commonStyles.step3,
      stepText: 'How many fours?',
      answer: howManyFours,
      equation: (
        <div>
          <span className={commonStyles.step2}>{stepTwoResult} </span>
          <span className=''> / </span>
          <span className=''> 4 </span>
          <span className=''> = </span>
        </div>
      ),
    },
    {
      id: 'stepFour',
      stepClassName: commonStyles.step4,
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
      stepClassName: commonStyles.step5,
      stepText: 'Add it up.',
      answer: addedUp,
      equation: (
        <div>
          <span className={commonStyles.step0}>{howManyTwelves} </span>
          <span className=''> + </span>
          <span className={commonStyles.step1}>{stepTwoResult}</span>
          <span className=''> + </span>
          <span className={commonStyles.step3}>{howManyFours}</span>
          <span className=''> + </span>
          <span className={commonStyles.step4}>{anchorDayForCentury}</span>
          <span className=''> = </span>
        </div>
      ),
    },
    {
      id: 'stepSix',
      stepClassName: commonStyles.step6,
      stepText: 'Subtract sevens',
      answer: resultAfterSubtractingSevens,
      equation: (
        <div>
          <span className={commonStyles.step5}>{addedUp} </span>
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
  const { id, stepClassName, stepText, equation, answer, hint } = data;
  const [hintExpanded, setHintExpanded] = useState(false);
  const [mathExpanded, setMathExpanded] = useState(false);
  const [inputValue, setInputValue] = useState<number>();
  const [answerRevealed, setAnswerRevealed] = useState(false);
  return (
    <>
      <div className={clsx('mb-2 flex flex-row items-center justify-between')} data-stepid={id}>
        <div className={clsx(stepClassName, 'row flex-row items-center justify-start pr-4')}>
          <span>{stepText}</span>
          <button
            className={clsx('ml-2 transition-all duration-300 ease-in-out', !hint && 'hidden')}
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
            value={showAllAnswers || answerRevealed ? answer : inputValue}
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
      {hintExpanded && !!hint && <div className='hint-expando'>{hint}</div>}
    </>
  );
};
