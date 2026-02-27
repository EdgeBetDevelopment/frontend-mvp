import React from "react";
import Image, { StaticImageData } from "next/image";

import { cn } from "@/shared/utils/helper";

interface EmptyPlaceholderProps {
  image?: StaticImageData;
  title: string;
  subtitle: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({
  image,
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-3 px-6 py-20",
        className,
      )}
    >
      {image && <Image src={image} alt={title} />}
      <h3 className="text-text-dark text-xl text-[32px] font-semibold">
        {title}
      </h3>
      <div className="text-gray-third max-w-[546px] text-center text-[16px] font-normal">
        {subtitle}
      </div>
      {children}
    </div>
  );
};

export default EmptyPlaceholder;
