import React from 'react';

import CTABlock from '@/components/CTABlock';
import PageTitle from '@/components/PageTitle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import AvatarPlaceholderImage from '@/assets/avatar.png';

const TESTIMONIAL_DATA = [
  {
    id: 1,
    name: 'Ivan Ababio',
    email: 'ivanoexample_leadman_220',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
  },
  {
    id: 2,
    name: 'Samantha Ruiz',
    email: 'samruiz_bestbetter_90',
    message:
      'This platform changed my betting strategy completely. I’ve never been this confident before!',
  },
  {
    id: 3,
    name: 'David Thompson',
    email: 'david_t_mastermind',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. ',
  },
  {
    id: 4,
    name: 'Elena Petrova',
    email: 'elenap_superwin',
    message:
      'I was skeptical at first, but after using this platform, I can say it’s worth every penny!',
  },
  {
    id: 5,
    name: 'Michael Carter',
    email: 'mike_c_bigbets',
    message:
      'Accurate predictions and great community. I’ve learned so much from the experts here!',
  },
  {
    id: 6,
    name: 'Sophia Lee',
    email: 'sophia_lee_999',
    message:
      'Finally, a platform that actually helps me make informed decisions. Love it!',
  },
  {
    id: 7,
    name: 'James Anderson',
    email: 'james_bettor_77',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. ',
  },
  {
    id: 8,
    name: 'Laura Nguyen',
    email: 'laura_ng_predictions',
    message:
      'User-friendly interface and top-notch insights. This is a game changer!',
  },
  {
    id: 10,
    name: 'Emma Watson',
    email: 'emma_w_hotpicks',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. ',
  },
];

const Testimonials = () => {
  const reversedTestimonials = TESTIMONIAL_DATA.slice().reverse();

  return (
    <div className="tl-container my-[90px] flex flex-col items-center gap-[90px]">
      <PageTitle
        title="user reviews"
        description="Discover what our community of successful bettors has to say about
          their experience. Our platform has helped thousands of users transform
          their approach to sports betting, delivering consistent results
          through AI-powered predictions and expert analysis."
      />

      <div className="flex items-start gap-[18px]">
        <div className="flex flex-col gap-[18px]">
          {TESTIMONIAL_DATA.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              email={testimonial.email}
              message={testimonial.message}
            />
          ))}
        </div>

        <div className="flex flex-col gap-[18px]">
          {reversedTestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              email={testimonial.email}
              message={testimonial.message}
            />
          ))}
        </div>

        <div className="flex flex-col gap-[18px]">
          {TESTIMONIAL_DATA.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              email={testimonial.email}
              message={testimonial.message}
            />
          ))}
        </div>
      </div>

      <CTABlock />
    </div>
  );
};

export default Testimonials;

interface ITestimonialCard {
  name: string;
  email: string;
  message: string;
}

const TestimonialCard = ({ name, email, message }: ITestimonialCard) => {
  return (
    <div className="flex h-min flex-col gap-6 rounded-3xl border p-6">
      <div className="flex items-center gap-5">
        <Avatar className="h-[60px] w-[60px]">
          <AvatarImage src={AvatarPlaceholderImage.src} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <p className="text-2xl font-bold tracking-normal">{name}</p>
          <p className="text-text-secondary text-xl leading-6 font-medium tracking-normal">
            {email}
          </p>
        </div>
      </div>

      <div className="tl-paraghraph2">{message}</div>
    </div>
  );
};
