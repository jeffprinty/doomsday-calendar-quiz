import { useState } from 'react';

import { timeoutMs } from './common';
import { GuessActions } from './components/shared';
import { getDayjsRandomDateInYear } from './math/dates';
import OffsetGuesser from './modules/offset-guesser';

const GuessOffsetForDate = () => {
  const initRandomDateWithinYear = getDayjsRandomDateInYear(2025);

  const [guessingDate, setGuessingDate] = useState(initRandomDateWithinYear);

  const [autoNext, setAutoNext] = useState(false);
  const [nextGuessIncoming, setNextGuessIncoming] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    console.log('isCorrect', isCorrect);
    if (autoNext) {
      setNextGuessIncoming(true);
      setTimeout(() => {
        getNewGuess();
      }, timeoutMs);
    }
  };

  const getNewGuess = () => {
    setGuessingDate(getDayjsRandomDateInYear(2025));
    setNextGuessIncoming(false);
  };

  return (
    <div id='page__guess-offset-for-date' className='w-full'>
      <OffsetGuesser
        autoMode={autoNext}
        autoProcessing={nextGuessIncoming}
        indicate={nextGuessIncoming}
        onAnswer={handleAnswer}
        guessingDate={guessingDate}
        key={guessingDate.toISOString()}
      />
      <GuessActions
        btnLabel='Random Date'
        onClick={getNewGuess}
        autoEnabled={autoNext}
        toggleAuto={() => setAutoNext(!autoNext)}
      />
    </div>
  );
};

export default GuessOffsetForDate;
