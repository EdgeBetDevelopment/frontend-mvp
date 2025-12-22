'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SportCardRedesigned from "@/components/home/SportCardRedesigned";
import { Reviews } from "@/components/home/Reviews";
import {CTA} from "@/components/home/CTA";
import {SearchSection} from "@/components/home/SearchSection";

const sports = [
    {
        id: "nba",
        name: "NBA",
        icon: "🏀",
        color: "nba",
        matches: 3,
        description: "US Basketball"
    },
    {
        id: "nfl",
        name: "NFL",
        icon: "🏈",
        color: "nfl",
        matches: 1,
        description: "US Football"
    },
    {
        id: "ncaaf",
        name: "NCAAF",
        icon: "🏈",
        color: "ncaaf",
        matches: 1,
        description: "US College Football",
        comingSoon: true
    },
    {
        id: "ncaab",
        name: "NCAAB",
        icon: "🏀",
        color: "ncaab",
        matches: 1,
        description: "US College Basketball",
        comingSoon: true
    },
    {
        id: "mlb",
        name: "MLB",
        icon: "⚾",
        color: "mlb",
        matches: 0,
        description: "US Baseball"
    },
    {
        id: "tennis",
        name: "Tennis",
        icon: "🎾",
        color: "tennis",
        matches: 0,
        description: "WTA / ATP Events"
    },
];

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSportClick = (sportId: string) => {
        router.push(`/matchup?sport=${sportId}`);
    };

    const handlePlayerSelect = (player: { id: string; name: string }) => {
        setSearchQuery("");
        router.push(`/player/${player.id}`);
    };

    const handleTeamSelect = (team: { id: string; name: string }) => {
        setSearchQuery("");
        router.push(`/team/${team.id}`);
    };

    const filteredSports = sports.filter(sport =>
        sport.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <section className="container mx-auto px-6 py-16 md:py-24">
                <SearchSection
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onPlayerSelect={handlePlayerSelect}
                    onTeamSelect={handleTeamSelect}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    {filteredSports.map((sport, index) => (
                        <SportCardRedesigned
                            key={sport.id}
                            sport={sport}
                            onClick={() => handleSportClick(sport.id)}
                            delay={index * 0.1}
                        />
                    ))}
                </div>

                {filteredSports.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No sports found matching "{searchQuery}"</p>
                    </div>
                )}
            </section>

            <Reviews />
            <CTA />
            <Footer />
        </div>
    );
}