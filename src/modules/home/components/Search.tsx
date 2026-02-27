"use client";

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRouter } from "next/navigation";
import { AiOutlineTeam } from "react-icons/ai";
import { LuUserRound } from "react-icons/lu";
import { useDebounce } from "use-debounce";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/command";
import { useClickOutside } from "@/shared/hooks/useClickOutside";
import { ROUTES } from "@/shared/config/routes";
import { searchApi } from "../services";
import Loader from "@/shared/components/loader";

const SupportSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [debouncedSearch] = useDebounce(searchValue, 500);
  const router = useRouter();

  const wrapperRef = useRef(null);
  const listRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setShowDropdown(false));

  const { data: searchResults = [], isPending: isLoading } = useQuery({
    queryKey: ["search-teams-players", debouncedSearch],
    queryFn: () => searchApi.searchTeamsAndPlayers(debouncedSearch),
    enabled: !!debouncedSearch,
  });

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
    setSearchValue("");

    if (item.type === "team") {
      router.push(ROUTES.TEAM(item.id));
    } else if (item.type === "player") {
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
          <div className="absolute top-full right-0 left-0 z-50 mt-2 rounded-md border shadow-lg">
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
                style={{ height: "240px" }}
              >
                <CommandGroup>
                  <div
                    style={{
                      height: `${virtualizer.getTotalSize()}px`,
                      position: "relative",
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
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            transform: `translateY(${virtualRow.start}px)`,
                          }}
                        >
                          {item.type === "team" ? (
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
  );
};

export default SupportSearch;
