import React from 'react';

export default function Button({
  children,
  onClick,
  ...properties
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type='button'
      className='rounded-xl bg-accent-primary px-4 py-2 text-xl transition-colors hover:bg-accent-primary-state focus:bg-accent-primary-state'
      onClick={onClick}
      {...properties}
    >
      <span>{children}</span>
    </button>
  );
}
