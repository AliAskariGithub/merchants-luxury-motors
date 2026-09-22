"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Car } from "@/lib/cars";
import { defaultBuild, serialiseBuild, type Build } from "@/lib/build";

type BuildContextValue = {
  car: Car;
  build: Build;
  update: (patch: Partial<Build>) => void;
  togglePack: (id: string) => void;
};

const BuildContext = createContext<BuildContextValue | null>(null);

export function useBuild(): BuildContextValue {
  const value = useContext(BuildContext);
  if (!value) throw new Error("useBuild must be used inside BuildProvider");
  return value;
}

export default function BuildProvider({
  car,
  children,
}: {
  car: Car;
  children: ReactNode;
}) {
  const [build, setBuild] = useState<Build>(() => defaultBuild(car));
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const query = serialiseBuild(build);
    window.history.replaceState(null, "", `${window.location.pathname}?${query}`);
  }, [build]);

  const update = useCallback((patch: Partial<Build>) => {
    setBuild((current) => ({ ...current, ...patch }));
  }, []);

  const togglePack = useCallback((id: string) => {
    setBuild((current) => ({
      ...current,
      packs: current.packs.includes(id)
        ? current.packs.filter((pack) => pack !== id)
        : [...current.packs, id],
    }));
  }, []);

  return (
    <BuildContext.Provider value={{ car, build, update, togglePack }}>
      {children}
    </BuildContext.Provider>
  );
}
