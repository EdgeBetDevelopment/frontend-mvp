"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/carousel";
import { useReviews } from "../hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/avatar";
import PageTitle from "@/shared/components/PageTitle";

import AvatarPlaceholderImage from "@/assets/avatar.png";

interface ITestimonialCard {
  name: string;
  rating: number;
  message: string;
}

export const UserReviews = () => {
  const { data, isLoading } = useReviews();

  const autoplayPlugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }),
  );

  return (
    <div className="tl-container my-[90px] flex w-full flex-col items-center gap-[90px]">
      <PageTitle
        title="User Reviews"
        description="Discover what our community of successful bettors has to say about
            their experience. Our platform has helped thousands of users transform
            their approach to sports betting, delivering consistent results
            through AI-powered predictions and expert analysis."
      />

      <div className="relative w-full px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-[1352px]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-background to-transparent sm:left-5 sm:w-10 md:w-12"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-background to-transparent sm:right-5 sm:w-10 md:w-12"></div>

          <Carousel
            className="w-full"
            plugins={[autoplayPlugin.current]}
            opts={{
              align: "center",
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent className="py-4">
              {data?.map((review) => (
                <CarouselItem
                  key={review.id}
                  className="w-[calc(100%-16px)] max-w-full flex-none pl-4 sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)]"
                >
                  <TestimonialCard
                    name={review?.name}
                    rating={review?.rating}
                    message={review?.text}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-4 flex justify-center gap-2">
              <CarouselPrevious className="relative inline-flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
              <CarouselNext className="relative inline-flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

const StarRating = ({ value = 0 }: { value?: number }) => {
  const rating = Math.max(0, Math.min(5, Math.round(value)));

  return (
    <div
      className="flex items-center justify-center gap-1"
      aria-label={`Rating: ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < rating;
        return (
          <Star
            key={i}
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
            fill={filled ? "currentColor" : "none"}
            strokeWidth={filled ? 1 : 2}
            aria-hidden="true"
          />
        );
      })}
      <span className="sr-only">{rating}</span>
    </div>
  );
};

const TestimonialCard = ({ name, rating, message }: ITestimonialCard) => {
  return (
    <div className="flex h-full flex-col gap-6 overflow-hidden rounded-3xl border p-4 sm:p-5 md:p-6">
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:gap-5">
        <Avatar className="h-[50px] w-[50px] sm:h-[55px] sm:w-[55px] md:h-[60px] md:w-[60px]">
          <AvatarImage src={AvatarPlaceholderImage.src} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <p className="w-full truncate text-center text-lg font-bold tracking-normal sm:text-xl md:text-2xl">
            {name}
          </p>
          <StarRating value={rating} />
        </div>
      </div>

      <div className="tl-paraghraph2 text-center text-sm sm:text-base">
        {message}
      </div>
    </div>
  );
};
