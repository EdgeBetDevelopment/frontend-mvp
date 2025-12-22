import {useState} from "react";
import Image from "next/image";
import edgebetLogo from "@/assets/edgebet-logo.png";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input";
import PlayerSearchDropdown from "@/components/home/PlayerSearchDropdown";

interface SearchSectionProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onPlayerSelect: (player: { id: string; name: string }) => void;
    onTeamSelect: (team: { id: string; name: string }) => void;
}

export const SearchSection = ({
                                  searchQuery,
                                  setSearchQuery,
                                  onPlayerSelect,
                                  onTeamSelect
                              }: SearchSectionProps) => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    return (
        <div className="text-center max-w-4xl mx-auto mb-12 animate-fade-in">
            <Image
                src={edgebetLogo}
                alt="EdgeBet - Predict. Bet. Win."
                width={320}
                height={160}
                className="h-24 md:h-32 lg:h-40 w-auto mx-auto mb-8"
                priority
            />

            <div className="max-w-2xl mx-auto relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                <Input
                    type="text"
                    placeholder="Search for players, teams, or sports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    className="pl-12 h-14 text-lg bg-card border-border focus:border-primary transition-all"
                />
                {isSearchFocused && (
                    <PlayerSearchDropdown
                        searchQuery={searchQuery}
                        onPlayerSelect={onPlayerSelect}
                        onTeamSelect={onTeamSelect}
                    />
                )}
            </div>
        </div>
    );
};