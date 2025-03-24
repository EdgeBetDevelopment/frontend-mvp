import React from 'react';

import { cn } from '@/lib/utils';

interface IPageTitle {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  className?: string;
}

const PageTitle = ({ title, description, className }: IPageTitle) => {
  return (
    <div
      className={cn(
        'flex max-w-[811px] flex-col items-center gap-3',
        className,
      )}
    >
      <h3 className="tl-heading1 capitalize">{title}</h3>

      <p className="tl-paraghraph1 text-center">{description}</p>
    </div>
  );
};

export default PageTitle;
