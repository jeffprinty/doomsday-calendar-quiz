import React, { useState } from 'react';

import clsx from 'clsx';
import { BiInfoCircle } from 'react-icons/bi';

export const PageDescribe = ({
  children,
  className,
  collapsible,
  initCollapsed = false,
  title,
}: {
  children: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  initCollapsed?: boolean;
  title?: string;
}) => {
  const [collapsed, setCollapsed] = useState(initCollapsed);
  return (
    <div className={clsx('page-describe', 'w-full p-2 pb-3 md:p-0', className)}>
      <div className='flex flex-row items-center justify-between'>
        {!!title && <h2>{title}</h2>}
        {collapsible && (
          <button className='' onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <BiInfoCircle size={24} /> : 'hide'}
          </button>
        )}
      </div>
      {collapsible && collapsed ? null : children}
    </div>
  );
};
