import React, { useState } from 'react';

import { getRandomDateInYear } from './common';
import OffsetGuesser from './components/offset-guesser';
import { GuessActions } from './components/shared';

const GuessOnlyDate = () => {
  const initRandomDateWithinYear = getRandomDateInYear(2025);

  const [guessingDate, setGuessingDate] = useState(initRandomDateWithinYear);

  const [autoNext, setAutoNext] = useState(false);
  const [nextGuessIncoming, setNextGuessIncoming] = useState(false);
  // const [startTime, setStartTime] = useState<DateTime>(DateTime.now());

  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();
  console.log('lastAnswerCorrect', lastAnswerCorrect);

  const handleAnswer = (isCorrect: boolean) => {
    setLastAnswerCorrect(isCorrect);
    if (autoNext) {
      setNextGuessIncoming(true);
      setTimeout(() => {
        getNewGuess();
      }, 1000);
    }
  };

  const getNewGuess = () => {
    setGuessingDate(getRandomDateInYear(2025));
    setLastAnswerCorrect(undefined);
    setNextGuessIncoming(false);
  };

  return (
    <div id='page__guess-only-date' className='w-full'>
      <OffsetGuesser
        indicate={nextGuessIncoming}
        onAnswer={handleAnswer}
        guessingDate={guessingDate}
        key={guessingDate.toISO()}
      />
      <GuessActions
        btnLabel='Random Date'
        onClick={getNewGuess}
        selected={autoNext}
        toggleSelected={() => setAutoNext(!autoNext)}
      />
    </div>
  );
};

export default GuessOnlyDate;
