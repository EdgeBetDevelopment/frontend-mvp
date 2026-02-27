import React from "react";

import { cn } from "@/shared/utils/helper";

interface ICardContainer {
  children: React.ReactNode;
  className?: string;
}

const CardContainer = ({ children, className }: ICardContainer) => {
  return (
    <div
      className={cn(
        "bg-surface-secondary border-border rounded-3xl border p-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardContainer;
