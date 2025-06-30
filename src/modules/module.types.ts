export interface GuessPayload<T> {
  isCorrect: boolean;
  answer?: T;
}

export type OnGuess<T> = ({ isCorrect, answer }: GuessPayload<T>) => void;
