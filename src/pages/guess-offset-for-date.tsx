import { useState } from 'react';

import { timeoutMs } from '../common';
import { GuessActions } from '../components/shared';
import useGuessingDate from '../hooks/use-guessing-date';
import OffsetGuesser from '../modules/offset-guesser';

const GuessOffsetForDate = () => {
  const [guessingDate, getNewGuess] = useGuessingDate('offset', 2025);

  const [autoNext, setAutoNext] = useState(false);
  const [nextGuessIncoming, setNextGuessIncoming] = useState(false);

  const getRandomDate = () => {
    getNewGuess();
    setNextGuessIncoming(false);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (autoNext && isCorrect) {
      setNextGuessIncoming(true);
      setTimeout(getRandomDate, timeoutMs);
    }
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
        onClick={getRandomDate}
        autoEnabled={autoNext}
        toggleAuto={() => setAutoNext(!autoNext)}
      />
    </div>
  );
};

export default GuessOffsetForDate;
