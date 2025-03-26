import React, { ReactNode } from 'react';

import ActiveSectionContextProvider from '@/context/ActiveSectionContext';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <ActiveSectionContextProvider>
      <div>{children}</div>
    </ActiveSectionContextProvider>
  );
};

export default layout;
