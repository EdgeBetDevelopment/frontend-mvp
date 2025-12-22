import { Card } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";

interface SportCardProps {
    sport: {
        id: string;
        name: string;
        icon: string;
        color: string;
        matches: number;
        description: string;
        comingSoon?: boolean;
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
            className={`group relative overflow-hidden transition-all border-border bg-card animate-fade-in ${
                sport.comingSoon
                    ? "cursor-default opacity-70"
                    : "cursor-pointer hover:scale-105 hover:shadow-lg hover:border-primary/50"
            }`}
            style={{ animationDelay: `${delay}s` }}
        >
            <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{sport.icon}</div>
                    {sport.comingSoon ? (
                        <Clock className="w-5 h-5 text-muted-foreground" />
                    ) : (
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    )}
                </div>

                <h3 className={`text-2xl font-display font-bold mb-2 transition-colors ${
                    sport.comingSoon ? "text-muted-foreground" : "text-foreground group-hover:text-primary"
                }`}>
                    {sport.name}
                </h3>

                <p className="text-muted-foreground text-sm mb-4">
                    {sport.description}
                </p>

                <div className="flex items-center gap-2 text-sm">
                    <span className={`inline-block w-2 h-2 rounded-full bg-${sport.color}`}></span>
                    <span className="text-muted-foreground">{sport.matches} upcoming matches</span>
                </div>
            </div>

            {sport.comingSoon && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-secondary/90 backdrop-blur-sm py-1.5 px-4 rounded-full border border-border z-20">
                    <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">Coming Soon</span>
                    </div>
                </div>
            )}

            {!sport.comingSoon && (
                <div className={`absolute inset-0 bg-gradient-to-br from-${sport.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            )}
        </Card>
    );
};

export default SportCardRedesigned;
