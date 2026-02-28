"use client";

import React, { Suspense } from "react";

import { MatchupPage } from "@/modules/matchup";
import TanstackQueryProvider from "@/shared/providers/QueryProvider";

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
