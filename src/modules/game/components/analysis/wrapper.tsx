'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { Dialog, DialogContent } from '@/shared/components/dialog';
import Loader from '@/shared/components/loader';

const GameAnalysisModalContent = dynamic(() => import('./index'), {
  ssr: false,
  loading: () => (
    <Dialog open={true}>
      <DialogContent className="tl-gradient-mistBlue">
        <div className="flex h-64 items-center justify-center">
          <Loader />
        </div>
      </DialogContent>
    </Dialog>
  ),
});

interface IGameAnalysisModalWrapper {
  open: boolean;
  onClose: () => void;
}

const GameAnalysisModalWrapper = ({
  open,
  onClose,
}: IGameAnalysisModalWrapper) => {
  if (!open) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <Dialog open={true}>
          <DialogContent className="tl-gradient-mistBlue">
            <div className="flex h-64 items-center justify-center">
              <Loader />
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <GameAnalysisModalContent open={open} onClose={onClose} />
    </Suspense>
  );
};

export default GameAnalysisModalWrapper;
