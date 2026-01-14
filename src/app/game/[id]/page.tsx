'use client';

import React, { Suspense } from 'react';
import GameBreakdownPage from '../../../pages-components/GameBreakdownPage';
import TanstackQueryProvider from '@/providers/QueryProvider';

const Game = () => {
  return (
    <TanstackQueryProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <GameBreakdownPage />
      </Suspense>
    </TanstackQueryProvider>
  );
};

export default Game;
