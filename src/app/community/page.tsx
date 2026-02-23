"use client";

import { Check, MessageCircle, Users, X, Zap } from "lucide-react";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const Community = () => {
  const freeFeatures = [
    { text: "Access to free channels", included: true },
    { text: "Betting terminology resources", included: true },
    { text: "One free pick per day", included: true },
    { text: "Community discussions", included: false },
    { text: "Premium channels access", included: false },
    { text: "Additional plays & insights", included: false },
    { text: "Moderator bet logic & analysis", included: false },
  ];

  const premiumFeatures = [
    { text: "Access to all free channels", included: true },
    { text: "Betting terminology resources", included: true },
    { text: "All daily picks", included: true },
    { text: "Community discussions", included: true },
    { text: "Premium channels access", included: true },
    { text: "Additional plays & insights", included: true },
    { text: "Moderator bet logic & analysis", included: true },
  ];

  return (
    <div className="bg-background min-h-screen">
      <Navigation />
      <div className="container mx-auto px-6 py-24">
        <div className="mb-16 text-center">
          <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Users className="h-4 w-4" />
            Join the Community
          </div>
          <h1 className="font-display mb-6 text-4xl font-bold md:text-6xl">
            Connect with Smart Bettors
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
            Join our Discord server and become part of a community dedicated to
            making informed betting decisions. Server access is completely free!
          </p>
          <Link
            href={`${process.env.NEXT_PUBLIC_DISCORD_INVITE}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="gap-2 px-8 py-6 text-lg">
              <MessageCircle className="h-5 w-5" />
              Join Our Discord
            </Button>
          </Link>
        </div>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-4 text-center">
              <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Users className="text-muted-foreground h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Free Access</CardTitle>
              <p className="text-muted-foreground">No membership required</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    {feature.included ? (
                      <Check className="text-sport-nfl h-5 w-5 flex-shrink-0" />
                    ) : (
                      <X className="text-muted-foreground/50 h-5 w-5 flex-shrink-0" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-primary/50 from-primary/5 relative overflow-hidden bg-gradient-to-b to-transparent">
            <div className="bg-primary text-primary-foreground absolute right-0 top-0 rounded-bl-lg px-3 py-1 text-xs font-bold">
              PREMIUM
            </div>
            <CardHeader className="pb-4 text-center">
              <div className="bg-primary/20 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Zap className="text-primary h-6 w-6" />
              </div>
              <CardTitle className="text-2xl">Premium Access</CardTitle>
              <p className="text-muted-foreground">Unlock all channels</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="text-primary h-5 w-5 flex-shrink-0" />
                    <span className="text-foreground">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <div className="border-border/50 mt-6 border-t pt-6">
                <Link href="/pricing">
                  <Button variant="outline" className="w-full">
                    View Premium Plans
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Ready to join thousands of smart bettors?
          </p>
          <Link
            href={`${process.env.NEXT_PUBLIC_DISCORD_INVITE}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              Join Discord Server
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Community;
