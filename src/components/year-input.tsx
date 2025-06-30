import clsx from 'clsx';

export const YearInput = ({
  className,
  value,
  setValue,
}: {
  className?: string;
  value?: number;
  setValue: (value: number) => void;
}) => {
  return (
    <input
      type='number'
      className={clsx('w-36 rounded-xl bg-indigo-900 py-2 text-center text-5xl', className)}
      value={value || ''}
      onChange={({ target: { value } }) => setValue(Number(value))}
    />
  );
};

export default YearInput;
