import React from 'react';

export default function Button({
  children,
  onClick
}: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type='button'
      className='w-16 rounded-xl bg-accent-primary px-4 py-2 text-xl transition-colors hover:bg-accent-primary-state focus:bg-accent-primary-state'
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
}
