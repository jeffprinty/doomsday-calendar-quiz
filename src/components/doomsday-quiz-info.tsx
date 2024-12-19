import React, { useState } from 'react';

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

// I want to be able to feed it random dates OR feed it a list of previously incorrect guesses
const DoomsdayInfo = () => {
  const initYear = 1978;
  // TODO: Allow set year
  const [guessingYear, setGuessingYear] = useState(initYear);
  console.log('guessingYear', guessingYear);

  const daysTable = generateDaysTable();
  console.log('daysTable', daysTable);
  const chunked = chunkArray(daysTable, 7);
  console.log('chunked', chunked);

  const showLongCal = false;

  const getNewYear = () => {
    const randomYearAsInt = chance.integer({ min: 1900, max: 2099 });
    setGuessingYear(randomYearAsInt);
  };

  const twoDigitYear = Number(guessingYear.toString().slice(2, 4));
  console.log('twoDigitYear', twoDigitYear);
  const howManyTwelves = Math.floor(twoDigitYear / 12);
  const differenceBetweenYearAnd = twoDigitYear - howManyTwelves * 12;
  const howManyFours = Math.floor(differenceBetweenYearAnd / 4);

  const century = guessingYear.toString().slice(0, 2);
  // @ts-ignore
  const anchorDayForCentury = anchorDays[century];
  console.log('anchorDayForCentury', anchorDayForCentury);

  const addedUp = howManyTwelves + differenceBetweenYearAnd + howManyFours + anchorDayForCentury;

  const howManySevens = Math.floor(addedUp / 7);

  const resultAfterSubtractingSevens = addedUp - howManySevens * 7;

  const doomsdayIs = dayNames[resultAfterSubtractingSevens];

  const stepOne = 'text-red-400';
  const stepTwo = 'text-orange-400';
  const stepThree = 'text-yellow-400';
  const stepFour = 'text-green-400';
  const stepFive = 'text-blue-400';
  const stepSix = 'text-indigo-400';

  const doomsdayOnYear = DateTime.fromObject({
    year: guessingYear,
    month: 4,
    day: 4
  });

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
      <div>
        <input className='text-black' type='text' readOnly value={guessingYear.toString()} />
        <Button onClick={getNewYear}>borf</Button>
        <div className=''>
          <span className=''>{twoDigitYear} </span>
          <span className=''>/ 12</span>
          <span className=''> = </span>
          <span className={stepOne}> {howManyTwelves} </span>
        </div>
        <div className=''>
          <span className=''>{twoDigitYear} </span>
          <span className=''> - </span>
          <span className=''> {howManyTwelves * 12} </span>
          <span className=''> = </span>
          <span className={stepTwo}> {differenceBetweenYearAnd} </span>
        </div>
        <div className=''>
          <span className=''>{differenceBetweenYearAnd} </span>
          <span className=''> / </span>
          <span className=''> 4 </span>
          <span className=''> = </span>
          <span className={stepThree}> {howManyFours} </span>
        </div>
        <div className=''>
          <span className=''>Anchor Day: </span>
          <span className={stepFour}> {anchorDayForCentury} </span>
        </div>
        <div className=''>
          <span className={stepOne}> {howManyTwelves} </span>
          <span className=''> + </span>
          <span className={stepTwo}> {differenceBetweenYearAnd} </span>
          <span className=''> + </span>
          <span className={stepThree}> {howManyFours} </span>
          <span className=''> + </span>
          <span className={stepFour}> {anchorDayForCentury} </span>
          <span className=''> = </span>
          <span className={stepFive}> {addedUp} </span>
        </div>
        <div className=''>
          <span className={stepFive}>{addedUp} </span>
          {Array.from({ length: howManySevens }, (x, index) => index).map((sevenIteration) => (
            <span key={sevenIteration}> - 7</span>
          ))}
          <span className=''> = </span>
          <span className={stepSix}> {resultAfterSubtractingSevens} </span>
        </div>
        <div className=''>
          <span className=''>Doomsday is: </span>
          <span className=''> {doomsdayIs} </span>
        </div>
        <div className=''>
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
