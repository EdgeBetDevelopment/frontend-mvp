import React from 'react';
import AuthGuard from '../AuthGuard';
import { TrackerPage } from '@/modules/tracker';

const Tracker = () => {
  return (
    <AuthGuard message="Please login to access the tracker.">
      <TrackerPage />
    </AuthGuard>
  );
};

export default Tracker;
