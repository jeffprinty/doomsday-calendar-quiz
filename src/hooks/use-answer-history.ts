import { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import { useLocalStorage } from 'usehooks-ts';

// answerTime, intervalInSeconds, isCorrect, answerIso
export type PastAnswer = [number, number, boolean, string];

const useAnswerHistory = (id: string) => {
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | undefined>();

  const [answerHistory, setAnswerHistory] = useLocalStorage<Array<PastAnswer>>(
    `answer-history__${id}`,
    []
  );

  const [startTime, setStartTime] = useState<Dayjs>(dayjs());
  const onNewQuestion = () => {
    setStartTime(dayjs());
    setLastAnswerCorrect(undefined);
  };
  // TODO: Handle other kinds of answers
  const onAnswer = ({ answer, isCorrect }: { answer: Dayjs; isCorrect: boolean }) => {
    setLastAnswerCorrect(isCorrect);
    const answerTime = dayjs();
    const interval = dayjs.duration(answerTime.diff(startTime));
    const intervalInSeconds = interval.asSeconds();
    if (intervalInSeconds) {
      setAnswerHistory((previous) => [
        ...previous,
        [+answerTime, intervalInSeconds, isCorrect, answer.toISOString()],
      ]);
    }
  };
  return { lastAnswerCorrect, onAnswer, onNewQuestion, answerHistory, startTime };
};

export default useAnswerHistory;
