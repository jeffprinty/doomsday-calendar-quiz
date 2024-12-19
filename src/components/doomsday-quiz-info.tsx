import React, { useState } from 'react';

import clsx from 'clsx';
import { DateTime } from 'luxon';

import {
  chance,
  chunkArray,
  dayAbbreviations,
  dayNames,
  generateDaysTable,
  mnemonics
} from '../common';
import Button from './button';

const anchorDays = {
  '18': 5,
  '19': 3,
  '20': 2,
  '21': 0
};

const stepZero = 'text-pink-400';
const stepOne = 'text-red-400';
const stepTwo = 'text-orange-400';
const stepThree = 'text-yellow-400';
const stepFour = 'text-green-400';
const stepFive = 'text-blue-400';
const stepSix = 'text-indigo-400';

const DoomsdayForYear = () => {
  const [inputHash, setInputHash] = useState<{ [key: string]: number }>({});
  console.log('inputHash', inputHash);
  const rememberRow = [
    {
      id: 'stepOne',
      stepClassName: stepOne,
      stepText: 'How many twelves?'
    },
    {
      id: 'stepTwo',
      stepClassName: stepTwo,
      stepText: 'Minus nearest twelve'
    },
    {
      id: 'stepThree',
      stepClassName: stepThree,
      stepText: 'How many fours?'
    },
    {
      id: 'stepFour',
      stepClassName: stepFour,
      stepText: 'Remember anchor day.'
    }
  ];

  return (
    <div className='grid w-72 grid-cols-4 py-10'>
      {rememberRow.map(({ id, stepClassName, stepText }) => (
        <div key={id} className={clsx(stepClassName, 'text-center')}>
          <div>{stepText}</div>
          <input
            type='text'
            className='w-8 bg-indigo-900 text-center text-white'
            value={inputHash[id]}
            onChange={({ target: { value } }) =>
              setInputHash((previous) => ({
                ...previous,
                [id]: Number(value)
              }))
            }
          />
        </div>
      ))}
    </div>
  );
};

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const DoomsdayInfo = () => {
  const initYear = 1978;
  // TODO: Allow set year
  const [guessingYear, setGuessingYear] = useState(initYear);
  console.log('guessingYear', guessingYear);

  const [revealedSteps, setRevealedSteps] = useState(0);

  const [inputHash, setInputHash] = useState<{ [key: string]: number }>({});
  console.log('inputHash', inputHash);

  const daysTable = generateDaysTable();
  console.log('daysTable', daysTable);
  const chunked = chunkArray(daysTable, 7);
  console.log('chunked', chunked);

  const showLongCal = false;

  const getNewYear = () => {
    const randomYearAsInt = chance.integer({ min: 1900, max: 2099 });
    setRevealedSteps(0);
    setInputHash({});
    setGuessingYear(randomYearAsInt);
  };

  const twoDigitYear = Number(guessingYear.toString().slice(2, 4));
  console.log('twoDigitYear', twoDigitYear);
  const howManyTwelves = Math.floor(twoDigitYear / 12);
  const stepOneResult = howManyTwelves * 12;
  const stepTwoResult = twoDigitYear - stepOneResult;
  const howManyFours = Math.floor(stepTwoResult / 4);

  const century = guessingYear.toString().slice(0, 2);
  // @ts-ignore
  const anchorDayForCentury = anchorDays[century];
  console.log('anchorDayForCentury', anchorDayForCentury);

  const addedUp = howManyTwelves + stepTwoResult + howManyFours + anchorDayForCentury;

  const howManySevens = Math.floor(addedUp / 7);

  const resultAfterSubtractingSevens = addedUp - howManySevens * 7;

  const doomsdayIs = dayNames[resultAfterSubtractingSevens];

  const doomsdayOnYear = DateTime.fromObject({
    year: guessingYear,
    month: 4,
    day: 4
  });

  const steps = {
    stepZero: {
      description: 'Get the year',
      answer: 0
    },
    stepOne: {
      description: 'How many twelves fit inside?',
      answer: stepOneResult
    },
    stepTwo: {
      description: 'Year minus nearest multiple of twelve',
      answer: stepTwoResult
    },
    stepThree: {
      description: 'How many fours fit inside?',
      answer: 0
    },
    stepFour: {
      description: 'Anchor day',
      answer: 0
    },
    stepFive: {
      description: 'Add up.',
      answer: 0
    },
    stepSix: {
      description: '',
      answer: 0
    }
  };

  const unrevealed = 'opacity-5';

  return (
    <div>
      <div className='explainer'>
        {mnemonics.map(({ monthName, common }, index) => {
          const hackyMonthNumber = index + 1;
          return (
            <div key={monthName} className='flex flex-row items-center justify-between text-center'>
              {monthName}
              <div className=''>
                {hackyMonthNumber}/{common}
              </div>
            </div>
          );
        })}
      </div>
      <DoomsdayForYear key={guessingYear} />
      <div>
        <input className='text-black' type='text' readOnly value={guessingYear.toString()} />
        <Button onClick={getNewYear}>borf</Button>
        <Button onClick={() => setRevealedSteps((previous) => previous + 1)}>next step</Button>
        <div id='stepZero' className={clsx(revealedSteps < 0 && unrevealed)}>
          <span className=''>{century} </span>
          <span className={stepZero}>{twoDigitYear} </span>
        </div>
        <div id='stepOne' className={clsx(revealedSteps < 1 && unrevealed)}>
          <span className={stepZero}>{twoDigitYear} </span>
          <span className=''>/ 12</span>
          <span className=''> = </span>
          <span className={stepOne}> {howManyTwelves} </span>
          <span className=''>, </span>
          <span className={stepOne}>{howManyTwelves}</span>
          <span className=''> x 12 = </span>
          <span className=''> {stepOneResult} </span>
        </div>
        <div id='stepTwo' className={clsx(revealedSteps < 2 && unrevealed)}>
          <span className={stepZero}>{twoDigitYear} </span>
          <span className=''> - </span>
          <span className=''>{stepOneResult}</span>
          <span className=''> = </span>
          <span className={stepTwo}> {stepTwoResult} </span>
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
          <span className={stepTwo}>{stepTwoResult} </span>
          <span className=''> / </span>
          <span className=''> 4 </span>
          <span className=''> = </span>
          <span className={stepThree}> {howManyFours} </span>
        </div>
        <div id='stepFour' className={clsx(revealedSteps < 4 && unrevealed)}>
          <span className=''>Anchor Day: </span>
          <span className={stepFour}> {anchorDayForCentury} </span>
        </div>
        <div id='stepFive' className={clsx(revealedSteps < 5 && unrevealed)}>
          <span className={stepOne}> {howManyTwelves} </span>
          <span className=''> + </span>
          <span className={stepTwo}> {stepTwoResult} </span>
          <span className=''> + </span>
          <span className={stepThree}> {howManyFours} </span>
          <span className=''> + </span>
          <span className={stepFour}> {anchorDayForCentury} </span>
          <span className=''> = </span>
          <span className={stepFive}> {addedUp} </span>
        </div>
        <div id='stepSix' className={clsx(revealedSteps < 6 && unrevealed)}>
          <span className={stepFive}>{addedUp} </span>
          {Array.from({ length: howManySevens }, (x, index) => index).map((sevenIteration) => (
            <span key={sevenIteration}> - 7</span>
          ))}
          <span className=''> = </span>
          <span className={stepSix}> {resultAfterSubtractingSevens} </span>
        </div>
        <div className='hidden'>
          <span className={stepFive}>{addedUp}</span>
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
      {showLongCal && (
        <div className='calendar-butt grid w-72 grid-cols-7'>
          {dayAbbreviations.map((abbr) => (
            <div key={abbr} className='wx-3 text-center'>
              {abbr}
            </div>
          ))}
          {daysTable.map(({ monthNumber, monthNumberForHumans, number, year }) => {
            return (
              <div key={`${monthNumberForHumans}${number}${year}`} className='wx-3 text-center'>
                {number}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DoomsdayInfo;
