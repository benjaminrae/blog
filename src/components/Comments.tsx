import { GISCUS } from "@config";
import Giscus, { type Theme } from "@giscus/react";
import { useState } from "react";

interface Props {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: Props) {
  const currentTheme = localStorage.getItem("theme");
  const browserTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const [theme, setTheme] = useState(currentTheme || browserTheme);

  document.querySelector("#theme-btn")?.addEventListener("click", () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", ({ matches: isDark }) => {
      isDark ? setTheme("dark") : setTheme("light");
    });

  return (
    <div className="mt-8">
      <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS} />
    </div>
  );
}
