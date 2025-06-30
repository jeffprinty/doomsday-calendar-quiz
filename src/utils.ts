export const chunkArray = <T>(arrayToChunk: Array<T>, size: number): Array<Array<T>> =>
  Array.from({ length: Math.ceil(arrayToChunk.length / size) }, (v, index) =>
    arrayToChunk.slice(index * size, index * size + size)
  );

export function pickRandomlyFromArray<T>(array: Array<T>, n: number): Array<T> {
  const result = new Array(n);
  let length_ = array.length;
  const taken = new Array(length_);
  if (n > length_) throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    const x = Math.floor(Math.random() * length_);
    result[n] = array[x in taken ? taken[x] : x];
    taken[x] = --length_ in taken ? taken[length_] : length_;
  }
  return result;
}
