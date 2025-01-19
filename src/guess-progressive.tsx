import React, { useState } from 'react';

import { DateTime } from 'luxon';

import { Day, getRandomDateInYear, getRandomYear, guessDateFormat } from './common';
import Button from './components/button';
import OffsetGuesser from './components/offset-guesser';
import QuizResults from './components/quiz-results';
import { GuessDisplay, GuesserStep } from './components/shared';
import YearGuessingHelper from './components/year-guessing-helper';
import useAnswerHistory from './hooks/use-answer-history';
import { DayOfWeekGuesserSelfContained } from './modules/day-of-week-guesser';

const GuessFullDate = () => {
  const initYear = getRandomYear();
  const initRandomDateWithinYear = getRandomDateInYear(initYear);

  const [guessingDate, setGuessingDate] = useState(initRandomDateWithinYear);

  const guessingYear = Number(guessingDate.toFormat('yyyy'));

  const [showResults, setShowResults] = useState(false);
  const [showYearHints, setShowYearHints] = useState(false);

  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime } = useAnswerHistory();

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((previous) => previous + 1);

  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [yearDoomsdayGuessed, setYearDoomsdayGuessed] = useState(false);
  const [dateWeekdayGuessed, setDateWeekdayGuessed] = useState(false);

  const doomsdayOnYear = DateTime.fromObject({
    year: guessingDate.get('year'),
    month: 4,
    day: 4,
  });

  const correctDoomsday = doomsdayOnYear.toFormat('ccc') as Day;

  const getNewGuess = () => {
    const randomYearAsInt = getRandomYear();
    const randomDateWithinYear = getRandomDateInYear(randomYearAsInt);
    setGuessingDate(randomDateWithinYear);
    onNewQuestion();

    setYearDoomsdayGuessed(false);
    setDateWeekdayGuessed(false);
    setShowYearHints(false);
    setShowAllAnswers(false);
    setCurrentStep(0);
  };

  const correctWeekdayForDate = guessingDate.toFormat('ccc') as Day;

  return (
    <div id='page__guess-full-date' className='w-full'>
      <GuessDisplay
        className='mb-4'
        questionText={lastAnswerCorrect ? 'Correct! The doomsday for' : 'What is the doomsday for:'}
        guessText={guessingDate.toFormat(guessDateFormat)}
        guessedCorrectly={lastAnswerCorrect}
        isLeapYear={guessingDate.isInLeapYear}
        explainCorrect={
          <>
            is <strong>{guessingDate.toFormat('cccc')}</strong>
          </>
        }
      />
      <GuesserStep>
        <OffsetGuesser
          guessingDate={guessingDate}
          key={`offset-guesser__${guessingYear}`}
          onAnswer={() => nextStep()}
        />
      </GuesserStep>
      <GuesserStep show={currentStep > 0}>
        <div id='guess-doomsday-for-year'>
          <GuessDisplay
            className='mb-4'
            questionText='Now we get the doomsday for the year:'
            guessText={guessingDate.toFormat('yyyy')}
            guessedCorrectly={lastAnswerCorrect}
            isLeapYear={guessingDate.isInLeapYear}
          />
          <YearGuessingHelper
            key={`hints_${guessingYear}`}
            year={guessingYear}
            showAnswers={showAllAnswers}
          />
          <div className='text-center'>
            <span>Doomsday for Year</span>&nbsp; (
            <button
              onClick={() => setShowYearHints((previous) => !previous)}
              className='text-blue-400'
            >
              {showYearHints ? 'hide' : 'show'} hints
            </button>
            )
          </div>
          <DayOfWeekGuesserSelfContained
            correctDay={correctDoomsday}
            disabled={yearDoomsdayGuessed}
            key={`year_${startTime}`}
            onGuess={() => {
              setShowAllAnswers(true);
              setYearDoomsdayGuessed(true);
              nextStep();
            }}
          />
        </div>
      </GuesserStep>
      <GuesserStep show={currentStep > 1}>
        <div id='guess-weekday-for-date'>
          <div className='text-center'>Doomsday for Date</div>
          <DayOfWeekGuesserSelfContained
            correctDay={correctWeekdayForDate}
            disabled={dateWeekdayGuessed}
            key={`date_${startTime}`}
            onGuess={(answer, isCorrect) => {
              console.log('answer', answer);
              setShowAllAnswers(true);
              setDateWeekdayGuessed(true);
              // TODO: handle string answer
              onAnswer(doomsdayOnYear, isCorrect);
              nextStep();
            }}
          />
        </div>
      </GuesserStep>
      <Button onClick={getNewGuess} className='my-2 h-16 w-full'>
        Random Date
      </Button>
      <Button onClick={() => setShowResults((previous) => !previous)}>
        {showResults ? 'hide' : 'show'} results
      </Button>
      {showResults && <QuizResults answers={pastAnswers} currentGuess={guessingDate.toString()} />}
    </div>
  );
};

export default GuessFullDate;
