
import React, { createContext, useContext, useMemo, useState } from "react";

const UiContext = createContext(null);

export function UiProvider({ children }) {
  const [theme, setTheme] = useState("light");   // Estado del tema: "light" | "dark"
  const [fontScale, setFontScale] = useState(1); // Escala de fuente: 1 = 100%

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
