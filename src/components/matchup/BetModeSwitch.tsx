'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { useStore } from '@/store';
import { Tabs, TabsList, TabsTrigger } from '@/ui/tabs';

type Props = { className?: string };

export default function BetModeSwitch({ className }: Props) {
  const isParlay = useStore((s) => s.isParlay);
  const setIsParlay = useStore((s) => s.setIsParlay);

  return (
    <Tabs
      value={isParlay ? 'parlay' : 'single'}
      onValueChange={(v) => setIsParlay(v === 'parlay')}
      className={cn('w-full', className)}
    >
      <TabsList className="h-auto w-full rounded-full border-[1px] border-solid border-[#484848] bg-[#2a2a2a] p-1.5">
        <TabsTrigger
          value="single"
          className="h-auto rounded-full p-1.5 text-sm font-semibold data-[state=active]:bg-[#8CFFE9] data-[state=active]:text-black data-[state=inactive]:text-white/70"
        >
          Single
        </TabsTrigger>
        <TabsTrigger
          value="parlay"
          className="h-auto rounded-full p-1.5 text-sm font-semibold data-[state=active]:bg-[#8CFFE9] data-[state=active]:text-black data-[state=inactive]:text-white/70"
        >
          Parlay
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
