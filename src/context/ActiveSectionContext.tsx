"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

const SCROLL_OBSERVER_THRESHOLD = 0.75;
const SCROLL_DEBOUNCE_MS = 1000;

type ActiveSectionContextType = {
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
  timeOfLastClick: number;
  setTimeOfLastClick: React.Dispatch<React.SetStateAction<number>>;
};

export const ActiveSectionContext =
  createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({
  children,
}: ActiveSectionContextProviderProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [timeOfLastClick, setTimeOfLastClick] = useState(0); // we need to keep track of this to disable the observer temporarily when user clicks on a link

  return (
    <ActiveSectionContext.Provider
      value={{
        activeSection,
        setActiveSection,
        timeOfLastClick,
        setTimeOfLastClick,
      }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionContext() {
  const context = useContext(ActiveSectionContext);

  if (context === null) {
    throw new Error(
      "useActiveSectionContext must be used within an ActiveSectionContextProvider",
    );
  }

  return context;
}

export function useSectionInView(
  sectionName: string,
  threshold = SCROLL_OBSERVER_THRESHOLD,
) {
  const { ref, inView } = useInView({
    threshold,
  });
  const { setActiveSection, timeOfLastClick } = useActiveSectionContext();

  useEffect(() => {
    if (inView && Date.now() - timeOfLastClick > SCROLL_DEBOUNCE_MS) {
      setActiveSection(sectionName);
    }
  }, [inView, setActiveSection, timeOfLastClick, sectionName]);

  return {
    ref,
  };
}
