// src/context/UiContext.js
import React, { createContext, useContext, useMemo, useState } from "react";

const UiContext = createContext(null);

export function UiProvider({ children }) {
  const [theme, setTheme] = useState("light");   // 'light' | 'dark'
  const [fontScale, setFontScale] = useState(1); // 1, 1.15, 1.3 ...

  const value = useMemo(() => ({
    theme,
    setTheme,
    fontScale,
    setFontScale,
  }), [theme, fontScale]);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used within UiProvider");
  return ctx;
}
