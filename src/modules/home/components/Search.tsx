'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRouter } from 'next/navigation';
import { AiOutlineTeam } from 'react-icons/ai';
import { LuUserRound } from 'react-icons/lu';
import { useDebounce } from 'use-debounce';
import { Lock, Crown } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/command';
import { Button } from '@/shared/components/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/dialog';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { ROUTES } from '@/shared/config/routes';
import { searchApi } from '../services';
import Loader from '@/shared/components/loader';

const SupportSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedSearch] = useDebounce(searchValue, 500);
  const [authError, setAuthError] = useState<401 | 402 | null>(null);
  const router = useRouter();

  const wrapperRef = useRef(null);
  const listRef = useRef<HTMLDivElement>(null);
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

  const virtualizer = useVirtualizer({
    count: searchResults.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => 42,
    overscan: 5,
  });

  useEffect(() => {
    if (searchValue) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debouncedSearch]);

  const onSelectQuestion = (item: any) => {
    setShowDropdown(false);
    setSearchValue('');

    if (item.type === 'team') {
      router.push(ROUTES.TEAM(item.id));
    } else if (item.type === 'player') {
      router.push(ROUTES.PLAYER(item.id));
    }
  };

  const onClickSearch = () => {
    if (!searchValue) return;
    if (searchResults.length !== 0) {
      setShowDropdown(true);
    }
  };

  return (
    <>
      <div className="relative mt-4 w-full max-w-xl" ref={wrapperRef}>
        <Command className="rounded-2xl bg-transparent">
          <CommandInput
            inputClassName="border-0 rounded-2xl text-text-primary font-normal text-lg leading-7 tracking-normal align-middle capitalize"
            containerClassName="border-border rounded-2xl border text-text-primary bg-surface-secondary px-3 py-1.5"
            placeholder="Search..."
            onClick={onClickSearch}
            value={searchValue}
            onValueChange={setSearchValue}
          />

          {showDropdown && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-md border shadow-lg">
              {isLoading || searchResults.length === 0 ? (
                <div className="bg-surface-secondary flex h-[240px] items-center justify-center rounded-md">
                  {isLoading ? (
                    <Loader color="border-primary-blue" />
                  ) : (
                    <CommandEmpty className="text-text-primary text-lg">
                      No items found
                    </CommandEmpty>
                  )}
                </div>
              ) : (
                <CommandList
                  ref={listRef}
                  className="bg-surface-secondary relative flex max-h-60 flex-col overflow-y-auto rounded-md"
                  style={{ height: '240px' }}
                >
                  <CommandGroup>
                    <div
                      style={{
                        height: `${virtualizer.getTotalSize()}px`,
                        position: 'relative',
                      }}
                    >
                      {virtualizer.getVirtualItems().map((virtualRow) => {
                        const item = searchResults[virtualRow.index];

                        return (
                          <CommandItem
                            key={item.id}
                            value={item.full_name}
                            onSelect={() => onSelectQuestion(item)}
                            className="text-text-primary"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              transform: `translateY(${virtualRow.start}px)`,
                            }}
                          >
                            {item.type === 'team' ? (
                              <AiOutlineTeam />
                            ) : (
                              <LuUserRound />
                            )}
                            {item.full_name}
                          </CommandItem>
                        );
                      })}
                    </div>
                  </CommandGroup>
                </CommandList>
              )}
            </div>
          )}
        </Command>
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

export default SupportSearch;
