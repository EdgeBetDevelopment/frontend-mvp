import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Review, useReviews} from "@/hooks/useReviews";
import ReviewCard from "@/components/home/ReviewCard";

export const Reviews = () => {
    const { data, isLoading } = useReviews();
    return (
        <section className="container mx-auto px-6 py-16 border-t border-border">
            <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
                    user reviews
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Discover what our community of successful bettors has to say about their experience. Our platform has helped thousands of users transform their approach to sports betting, delivering consistent results through AI-powered predictions and expert analysis.
                </p>
            </div>

            {isLoading ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading reviews...</p>
                </div>
            ) : data ? (
                <Carousel className="max-w-5xl mx-auto">
                    <CarouselContent>
                        {data.map((review: Review) => (
                            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
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
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No reviews available</p>
                </div>
            )}
        </section>
    )
}