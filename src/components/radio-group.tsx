import clsx from 'clsx';

export interface RadioGroupItem<T> {
  id: string;
  value: T;
  label: string;
}

const RadioItem = <T extends string>({
  checked,
  item,
  name,
  onChange,
}: {
  checked: boolean;
  item: RadioGroupItem<T>;
  name: string;
  onChange: (value: T) => void;
}) => {
  const { id, label, value } = item;
  return (
    <div className='flex items-center'>
      <input
        checked={checked}
        className='h-4 w-4 border-gray-600 bg-gray-700 text-blue-600 ring-offset-gray-800 focus:ring-2 focus:ring-blue-600'
        id={id}
        type='radio'
        value={value}
        name={name}
        onChange={({ target: { value } }) => onChange(value as T)}
      />
      <label htmlFor={id} className='ms-2 text-sm font-medium text-white'>
        {label}
      </label>
    </div>
  );
};

const RadioGroup = <T extends string>({
  items,
  name,
  onChange,
  value,
}: {
  items: Array<RadioGroupItem<T>>;
  name: string;
  onChange: (value: T) => void;
  value: string;
}) => {
  return (
    <div className={clsx('radio-group')}>
      {items.map((item) => (
        <RadioItem
          item={item}
          key={item.id}
          checked={item.value === value}
          name={name}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
