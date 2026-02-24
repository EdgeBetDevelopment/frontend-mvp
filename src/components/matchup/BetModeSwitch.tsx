"use client";

import * as React from "react";

import { cn } from "@/shared/utils/helper";
import { useStore } from "@/store";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/tabs";

type Props = { className?: string };

export default function BetModeSwitch({ className }: Props) {
  const isParlay = useStore((s) => s.isParlay);
  const setIsParlay = useStore((s) => s.setIsParlay);

  return (
    <Tabs
      value={isParlay ? "parlay" : "single"}
      onValueChange={(v) => setIsParlay(v === "parlay")}
      className={cn("w-full", className)}
    >
      <TabsList className="grid h-10 w-full grid-cols-2 border border-border bg-secondary/30">
        <TabsTrigger
          value="single"
          className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
        >
          Single
        </TabsTrigger>
        <TabsTrigger
          value="parlay"
          className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:text-foreground"
        >
          Parlay
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
