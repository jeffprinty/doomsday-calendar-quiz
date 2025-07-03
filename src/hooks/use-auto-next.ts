import { useState } from 'react';

import { timeoutMs } from '../common';

interface UseAutoNextOptions {
  advanceOnIncorrect?: boolean;
  callback: () => void;
  init?: boolean;
}

const useAutoNext = ({ callback, init, advanceOnIncorrect = false }: UseAutoNextOptions) => {
  const [autoNext, setAutoNext] = useState(init);
  const [nextGuessIncoming, setNextGuessIncoming] = useState(false);

  const callbackAfterDelay = () => {
    setNextGuessIncoming(true);
    setTimeout(() => {
      setNextGuessIncoming(false);
      callback();
    }, timeoutMs);
  };

  const onAnswerAuto = (isCorrect: boolean) => {
    if (autoNext) {
      if (!isCorrect) {
        if (advanceOnIncorrect) {
          callbackAfterDelay();
        }
      } else {
        callbackAfterDelay();
      }
    }
  };

  return [autoNext, setAutoNext, onAnswerAuto, { nextGuessIncoming }] as [
    boolean,
    (value: boolean) => void,
    (isCorrect: boolean) => void,
    { nextGuessIncoming: boolean },
  ];
};

export default useAutoNext;
