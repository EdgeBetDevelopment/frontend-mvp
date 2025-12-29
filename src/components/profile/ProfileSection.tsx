'use client';

import { GeneralInformation } from './GeneralInformation';
import { Subscription } from './Subscription';

export function ProfileSection() {
  return (
    <div className="space-y-6">
      <Subscription />
      <GeneralInformation />
    </div>
  );
}
