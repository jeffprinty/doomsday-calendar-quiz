import { useState } from 'react';

import { GuessActions } from './components/shared';
import { getRandomDateInYear } from './math/year';
import OffsetGuesser from './modules/offset-guesser';

const GuessOnlyDate = () => {
  const initRandomDateWithinYear = getRandomDateInYear(2025);

  const [guessingDate, setGuessingDate] = useState(initRandomDateWithinYear);

  const [autoNext, setAutoNext] = useState(false);
  const [nextGuessIncoming, setNextGuessIncoming] = useState(false);

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
        autoEnabled={autoNext}
        toggleAuto={() => setAutoNext(!autoNext)}
      />
    </div>
  );
};

export default GuessOnlyDate;
