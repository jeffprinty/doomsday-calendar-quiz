import { useState } from 'react';

import { guessDateFormat } from './common';
import Button from './components/button';
import GuessDisplay from './components/guess-display';
import QuizResults from './components/quiz-results';
import YearGuessingHelper from './components/year-guessing-helper';
import useAnswerHistory from './hooks/use-answer-history';
import { Weekday } from './math/weekdays';
import { getDoomsdayForYear, getRandomDateInYear, getRandomYear } from './math/year';
import { DayOfWeekGuesserSelfContained } from './modules/day-of-week-guesser';

const GuessFullDateV1 = () => {
  const initYear = getRandomYear();
  const initRandomDateWithinYear = getRandomDateInYear(initYear);

  const [guessingDate, setGuessingDate] = useState(initRandomDateWithinYear);

  const guessingYear = Number(guessingDate.toFormat('yyyy'));

  const [showResults, setShowResults] = useState(true);
  const [showYearHints, setShowYearHints] = useState(false);

  const { lastAnswerCorrect, onAnswer, onNewQuestion, pastAnswers, startTime } = useAnswerHistory();

  const [showAllYearAnswers, setShowAllYearAnswers] = useState(false);
  const [yearDoomsdayGuessed, setYearDoomsdayGuessed] = useState(false);
  const [weekdayGuessed, setWeekdayGuessed] = useState(false);
  console.log('weekdayGuessed', weekdayGuessed);

  const doomsdayOnYear = getDoomsdayForYear(guessingDate.get('year'));

  const correctDoomsday = doomsdayOnYear.toFormat('ccc') as Weekday;
  const correctWeekday = guessingDate.toFormat('ccc') as Weekday;

  const getNewGuess = () => {
    const randomYearAsInt = getRandomYear();
    const randomDateWithinYear = getRandomDateInYear(randomYearAsInt);
    setGuessingDate(randomDateWithinYear);
    onNewQuestion();

    setShowYearHints(false);
    setShowAllYearAnswers(false);

    setYearDoomsdayGuessed(false);
    setWeekdayGuessed(false);
  };

  return (
    <div id='page__guess-full-date' className='w-full'>
      <GuessDisplay
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
      <div id='guess-doomsday-for-year'>
        <YearGuessingHelper
          key={`hints_${guessingYear}`}
          year={guessingYear}
          showAnswers={showAllYearAnswers}
        />
        <div className='text-center'>
          <span>Doomsday for Year</span>&nbsp;
          <span className='hidden'>
            (
            <button
              onClick={() => setShowYearHints((previous) => !previous)}
              className='text-blue-400'
            >
              {showYearHints ? 'hide' : 'show'} hints
            </button>
            )
          </span>
        </div>
        <DayOfWeekGuesserSelfContained
          correctDay={correctDoomsday}
          disabled={yearDoomsdayGuessed}
          key={`year_${startTime}`}
          onGuess={() => {
            setShowAllYearAnswers(true);
            setYearDoomsdayGuessed(true);
          }}
        />
      </div>
      <div id='guess-weekday-for-date'>
        <div className='text-center'>Doomsday for Date</div>
        <DayOfWeekGuesserSelfContained
          correctDay={correctWeekday}
          disabled={!yearDoomsdayGuessed || weekdayGuessed}
          key={`date_${startTime}`}
          onGuess={(guessedDay) => {
            const dayWeekdayGuessedCorrectly = guessedDay === correctWeekday;
            onAnswer(doomsdayOnYear, dayWeekdayGuessedCorrectly);
            setWeekdayGuessed(true);
          }}
        />
      </div>
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

export default GuessFullDateV1;
