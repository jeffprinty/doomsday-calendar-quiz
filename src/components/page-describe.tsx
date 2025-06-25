import React from 'react';

export const PageDescribe = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  return (
    <div className='page-describe'>
      {!!title && <h2>{title}</h2>}
      {children}
    </div>
  );
};
