"use client";

import React, { createContext, useContext } from "react";
import { rootStore, RootStore } from "./root-store";

const StoreContext = createContext<RootStore>(rootStore);

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
};
