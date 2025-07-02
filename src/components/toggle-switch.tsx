import clsx from 'clsx';

const ToggleSwitch = ({
  checked,
  className,
  label,
  onClick,
}: {
  checked: boolean;
  className?: boolean;
  label: string;
  onClick: () => void;
}) => {
  return (
    <label className={clsx('me-5 inline-flex cursor-pointer items-center', className)}>
      <input
        type='checkbox'
        value=''
        className='peer sr-only'
        checked={checked}
        onChange={onClick}
      />
      <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-red-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-red-600 dark:peer-focus:ring-red-800 rtl:peer-checked:after:-translate-x-full"></div>
      <span className='ms-3 text-sm font-medium text-white'>{label}</span>
    </label>
  );
};

export default ToggleSwitch;
