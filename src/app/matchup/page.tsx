'use client';

import React, { Suspense } from 'react';

import MatchupPage from '@/pages/MatchupPage';
import TanstackQueryProvider from '@/providers/QueryProvider';

const Matchup = () => {
  return (
    <TanstackQueryProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <MatchupPage />
      </Suspense>
    </TanstackQueryProvider>
  );
};

export default Matchup;
