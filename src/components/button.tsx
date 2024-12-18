import React from 'react';

import clsx from 'clsx';

export default function Button({
  className,
  children,
  onClick,
  ...properties
}: {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type='button'
      className={clsx([
        'rounded-xl bg-accent-primary px-4 py-2 text-xl transition-colors hover:bg-accent-primary-state focus:bg-accent-primary-state disabled:bg-blue-900 disabled:text-slate-400',
        className
      ])}
      onClick={onClick}
      {...properties}
    >
      {children}
    </button>
  );
}
