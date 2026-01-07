import { createContext, useContext, useEffect, useMemo, useState } from "react";

const UiContext = createContext(null);

export function UiProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("lang") || "AL";
    } catch {
      return "AL";
    }
  });
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleLang = () => setLang((p) => (p === "AL" ? "EN" : "AL"));
  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));
  const tr = (al, en) => (lang === "EN" ? en : al);

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, theme, toggleTheme, tr }),
    [lang, theme]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used within UiProvider");
  return ctx;
}
