"use client";

import React, { useEffect, useState } from "react";

import PageTitle from "@/shared/components/PageTitle";
import { paymentService } from "../services";
import type { ISubscriptionType } from "../types";
import { Button } from "@/shared/components/button";
import { Separator } from "@/shared/components/separator";

import GridBgImage from "@/assets/gridBg.png";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import CheckIcon from "@/assets/icons/check.svg";

const PricingBlock = () => {
  const [subscriptions, setSubscriptions] = useState<ISubscriptionType[]>([]);

  useEffect(() => {
    const fetchSubs = async () => {
      try {
        const data = await paymentService.getSubscriptionTypes();
        setSubscriptions(data);
      } catch (error) {
        console.error("Error fetching subscription types", error);
      }
    };
    fetchSubs();
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden py-10">
      <div className="bg-primary-brand/60 absolute top-1/3 left-1/2 -z-10 h-[200px] w-1/3 -translate-x-1/2 rounded-full blur-[300px]" />
      <div
        style={{ backgroundImage: `url(${GridBgImage.src})` }}
        className="absolute inset-0 -z-10 h-full w-full"
      />

      <div className="relative flex flex-col items-center gap-11">
        <PageTitle
          className="max-w-[1100px]"
          title={
            <div>
              Start Winning with{" "}
              <span className="text-primary-brand">Expert Predictions</span>
            </div>
          }
          description={
            <p className="max-w-[850px]">
              Join thousands of successful bettors who use our AI-powered
              platform to make smarter betting decisions. Get access to
              professional predictions, real-time analytics, and a supportive
              community of experts.
            </p>
          }
        />

        <div className="flex w-full flex-col gap-6 lg:flex-row">
          {subscriptions.map((sub) => (
            <PricingCardSimple key={sub.id} sub={sub} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingBlock;

const PricingCardSimple = ({ sub }: { sub: ISubscriptionType }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const url = await paymentService.subscribe(sub.id);
      window.location.href = url;
    } catch (error) {
      console.error("Stripe checkout error:", error);
    } finally {
      setLoading(false);
    }
  };
  const period = sub.price < 30 ? "week" : "month";
  return (
    <div className="border-border flex w-full flex-col gap-[18px] rounded-3xl border bg-black/50 p-5 sm:p-7">
      <div className="tl-flex-between">
        <div className="sm:tl-heading2 text-2xl sm:text-3xl">{sub.name}</div>
        <div className="tl-heading2 text-primary-brand flex items-center gap-1">
          <div className="sm:tl-heading2 text-2xl sm:text-3xl">
            ${sub.price}
          </div>
          <span className="text-text-secondary text-xl leading-6 font-normal tracking-normal lowercase">
            / {period}
          </span>
        </div>
      </div>

      <Separator />

      <ul className="tl-paraghraph1 !text-text-primary flex flex-col gap-4 !text-start !text-[16px] sm:!text-lg">
        <li className="tl-flex-icon">
          <CheckIcon /> Projections for multiple sports
        </li>
        <li className="tl-flex-icon">
          <CheckIcon /> Access to a private Discord community with 24/7 support
        </li>
        <li className="tl-flex-icon">
          <CheckIcon /> Premium picks
        </li>
      </ul>
      <Button variant="gradient" onClick={handleCheckout} disabled={loading}>
        {loading ? (
          "Redirecting…"
        ) : (
          <>
            Get Started <ArrowRightIcon />
          </>
        )}
      </Button>
    </div>
  );
};
