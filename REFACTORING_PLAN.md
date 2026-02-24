# Architecture Refactoring Plan

## Progress Tracker

### Completed
- [x] **Phase 1.1**: Merged `src/ui/` into `src/shared/components/` (removed duplicate folder)
- [x] Updated all imports from `@/ui/` to `@/shared/components/`

### In Progress
- [ ] Phase 2: Create Feature Modules

### Pending
- [ ] Phase 3: Reorganize Store
- [ ] Phase 4: Cleanup deprecated folders
- [ ] Phase 5: Final verification

---

## Target Architecture

```
src/
├── app/                    # Next.js pages (App Router)
├── modules/                # Feature modules
├── shared/                 # Shared resources
│   ├── components/         # Dumb/reusable components (input, button, etc.)
│   ├── constants/          # Global constants
│   ├── lib/                # External library configurations
│   └── utils/              # Utility functions
└── store/                  # Global Zustand stores
```

### Module Structure Pattern (based on auth module)

```
modules/<module-name>/
├── components/
│   ├── index.ts            # Barrel export for components
│   └── [ComponentName].tsx
├── hooks/
│   ├── index.ts            # Barrel export for hooks
│   └── use[HookName].ts
├── constants.ts            # Module-specific constants
├── services.ts             # API services
├── types.ts                # TypeScript types
└── index.ts                # Module barrel export
```

---

## Phase 1: Create Shared Directory Structure

### 1.1 Create `shared/components/` (move from components/ui)

**Move these files:**
```
src/components/ui/ → src/shared/components/ui/
```

Files to move:
- avatar.tsx
- badge.tsx
- button.tsx
- card.tsx
- carousel.tsx
- command.tsx
- dialog.tsx
- dropdown-menu.tsx
- input-otp.tsx
- input.tsx
- label.tsx
- select.tsx
- sheet.tsx
- table.tsx
- tooltip.tsx

**Also create shared dumb components from existing:**
- Logo.tsx → shared/components/Logo.tsx
- PageTitle.tsx → shared/components/PageTitle.tsx
- EmptyPlaceholder.tsx → shared/components/EmptyPlaceholder.tsx
- CTABlock.tsx → shared/components/CTABlock.tsx

### 1.2 Create `shared/constants/`

**New file:** `src/shared/constants/index.ts`
- Move route constants from `src/routes/index.ts`
- Consolidate any other global constants

### 1.3 Create `shared/lib/`

**Move:** `src/lib/utils.ts` → `src/shared/lib/utils.ts`

### 1.4 Create `shared/utils/`

**Move all from:** `src/utils/` → `src/shared/utils/`
- convertAmericanToDecimal.ts
- formatOdds.ts
- error-handling.ts
- status.ts
- team.ts
- text.ts
- time.ts
- url.ts
- index.ts

---

## Phase 2: Create Feature Modules

### 2.1 Module: `game`

**Purpose:** Game details, analysis, predictions, AI insights

**Components to move:**
- `components/modals/game-analysis/*` → `modules/game/components/analysis/`
  - Analys.tsx
  - ErrorBoundary.tsx
  - InjuryTable.tsx
  - KeyPlayers.tsx
  - MarketSummary.tsx
  - TeamStatsTable.tsx
  - TobBets.tsx
  - TopTeams.tsx
  - index.tsx
  - wrapper.tsx

**Pages components:**
- `pages-components/GameBreakdownPage.tsx` → `modules/game/components/GameBreakdownPage.tsx`

**Types to extract from `types/game.ts`:**
- IGame
- IGameWithAI
- IPrediction
- IAnalysis
- IRecommendedBet
- etc.

**Services to extract from `services/index.ts`:**
- getGames()
- getGameById()
- getScoreboard()

**Structure:**
```
modules/game/
├── components/
│   ├── index.ts
│   ├── GameBreakdownPage.tsx
│   └── analysis/
│       ├── Analys.tsx
│       ├── InjuryTable.tsx
│       ├── KeyPlayers.tsx
│       ├── MarketSummary.tsx
│       ├── TeamStatsTable.tsx
│       ├── TopBets.tsx
│       ├── TopTeams.tsx
│       ├── GameAnalysisModal.tsx
│       └── index.ts
├── services.ts
├── types.ts
└── index.ts
```

---

### 2.2 Module: `player`

**Purpose:** Player profiles, stats, search

**Components to move:**
- `components/player/*` → `modules/player/components/`
  - PlayerProfile.tsx
  - PlayerSeasonStats.tsx
  - PlayerStatsChart.tsx
  - LeagueModal.tsx
  - LeagueTable.tsx
  - TableBodyRow.tsx
  - styles.css

**Types to extract from `types/player.ts`:**
- ITeamPlayer

**Hooks to move:**
- `hooks/usePlayer.ts` → `modules/player/hooks/usePlayer.ts`

**Services to extract:**
- getPlayerById()
- getPlayerByName()
- searchPlayer()

**Structure:**
```
modules/player/
├── components/
│   ├── index.ts
│   ├── PlayerProfile.tsx
│   ├── PlayerSeasonStats.tsx
│   ├── PlayerStatsChart.tsx
│   ├── LeagueModal.tsx
│   ├── LeagueTable.tsx
│   └── TableBodyRow.tsx
├── hooks/
│   ├── index.ts
│   └── usePlayer.ts
├── services.ts
├── types.ts
├── styles.css
└── index.ts
```

---

### 2.3 Module: `team`

**Purpose:** Team profiles, stats, search

**Components to move:**
- `components/team/*` → `modules/team/components/`
  - TeamStatsChart.tsx
  - TeamStatsTable.tsx

**Pages components:**
- `pages-components/TeamPage.tsx` → `modules/team/components/TeamPage.tsx`

**Types to extract from `types/team.ts`:**
- ITeam
- SocialMedia
- TeamStatistics
- etc.

**Services to extract:**
- findTeam()
- searchTeam()
- getTeamById()

**Structure:**
```
modules/team/
├── components/
│   ├── index.ts
│   ├── TeamPage.tsx
│   ├── TeamStatsChart.tsx
│   └── TeamStatsTable.tsx
├── services.ts
├── types.ts
└── index.ts
```

---

### 2.4 Module: `matchup`

**Purpose:** Game matchups, comparisons, filters

**Components to move:**
- `components/matchup/*` → `modules/matchup/components/`
  - BetModeSwitch.tsx
  - Filters.tsx
  - GameCard.tsx
  - SwitchSelector.tsx

**Pages components:**
- `pages-components/MatchupPage.tsx` → `modules/matchup/components/MatchupPage.tsx`

**Store slice:**
- `store/slices/matchupSlice.ts` - keep reference, or move to module

**Structure:**
```
modules/matchup/
├── components/
│   ├── index.ts
│   ├── MatchupPage.tsx
│   ├── BetModeSwitch.tsx
│   ├── Filters.tsx
│   ├── GameCard.tsx
│   └── SwitchSelector.tsx
├── types.ts
└── index.ts
```

---

### 2.5 Module: `tracker`

**Purpose:** Bet tracking functionality

**Components to move:**
- `components/tracker/BetTrackerTable.tsx` → `modules/tracker/components/`
- `pages-components/TrackerPage.tsx` → `modules/tracker/components/`
- `pages-components/TrackBetAside.tsx` → `modules/tracker/components/`
- `components/modals/TrackBetsModal.tsx` → `modules/tracker/components/`

**Types to extract from `types/tracker.ts`:**
- ISelection
- IGameTracker

**Services to extract:**
- createBet()
- createSingleBets()
- getBetList()

**Structure:**
```
modules/tracker/
├── components/
│   ├── index.ts
│   ├── TrackerPage.tsx
│   ├── TrackBetAside.tsx
│   ├── BetTrackerTable.tsx
│   └── TrackBetsModal.tsx
├── services.ts
├── types.ts
└── index.ts
```

---

### 2.6 Module: `picks` (Pick of the Day)

**Purpose:** Pick of the day feature

**Components to move:**
- `pages-components/PickOfDayPage.tsx` → `modules/picks/components/`
- `pages-components/pick-of-day/components/*` → `modules/picks/components/`
  - ApiPickCard.tsx
  - ConfidenceBadge.tsx
  - ModeratorCard.tsx
  - ModeratorStats.tsx
  - NotificationBanner.tsx

**Types/Helpers:**
- `pages-components/pick-of-day/types.ts` → `modules/picks/types.ts`
- `pages-components/pick-of-day/helpers.ts` → `modules/picks/helpers.ts`

**Types to extract from `types/pickOfTheDay.ts`:**
- PickOfDay
- PickOfDayGamePrediction

**Services to extract:**
- getPickOfTheDayList()
- getPickOfTheDayToday()
- etc.

**Structure:**
```
modules/picks/
├── components/
│   ├── index.ts
│   ├── PickOfDayPage.tsx
│   ├── ApiPickCard.tsx
│   ├── ConfidenceBadge.tsx
│   ├── ModeratorCard.tsx
│   ├── ModeratorStats.tsx
│   └── NotificationBanner.tsx
├── helpers.ts
├── services.ts
├── types.ts
└── index.ts
```

---

### 2.7 Module: `profile`

**Purpose:** User profile management

**Components to move:**
- `components/profile/*` → `modules/profile/components/`
  - GeneralInformation.tsx
  - Modal.tsx
  - PasswordSettings.tsx
  - ProfileSection.tsx
  - SecuritySettings.tsx
  - Subscription.tsx

**Services to extract from `services/user.ts`:**
- User-related endpoints

**Structure:**
```
modules/profile/
├── components/
│   ├── index.ts
│   ├── GeneralInformation.tsx
│   ├── Modal.tsx
│   ├── PasswordSettings.tsx
│   ├── ProfileSection.tsx
│   ├── SecuritySettings.tsx
│   └── Subscription.tsx
├── services.ts
├── types.ts
└── index.ts
```

---

### 2.8 Module: `pricing`

**Purpose:** Pricing and subscription

**Components to move:**
- `components/pricing/*` → `modules/pricing/components/`
  - AnnualPricingCard.tsx
  - PricingCard.tsx
  - PricingCardSkeleton.tsx
  - PricingDisclaimer.tsx
  - PricingFaq.tsx
  - PricingGrid.tsx
  - PricingHeader.tsx

**Hooks:**
- `components/pricing/hooks/usePricingPlans.tsx` → `modules/pricing/hooks/`

**Services from `services/payment.ts`**

**Structure:**
```
modules/pricing/
├── components/
│   ├── index.ts
│   ├── AnnualPricingCard.tsx
│   ├── PricingCard.tsx
│   ├── PricingCardSkeleton.tsx
│   ├── PricingDisclaimer.tsx
│   ├── PricingFaq.tsx
│   ├── PricingGrid.tsx
│   └── PricingHeader.tsx
├── hooks/
│   ├── index.ts
│   └── usePricingPlans.ts
├── services.ts
├── types.ts
└── index.ts
```

---

### 2.9 Module: `admin`

**Purpose:** Admin panel functionality

**Components to move:**
- `components/admin/*` → `modules/admin/components/`
  - AdminApp.tsx
  - AdminLayout.tsx
  - ModeratorAdd/Edit/List.tsx
  - PickOfTheDay*.tsx
  - ReviewCreate/Edit/List.tsx
  - SubscriberCreate/Edit/List.tsx
  - UserList.tsx
  - UserBet.tsx
  - UserWithBetsList.tsx
  - DeteleGamePredictionButton.tsx
  - pick-of-the-day/*

**Services from `services/admin.ts`**

**Structure:**
```
modules/admin/
├── components/
│   ├── index.ts
│   ├── AdminApp.tsx
│   ├── AdminLayout.tsx
│   ├── moderators/
│   │   ├── ModeratorAdd.tsx
│   │   ├── ModeratorEdit.tsx
│   │   └── ModeratorList.tsx
│   ├── reviews/
│   │   ├── ReviewCreate.tsx
│   │   ├── ReviewEdit.tsx
│   │   └── ReviewList.tsx
│   ├── subscribers/
│   │   ├── SubscriberCreate.tsx
│   │   ├── SubscriberEdit.tsx
│   │   └── SubscriberList.tsx
│   ├── users/
│   │   ├── UserList.tsx
│   │   ├── UserBet.tsx
│   │   └── UserWithBetsList.tsx
│   └── picks/
│       ├── PickOfTheDayCreate.tsx
│       ├── PickOfTheDayEdit.tsx
│       ├── PickOfTheDayList.tsx
│       └── MarketTypeFields.tsx
├── constants.ts
├── services.ts
├── types.ts
└── index.ts
```

---

### 2.10 Module: `home`

**Purpose:** Homepage components

**Components to move:**
- `components/home/*` → `modules/home/components/`
  - HeroBlock.tsx
  - SearchSection.tsx
  - EventsTable.tsx
  - ReviewCard.tsx
  - Reviews.tsx
  - UserReviews.tsx
  - SportCard.tsx
  - SportCardRedesigned.tsx
  - SportsList.tsx
  - StatisticsBlock.tsx
  - PlayerSearchDropdown.tsx
  - Search.tsx
  - CTA.tsx
  - WhopAuthHandler.tsx

**Hooks:**
- `hooks/useReviews.ts` → `modules/home/hooks/`

**Structure:**
```
modules/home/
├── components/
│   ├── index.ts
│   ├── HeroBlock.tsx
│   ├── SearchSection.tsx
│   ├── EventsTable.tsx
│   ├── reviews/
│   │   ├── ReviewCard.tsx
│   │   ├── Reviews.tsx
│   │   └── UserReviews.tsx
│   ├── sports/
│   │   ├── SportCard.tsx
│   │   ├── SportCardRedesigned.tsx
│   │   └── SportsList.tsx
│   ├── StatisticsBlock.tsx
│   ├── search/
│   │   ├── PlayerSearchDropdown.tsx
│   │   └── Search.tsx
│   ├── CTA.tsx
│   └── WhopAuthHandler.tsx
├── hooks/
│   ├── index.ts
│   └── useReviews.ts
└── index.ts
```

---

### 2.11 Expand Module: `community`

**Components to add:**
- `components/community/*` → `modules/community/components/`
  - CommunityFeatures.tsx
  - DiscordBlock.tsx

**Structure:**
```
modules/community/
├── components/
│   ├── index.ts
│   ├── CommunityFeatures.tsx
│   └── DiscordBlock.tsx
├── constants.ts (already exists)
└── index.ts
```

---

## Phase 3: Reorganize Store

### Current Structure:
```
store/
├── index.ts
└── slices/
    ├── matchupSlice.ts
    └── resetPassSlice.ts
```

### Target Structure:
```
store/
├── index.ts                # Main store setup
├── matchup.ts              # Matchup slice (or keep in module)
└── resetPass.ts            # Reset password slice (move to auth module?)
```

**Decision:** Keep global store minimal. Module-specific state can stay in modules (like auth context).

---

## Phase 4: Cleanup

### 4.1 Remove Deprecated/Duplicate Folders

After migration, remove:
- `src/components/auth/` (moved to modules/auth)
- ~~`src/ui/` (duplicate, merge and delete)~~ ✅ DONE - merged into shared/components
- `src/pages-components/` (distributed to modules)
- `src/context/` (already re-exports from modules/auth)
- `src/lib/` (moved to shared/lib)
- `src/utils/` (moved to shared/utils)
- `src/routes/` (moved to shared/constants)
- `src/types/` (distributed to modules)
- `src/hooks/auth/` (already in modules/auth)

### 4.2 Update All Imports

After moving files, update imports throughout the codebase:
- Use module barrel exports: `import { Component } from '@/modules/game'`
- Use shared imports: `import { Button } from '@/shared/components/ui'`
- Use store imports: `import { useStore } from '@/store'`

---

## Phase 5: Final Structure

```
src/
├── app/                           # Next.js App Router pages
│   ├── (auth)/                    # Auth group
│   ├── (admin)/                   # Admin group
│   ├── layout.tsx
│   ├── page.tsx
│   └── [feature]/page.tsx
│
├── modules/                       # Feature modules
│   ├── admin/
│   ├── auth/                      # ✓ Already done
│   ├── community/                 # ✓ Partially done
│   ├── game/
│   ├── home/
│   ├── matchup/
│   ├── picks/
│   ├── player/
│   ├── pricing/
│   ├── profile/
│   ├── team/
│   └── tracker/
│
├── shared/                        # Shared resources
│   ├── components/
│   │   ├── ui/                    # Shadcn/Radix components
│   │   ├── Logo.tsx
│   │   ├── PageTitle.tsx
│   │   ├── EmptyPlaceholder.tsx
│   │   ├── CTABlock.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── index.ts
│   ├── constants/
│   │   ├── routes.ts
│   │   └── index.ts
│   ├── lib/
│   │   └── utils.ts
│   └── utils/
│       ├── time.ts
│       ├── formatOdds.ts
│       ├── error-handling.ts
│       └── index.ts
│
├── store/                         # Global Zustand store
│   ├── index.ts
│   └── slices/
│
├── providers/                     # React providers
│   └── QueryProvider.tsx
│
├── hooks/                         # Global hooks (keep minimal)
│   ├── useBreakpoint.tsx
│   ├── useClickOutside.ts
│   ├── useDebounce.ts
│   ├── useIsMobile.ts
│   └── useModalManager.ts
│
├── wrappers/                      # Keep or move to shared
│   ├── BackgroundOverlay.tsx
│   └── ListRenderer.tsx
│
└── assets/                        # Static assets
    ├── images/
    └── icons/
```

---

## Migration Order (Recommended)

### Wave 1: Foundation
1. Create `shared/` directory structure
2. Move UI components to `shared/components/ui/`
3. Move utils to `shared/utils/`
4. Move lib to `shared/lib/`
5. Create `shared/constants/` with routes

### Wave 2: Simple Modules
6. Create `modules/community/` (expand existing)
7. Create `modules/team/`
8. Create `modules/player/`

### Wave 3: Complex Modules
9. Create `modules/game/`
10. Create `modules/matchup/`
11. Create `modules/tracker/`

### Wave 4: Business Modules
12. Create `modules/picks/`
13. Create `modules/pricing/`
14. Create `modules/profile/`

### Wave 5: Admin & Home
15. Create `modules/admin/`
16. Create `modules/home/`

### Wave 6: Cleanup
17. Remove deprecated folders
18. Update all imports
19. Test thoroughly

---

## Import Path Aliases (tsconfig.json)

Ensure these aliases are configured:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/modules/*": ["./src/modules/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/store": ["./src/store"],
      "@/app/*": ["./src/app/*"]
    }
  }
}
```

---

## Notes

1. **Keep existing functionality working** - Each migration step should maintain working state
2. **Barrel exports are key** - Each module's `index.ts` should export everything publicly needed
3. **Services can remain global** - If a service is used across many modules, keep it in services/ or create a shared service
4. **Types follow data** - Types go with the module that "owns" that data
5. **Hooks follow usage** - Hooks used only in one module go there; global hooks stay in hooks/
