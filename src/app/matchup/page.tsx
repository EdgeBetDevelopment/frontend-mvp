'use client';

import React, { Suspense } from 'react';

import { MatchupPage, TosDisclaimerDialog } from '@/modules/matchup';
import TanstackQueryProvider from '@/shared/providers/QueryProvider';

const Matchup = () => {
  return (
    <TanstackQueryProvider>
      <TosDisclaimerDialog />
      <Suspense fallback={<div>Loading...</div>}>
        <MatchupPage />
      </Suspense>
    </TanstackQueryProvider>
  );
};

export default Matchup;
