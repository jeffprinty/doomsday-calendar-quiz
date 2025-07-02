import { useState } from 'react';

import Button from '../components/button';
import GuessDisplay from '../components/guess-display';
import QuizResults from '../components/quiz-results';
import { GuesserStep } from '../components/shared';
import YearGuessingHelper from '../components/year-guessing-helper';
import useAnswerHistory from '../hooks/use-answer-history';
import {
  formatDayjsGuessDate,
  getDayjsRandomDateInYear,
  getDoomsdayForYear,
  getFullWeekday,
  getWeekdayForDate,
} from '../math/dates';
import { Weekday } from '../math/weekdays';
import { getRandomYear } from '../math/year';
import OffsetGuesser from '../modules/offset-guesser';
import WeekdayGuesser from '../modules/weekday-guesser';

const GuessFullDate = () => {
  const initYear = getRandomYear();
  const initRandomDateWithinYear = getDayjsRandomDateInYear(initYear);

  const [guessingDate, setGuessingDate] = useState(initRandomDateWithinYear);

  const guessingYear: number = guessingDate.year();

  const [showResults, setShowResults] = useState(false);
  const [showYearHints, setShowYearHints] = useState(false);

  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime } = useAnswerHistory();

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((previous) => previous + 1);

  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [yearDoomsdayGuessed, setYearDoomsdayGuessed] = useState(false);
  const [dateWeekdayGuessed, setDateWeekdayGuessed] = useState(false);

  const doomsdayOnYear = getDoomsdayForYear(guessingDate.get('year'));

  const correctDoomsday = doomsdayOnYear.format('ddd') as Weekday;

  const getNewGuess = () => {
    const randomYearAsInt = getRandomYear();
    const randomDateWithinYear = getDayjsRandomDateInYear(randomYearAsInt);
    setGuessingDate(randomDateWithinYear);
    onNewQuestion();

    setYearDoomsdayGuessed(false);
    setDateWeekdayGuessed(false);
    setShowYearHints(false);
    setShowAllAnswers(false);
    setCurrentStep(0);
  };

  const correctWeekdayForDate = getWeekdayForDate(guessingDate);

  return (
    <div id='page__guess-full-date' className='w-full'>
      <GuessDisplay
        className='mb-4'
        questionText={lastAnswerCorrect ? 'Correct! The doomsday for' : 'What is the doomsday for:'}
        guessText={formatDayjsGuessDate(guessingDate)}
        guessedCorrectly={lastAnswerCorrect}
        isLeapYear={guessingDate.isLeapYear()}
        explainCorrect={
          <>
            is <strong>{getFullWeekday(guessingDate)}</strong>
          </>
        }
      />
      <GuesserStep description='Guess the day offset for the date.'>
        <OffsetGuesser
          guessingDate={guessingDate}
          key={`offset-guesser__${guessingYear}`}
          onAnswer={() => nextStep()}
        />
      </GuesserStep>
      <GuesserStep show={currentStep > 0} description='Figure out the doomsday for the year'>
        <div id='guess-doomsday-for-year' className='mt-4'>
          <GuessDisplay
            className='mb-4'
            questionText='Now we get the doomsday for the year:'
            guessText={guessingDate.format('YYYY')}
            guessedCorrectly={lastAnswerCorrect}
            isLeapYear={guessingDate.isLeapYear()}
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
          <WeekdayGuesser
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
      <GuesserStep show={currentStep > 1} description='Guess the doomsday for the full date.'>
        <div id='guess-weekday-for-date'>
          <div className='text-center'>Doomsday for Date</div>
          <WeekdayGuesser
            correctDay={correctWeekdayForDate}
            disabled={dateWeekdayGuessed}
            key={`date_${startTime}`}
            onGuess={({ isCorrect }) => {
              setShowAllAnswers(true);
              setDateWeekdayGuessed(true);
              // TODO: handle string answer
              onAnswer({ isCorrect, answer: doomsdayOnYear });
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
