'use client';

import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/shared/components/button';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/tabs';
import { formUrlQuery } from '@/shared/utils';
import { useStore } from '@/store';
import { SPORT_CONFIGS } from '../config';

const MatchupPageFilters = () => {
  const params = useSearchParams() as ReadonlyURLSearchParams;
  const router = useRouter();
  const type = params.get('type');
  const isAmerican = useStore((state) => state.isAmerican);
  const setIsAmerican = useStore((state) => state.setIsAmerican);

  const onChangeType = (value: string | null, disabled?: boolean) => {
    if (disabled) return;
    if (value === type) return;

    const cleanParams = formUrlQuery({
      params: params.toString(),
      keysToRemove: ['sport'],
    });
    const cleanSearch = cleanParams.split('?')[1] ?? '';

    const url = value
      ? formUrlQuery({ params: cleanSearch, key: 'type', value })
      : formUrlQuery({ params: cleanSearch, keysToRemove: ['type'] });

    router.push(url);
  };

  return (
    <div className="space-y-6">
      {/* Sport Tabs */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="shrink-0">
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
          {SPORT_CONFIGS.map((sport) => (
            <Button
              key={sport.label}
              variant={type === sport.value ? 'default' : 'outline'}
              onClick={() => onChangeType(sport.value, sport.disabled)}
              className="shrink-0"
              disabled={sport.disabled}
            >
              {sport.label}
            </Button>
          ))}
        </div>

        <Button variant="ghost" size="icon" className="shrink-0">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <Tabs
        value={isAmerican ? 'american' : 'european'}
        onValueChange={(v) => setIsAmerican(v === 'american')}
      >
        <TabsList>
          <TabsTrigger value="american">American</TabsTrigger>
          <TabsTrigger value="european">European</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MatchupPageFilters;
