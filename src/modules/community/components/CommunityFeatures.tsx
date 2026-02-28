import PageTitle from "@/shared/components/PageTitle";
import { COMMUNITY_FEATURES_DATA } from "@/modules/community/constants";
import { FeatureCard } from "./FeatureCard";

export const CommunityFeatures = () => {
  return (
    <div className="relative flex flex-col items-center gap-7">
      <PageTitle
        className="max-w-[1100px]"
        title={
          <div>
            Our <span className="text-primary-brand">discord</span> Community
          </div>
        }
        description={
          <p className="max-w-[890px]">
            Join our thriving community of sports betting enthusiasts. Get
            instant access to exclusive picks, real-time alerts, and expert
            analysis. Our Discord server is your hub for 24/7 betting
            discussions, professional insights, and collaboration with fellow
            successful bettors.
          </p>
        }
      />

      <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        {COMMUNITY_FEATURES_DATA.map((feature, index) => (
          <FeatureCard key={feature.title} {...feature} num={index + 1} />
        ))}
      </ul>
    </div>
  );
};
