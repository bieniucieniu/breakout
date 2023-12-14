import { createContext, useContext } from "react";

export type Context = {};

const context = createContext<Context | undefined>(undefined);

export function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <context.Provider value={{}}>{children}</context.Provider>;
}

export function useGameContext() {
  const c = useContext(context);
  if (!c) {
    throw new Error("no in game context");
  }
}
