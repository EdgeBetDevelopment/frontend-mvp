import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useRouter } from 'next/navigation';
import edgebetLogo from '@/assets/edgebet-logo.png';
import { Search, Lock, Crown } from 'lucide-react';
import { Input } from '@/shared/components/input';
import { Button } from '@/shared/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/dialog';
import PlayerSearchDropdown from './PlayerSearchDropdown';
import { searchApi } from '../services';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

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
  const [authError, setAuthError] = useState<401 | 402 | null>(null);
  const router = useRouter();

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => setShowDropdown(false));

  const {
    data: searchResults = [],
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['search-teams-players', debouncedSearch],
    queryFn: () => searchApi.searchTeamsAndPlayers(debouncedSearch),
    enabled: !!debouncedSearch,
    retry: false,
  });

  useEffect(() => {
    if (error) {
      const err = error as { code?: number };
      if (err?.code === 401) {
        setAuthError(401);
      } else if (err?.code === 402) {
        setAuthError(402);
      }
    }
  }, [error]);

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
    <>
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

      {/* Login Required Dialog */}
      <Dialog open={authError === 401} onOpenChange={() => setAuthError(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">
              Login Required
            </DialogTitle>
            <DialogDescription className="text-center">
              Please login to search for players and teams.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button
              className="w-full"
              onClick={() => {
                setAuthError(null);
                router.push('/login');
              }}
            >
              Login
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Premium Access Dialog */}
      <Dialog open={authError === 402} onOpenChange={() => setAuthError(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Crown className="h-8 w-8 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">
              Premium Access Required
            </DialogTitle>
            <DialogDescription className="text-center">
              Get access to search players and teams with a premium
              subscription.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-2">
              <Crown className="mt-0.5 h-4 w-4 text-primary" />
              <span className="text-sm">Full player and team database</span>
            </div>
            <div className="flex items-start gap-2">
              <Crown className="mt-0.5 h-4 w-4 text-primary" />
              <span className="text-sm">Detailed statistics & insights</span>
            </div>
            <div className="flex items-start gap-2">
              <Crown className="mt-0.5 h-4 w-4 text-primary" />
              <span className="text-sm">Advanced analytics</span>
            </div>
          </div>
          <div className="mt-6">
            <Button
              className="w-full"
              onClick={() => {
                setAuthError(null);
                router.push('/pricing');
              }}
            >
              View Premium Plans
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
