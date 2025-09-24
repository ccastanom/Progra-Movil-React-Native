
import React, { createContext, useContext, useMemo, useState } from "react";

// Creo el contenedor del estado global de la UI (tema y escala tipográfica).
// El valor inicial es `null` para poder detectar usos fuera del provider.
const UiContext = createContext(null);

// Componente que envuelve la app y expone el estado de UI a todos los hijos.
export function UiProvider({ children }) {
  const [theme, setTheme] = useState("light");   // Estado del tema: "light" | "dark"
  const [fontScale, setFontScale] = useState(1); // Escala de fuente: 1 = 100%

  const value = useMemo(() => ({
    theme,
    setTheme,
    fontScale,
    setFontScale,
  }), [theme, fontScale]);

  // Se expone el contexto a toda la app: cualquier componente puede usar useUi()
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

// Helper para consumir el contexto con una API limpia: const {theme} = useUi()
export function useUi() {
  const ctx = useContext(UiContext);
  // Guard: si alguien llama useUi sin estar dentro de <UiProvider>, avisamos.
  if (!ctx) throw new Error("useUi must be used within UiProvider");
  return ctx;
}
