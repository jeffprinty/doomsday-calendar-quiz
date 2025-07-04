import { ReactNode } from 'react';

import clsx from 'clsx';

import Button from './button';

const IconButton = ({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}) => {
  return (
    <Button
      className={clsx('flex flex-row items-center justify-center px-3 py-3', className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default IconButton;
