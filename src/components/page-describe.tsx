import React from 'react';

import clsx from 'clsx';

export const PageDescribe = ({
  children,
  className,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) => {
  return (
    <div className={clsx('page-describe', className)}>
      {!!title && <h2>{title}</h2>}
      {children}
    </div>
  );
};
