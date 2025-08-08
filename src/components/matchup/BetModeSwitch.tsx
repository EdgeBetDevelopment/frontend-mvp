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
      <TabsList className="grid h-12 w-full grid-cols-2 rounded-xl border-[1px] border-solid border-[#484848] bg-[#2a2a2a] p-1">
        <TabsTrigger
          value="single"
          className="h-10 rounded-xl font-semibold data-[state=active]:bg-[#8CFFE9] data-[state=active]:text-black data-[state=inactive]:text-white/70"
        >
          Single
        </TabsTrigger>
        <TabsTrigger
          value="parlay"
          className="h-10 rounded-xl font-semibold data-[state=active]:bg-[#8CFFE9] data-[state=active]:text-black data-[state=inactive]:text-white/70"
        >
          Parlay
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
