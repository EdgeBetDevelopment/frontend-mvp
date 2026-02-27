import Image, { StaticImageData } from "next/image";

interface IFeatureCard {
  title: string;
  description: string;
  image: StaticImageData;
  num: number;
}
export const FeatureCard = ({
  title,
  description,
  image,
  num,
}: IFeatureCard) => {
  return (
    <div className="border-border flex flex-col gap-4 rounded-3xl border bg-transparent p-4 pb-8">
      <div className="">
        <Image className="w-full" src={image} alt={title} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="align-middle text-2xl font-bold tracking-normal">
          {num}. {title}
        </div>

        <p className="tl-paraghraph2 !text-text-primary">{description}</p>
      </div>
    </div>
  );
};
