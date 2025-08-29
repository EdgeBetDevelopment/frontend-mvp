import { ProfileSection } from '@/components/profile/ProfileSection';

import Ellipse from '@/assets/ellipse.png';
import GridBgImage from '@/assets/gridBg.png';

export default function Profile() {
  return (
    <main className="relative flex flex-col items-center gap-6 sm:gap-9">
      <div
        style={{ backgroundImage: `url(${GridBgImage.src})` }}
        className="absolute inset-0 top-[-150px] -z-10 h-full w-full bg-cover bg-no-repeat"
      />
      <div
        style={{ backgroundImage: `url(${Ellipse.src})` }}
        className="absolute inset-0 top-[-150px] -z-10 h-full w-full bg-cover bg-no-repeat"
      />
      <h1 className="mt-[90px] text-center text-[40px] font-bold sm:text-[60px] sm:font-medium">
        My <span className="text-[#84FDF7]">Profile</span>
      </h1>
      <p className="px-4 text-center text-base font-normal sm:px-0">
        Manage your personal information and account settings in one place
      </p>
      <div className="flex w-full flex-col items-center">
        <ProfileSection />
      </div>
    </main>
  );
}
