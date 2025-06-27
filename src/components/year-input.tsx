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
      className={clsx(className, 'w-28 rounded-xl bg-indigo-900 py-2 text-center text-4xl')}
      value={value || ''}
      onChange={({ target: { value } }) => setValue(Number(value))}
    />
  );
};

export default YearInput;
