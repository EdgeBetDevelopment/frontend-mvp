import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Review, useReviews } from '@/hooks/useReviews';
import ReviewCard from '@/components/home/ReviewCard';

export const Reviews = () => {
  const { data, isLoading } = useReviews();
  return (
    <section className="container mx-auto border-t border-border px-6 py-16">
      <div className="mb-12 text-center">
        <h3 className="mb-4 font-display text-3xl font-bold md:text-4xl">
          User Reviews
        </h3>
        <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
          Discover what our community of successful bettors has to say about
          their experience. Our platform has helped thousands of users transform
          their approach to sports betting, delivering consistent results
          through AI-powered predictions and expert analysis.
        </p>
      </div>

      {isLoading ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">Loading reviews...</p>
        </div>
      ) : data ? (
        <Carousel className="mx-auto max-w-5xl">
          <CarouselContent>
            {data.map((review: Review) => (
              <CarouselItem
                key={review.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <ReviewCard
                  name={review.name}
                  rating={review.rating}
                  review={review.text}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No reviews available</p>
        </div>
      )}
    </section>
  );
};
