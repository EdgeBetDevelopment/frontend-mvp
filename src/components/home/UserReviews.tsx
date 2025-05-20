import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar';
import PageTitle from '../PageTitle';

import AvatarPlaceholderImage from '@/assets/avatar.png';

const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: 'John Smith',
    email: 'johnsmith_betpro_123',
    message:
      'This platform has completely transformed my betting experience. The insights are incredibly valuable and the predictions have been consistently accurate for my wagers.',
  },
  {
    id: 2,
    name: 'Samantha Ruiz',
    email: 'samruiz_bestbetter_90',
    message:
      "This platform changed my betting strategy completely. I've never been this confident before! The analytics provided here are unmatched and the community is very supportive.",
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    email: 'marcus_j_winstreak',
    message:
      'The analytics provided here are unmatched. I was skeptical at first, but after seeing consistent results, I can confidently say this is the best betting resource available. The interface is intuitive and makes tracking my bets effortless.',
  },
  {
    id: 4,
    name: 'Elena Petrova',
    email: 'elenap_superwin',
    message:
      "I was skeptical at first, but after using this platform, I can say it's worth every penny! The statistical models have given me an edge I never had before and the customer support is excellent.",
  },
  {
    id: 5,
    name: 'Michael Carter',
    email: 'mike_c_bigbets',
    message:
      "Accurate predictions and great community. I've learned so much from the experts here! The platform is constantly improving and adding new features that enhance my betting experience significantly.",
  },
  {
    id: 6,
    name: 'Sophia Lee',
    email: 'sophia_lee_999',
    message:
      'Finally, a platform that actually helps me make informed decisions. The AI predictions are remarkably accurate, and the analysis tools help me understand the reasoning behind each recommendation. Love it!',
  },
  {
    id: 7,
    name: 'Robert Wilson',
    email: 'rob_wilson_bets',
    message:
      'The statistical models used here have given me an edge I never had before. The platform is constantly improving and adding new features. The customer support team is responsive and helpful whenever I have questions.',
  },
  {
    id: 8,
    name: 'Laura Nguyen',
    email: 'laura_ng_predictions',
    message:
      'User-friendly interface and top-notch insights. This is a game changer! Since joining this platform, my success rate has improved dramatically. The community discussions add another layer of value.',
  },
  {
    id: 10,
    name: 'Daniel Garcia',
    email: 'dgarcia_winning',
    message:
      'Since joining this platform, my success rate has improved dramatically. The AI predictions are remarkably accurate, and the analysis tools help me understand the reasoning behind each recommendation. Highly recommended for serious bettors.',
  },
];

interface ITestimonialCard {
  name: string;
  email: string;
  message: string;
}

export const UserReviews = () => {
  return (
    <div className="tl-container my-[90px] flex w-full flex-col items-center gap-[90px]">
      <PageTitle
        title="user reviews"
        description="Discover what our community of successful bettors has to say about
            their experience. Our platform has helped thousands of users transform
            their approach to sports betting, delivering consistent results
            through AI-powered predictions and expert analysis."
      />

      <div className="relative w-full px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-[1352px]">
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r to-transparent sm:left-5 sm:w-10 md:w-12"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l to-transparent sm:right-5 sm:w-10 md:w-12"></div>

          <Carousel
            className="w-full"
            opts={{
              align: 'center',
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent className="py-4">
              {TESTIMONIAL_DATA.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="w-[calc(100%-16px)] max-w-full flex-none pl-4 sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)]"
                >
                  <TestimonialCard
                    name={testimonial.name}
                    email={testimonial.email}
                    message={testimonial.message}
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

const TestimonialCard = ({ name, email, message }: ITestimonialCard) => {
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
          <p className="text-text-secondary w-full truncate text-center text-sm leading-tight font-normal tracking-normal sm:text-base sm:font-medium md:text-xl">
            {email}
          </p>
        </div>
      </div>

      <div className="tl-paraghraph2 text-center text-sm sm:text-base">
        {message}
      </div>
    </div>
  );
};
