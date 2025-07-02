import { useState } from 'react';

import { timeoutMs } from '../common';
import { GuessActions } from '../components/shared';
import useGuessingDate from '../hooks/use-guessing-date';
import OffsetGuesser from '../modules/offset-guesser';

const GuessOffsetForDate = () => {
  const [guessingDate, getNewGuess] = useGuessingDate('offset', 2025);

  const [autoNext, setAutoNext] = useState(false);
  const [nextGuessIncoming, setNextGuessIncoming] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(true);

  const getRandomDate = () => {
    getNewGuess();
    setNextGuessIncoming(false);
  };

  const handleAnswer = (isCorrect: boolean) => {
    setLastAnswerCorrect(isCorrect);
    if (autoNext && isCorrect) {
      setNextGuessIncoming(true);
      setTimeout(getRandomDate, timeoutMs);
    }
  };

  return (
    <div id='page__guess-offset-for-date' className='w-full'>
      <OffsetGuesser
        autoMode={autoNext}
        autoProcessing={nextGuessIncoming && lastAnswerCorrect}
        disableOnAnswer
        onAnswer={handleAnswer}
        guessingDate={guessingDate}
        key={guessingDate.toISOString()}
      />
      <GuessActions
        btnLabel='Random Date'
        disabled={autoNext && lastAnswerCorrect}
        onClick={getRandomDate}
        autoEnabled={autoNext}
        toggleAuto={() => setAutoNext(!autoNext)}
      />
    </div>
  );
};

export default GuessOffsetForDate;
