import clsx from 'clsx';

export default function Button({
  className,
  children,
  onClick,
  selected,
  ...properties
}: {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  selected?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type='button'
      className={clsx([
        'rounded-xl bg-accent-primary py-2 text-xl transition-colors hover:bg-accent-primary-state focus:bg-accent-primary-state disabled:bg-blue-900 disabled:text-slate-400',
        selected &&
          'bg-indigo-600 hover:bg-indigo-800 focus:bg-indigo-600 disabled:bg-blue-900 disabled:text-slate-400',
        className,
      ])}
      onClick={onClick}
      {...properties}
    >
      {children}
    </button>
  );
}
