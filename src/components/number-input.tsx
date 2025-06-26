import clsx from 'clsx';

export const NumberInput = ({
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
      className={clsx(className, 'w-14 rounded-lg bg-indigo-900 py-2 text-center')}
      value={value || ''}
      onChange={({ target: { value } }) => setValue(Number(value))}
    />
  );
};

export default NumberInput;
