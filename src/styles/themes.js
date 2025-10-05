import { useUi } from "../context/UiContext";

export default function useThemeColors() {
  const { theme } = useUi();
  const isDark = theme === "dark";

  const colors = isDark
    ? {
        bg: "#121212",
        card: "#1e1e1e",
        text: "#ffffff",
        subtext: "#aaaaaa",
        border: "#333333",
        primary: "#E91E63",
      }
    : {
        bg: "#ffffff",
        card: "#f7f7f7",
        text: "#222222",
        subtext: "#666666",
        border: "#dddddd",
        primary: "#E91E63",
      };

  return { colors, isDark };
}