import { Card } from "@/shared/components/card";
import { ArrowRight, Clock } from "lucide-react";
import Loader from "@/shared/components/loader";

interface SportCardProps {
  sport: {
    id: string;
    name: string;
    icon: string;
    color: string;
    matches?: number;
    description: string;
    comingSoon?: boolean;
    isLoadingMatches?: boolean;
  };
  onClick: () => void;
  delay?: number;
}

const SportCardRedesigned = ({ sport, onClick, delay = 0 }: SportCardProps) => {
  const handleClick = () => {
    if (!sport.comingSoon) {
      onClick();
    }
  };

  return (
    <Card
      onClick={handleClick}
      className={`group relative animate-fade-in overflow-hidden border-border bg-card transition-all ${
        sport.comingSoon
          ? "cursor-default opacity-70"
          : "cursor-pointer hover:scale-105 hover:border-primary/50 hover:shadow-lg"
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="relative z-10 p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="text-5xl">{sport.icon}</div>
          {sport.comingSoon ? (
            <Clock className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
          )}
        </div>

        <h3
          className={`mb-2 font-display text-2xl font-bold transition-colors ${
            sport.comingSoon
              ? "text-muted-foreground"
              : "text-foreground group-hover:text-primary"
          }`}
        >
          {sport.name}
        </h3>

        <p className="mb-4 text-sm text-muted-foreground">
          {sport.description}
        </p>

        <div className="flex items-center gap-2 text-sm">
          <span
            className={`inline-block h-2 w-2 rounded-full bg-${sport.color}`}
          ></span>
          {sport?.matches !== undefined && (
            <span className="text-muted-foreground">
              {sport.isLoadingMatches ? (
                <Loader size="h-4 w-4" />
              ) : (
                <>{sport?.matches} upcoming matches</>
              )}
            </span>
          )}
        </div>
      </div>

      {sport.comingSoon && (
        <div className="absolute left-1/2 top-3 z-20 -translate-x-1/2 rounded-full border border-border bg-secondary/90 px-4 py-1.5 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Coming Soon
            </span>
          </div>
        </div>
      )}

      {!sport.comingSoon && (
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${sport.color}/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100`}
        ></div>
      )}
    </Card>
  );
};

export default SportCardRedesigned;
