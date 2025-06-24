'use client';

import React from 'react';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/ui/button';
import { formUrlQuery } from '@/utils/url';

import { OddsTypeSwitcher } from './SwitchSelector';

import AmericanFootballIcon from '@/assets/icons/american-football.svg';
import BaseballIcon from '@/assets/icons/baseball.svg';
import FootbalIcon from '@/assets/icons/football.svg';
import TennisIcon from '@/assets/icons/tenins.svg';

const SPORTS_TYPE = [
  { icon: <FootbalIcon />, label: 'NBA', value: null, disabled: false },
  { icon: <FootbalIcon />, label: 'WNBA', value: 'wnba', disabled: true },
  {
    icon: <AmericanFootballIcon />,
    label: 'NFL',
    value: 'nfl',
    disabled: true,
  },
  {
    icon: <AmericanFootballIcon />,
    label: 'NCAAF',
    value: 'ncaaf',
    disabled: true,
  },
  {
    icon: <AmericanFootballIcon />,
    label: 'NCAAB',
    value: 'ncaab',
    disabled: true,
  },
  { icon: <FootbalIcon />, label: 'Soccer', value: 'soccer', disabled: true },
  { icon: <TennisIcon />, label: 'Tennis', value: 'tennis', disabled: true },
  { icon: <TennisIcon />, label: 'UFC', value: 'ufc', disabled: true },
  { icon: <BaseballIcon />, label: 'MLB', value: 'mlb', disabled: true },
  { icon: <BaseballIcon />, label: 'Golf', value: 'golf', disabled: true },
  { icon: <BaseballIcon />, label: 'NHL', value: 'nhl', disabled: true },
];

const MatchupPageFilters = () => {
  const params = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();
  const type = params.get('type');

  const onChangeType = (value: string | null, disabled?: boolean) => {
    if (disabled || value === type) return;

    const url = value
      ? formUrlQuery({ params: params.toString(), key: 'type', value })
      : formUrlQuery({ params: params.toString(), keysToRemove: ['type'] });

    router.push(url);
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <Carousel opts={{ align: 'start' }} className="w-full">
          <CarouselPrevious />
          <CarouselContent className="">
            {SPORTS_TYPE.map((tab) => {
              const button = (
                <Button
                  className="w-full min-w-[120px] sm:min-w-[140px]"
                  variant={type === tab.value ? 'brand' : 'default'}
                  onClick={() => onChangeType(tab.value, tab.disabled)}
                >
                  {tab.icon}
                  <span className="">{tab.label}</span>
                </Button>
              );

              return (
                <CarouselItem
                  key={tab.label}
                  className="xs:basis-[33%] basis-[40%] px-2 sm:basis-[25%] md:basis-[20%] lg:basis-auto"
                >
                  {tab.disabled ? (
                    <Tooltip>
                      <TooltipTrigger asChild>{button}</TooltipTrigger>
                      <TooltipContent className="text-sm">
                        Coming soon
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    button
                  )}
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselNext />
        </Carousel>
        <div className="mt-4 flex">
          <OddsTypeSwitcher />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MatchupPageFilters;
