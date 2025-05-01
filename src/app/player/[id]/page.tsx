import PlayerProfile from '@/components/player/PlayerProfile';

export default function Player() {
  return (
    <div className="tl-container relative my-[90px] flex flex-col gap-[90px]">
      <div className="bg-primary-brand/60 absolute top-0 left-1/2 -z-10 h-[250px] w-1/3 -translate-x-1/2 rounded-full blur-[200px]" />
      {/* <div
        style={{ backgroundImage: `url(${GridBgImage.src})` }}
        className="absolute inset-0 -z-10 h-full w-full"
      /> */}
      <PlayerProfile />
    </div>
  );
}
