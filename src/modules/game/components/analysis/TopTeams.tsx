import Link from "next/link";

import { ROUTES } from "@/shared/config/routes";
import { Avatar, AvatarImage } from "@/shared/components/avatar";
import { Card } from "@/shared/components";

import StatisticsIcon from "@/assets/icons/statistics.svg";

const TopTeams = ({
  favoriteTeamInfo,
  predictedWinnerInfo,
}: {
  favoriteTeamInfo: {
    name: string;
    id: number;
    logo: string;
  } | null;
  predictedWinnerInfo: {
    name: string;
    id: number;
    logo: string;
  } | null;
}) => {
  return (
    <div className="flex items-stretch gap-3.5">
      {/* <Card
        title="Favorite Team"
        icon={<StatisticsIcon />}
        className="flex-1/2"
      >
        <div className="tl-paraghraph2 flex flex-1 items-center gap-2 rounded-xl">
          <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
            <div>
              <AvatarImage src={favoriteTeamInfo?.logo} />
            </div>
          </Avatar>

          <Link
            href={ROUTES.TEAM(favoriteTeamInfo?.id || '')}
            className="text-text-primary hover:underline"
          >
            {favoriteTeamInfo?.name}
          </Link>
        </div>
      </Card> */}

      <Card
        title="Predicted Winner"
        icon={<StatisticsIcon />}
        className="flex-1/2"
      >
        <div className="tl-paraghraph2 flex flex-1 items-center gap-2 rounded-xl">
          <Avatar className="flex h-8 w-8 items-center justify-center rounded-full border bg-[#33758780]">
            <div>
              <AvatarImage src={predictedWinnerInfo?.logo} />
            </div>
          </Avatar>
          <Link
            href={ROUTES.TEAM(predictedWinnerInfo?.id || "")}
            className="text-text-primary hover:underline"
          >
            {predictedWinnerInfo?.name}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default TopTeams;
