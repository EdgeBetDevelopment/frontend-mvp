import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import edgebetLogo from '@/assets/edgebet-logo.png';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PlayerSearchDropdown from '@/components/home/PlayerSearchDropdown';
import apiService from '@/services';
import { useClickOutside } from '@/hooks/useClickOutside';

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
  onTeamSelect,
}: SearchSectionProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => setShowDropdown(false));

  const { data: searchResults = [], isPending: isLoading } = useQuery({
    queryKey: ['search-teams-players', debouncedSearch],
    queryFn: () => apiService.searchTeamsAndPlayers(debouncedSearch),
    enabled: !!debouncedSearch,
  });

  useEffect(() => {
    if (searchQuery) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchQuery, debouncedSearch]);

  const handlePlayerSelect = (player: { id: string; name: string }) => {
    setShowDropdown(false);
    setSearchQuery('');
    onPlayerSelect(player);
  };

  const handleTeamSelect = (team: { id: string; name: string }) => {
    setShowDropdown(false);
    setSearchQuery('');
    onTeamSelect(team);
  };

  const onClickSearch = () => {
    if (!searchQuery) return;
    if (searchResults.length !== 0) {
      setShowDropdown(true);
    }
  };

  return (
    <div className="mx-auto mb-12 max-w-4xl animate-fade-in text-center">
      <img
        src={edgebetLogo.src}
        alt="EdgeBet - Predict. Bet. Win."
        className="mx-auto mb-8 h-24 w-auto md:h-32 lg:h-40"
      />

      <div className="group relative mx-auto max-w-2xl" ref={wrapperRef}>
        <Search className="absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
        <Input
          type="text"
          placeholder="Search for players, teams, or sports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onClick={onClickSearch}
          onFocus={() => searchQuery && setShowDropdown(true)}
          className="h-14 border-border bg-card pl-12 text-lg transition-all focus:border-primary"
        />
        {showDropdown && (
          <PlayerSearchDropdown
            searchQuery={searchQuery}
            searchResults={searchResults}
            isLoading={isLoading}
            onPlayerSelect={handlePlayerSelect}
            onTeamSelect={handleTeamSelect}
          />
        )}
      </div>
    </div>
  );
};
