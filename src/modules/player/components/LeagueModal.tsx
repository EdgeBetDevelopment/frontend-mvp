import React from "react";

import { cn } from "@/shared/utils/helper";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const LeagueModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className={cn(
          "relative max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-[#1E1E1E] p-6 shadow-lg",
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer text-white hover:text-gray-300"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
