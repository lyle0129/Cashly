import { useCallback, useEffect, useState } from "react";

/**
 * useDarkMode
 * - Initializes from localStorage "theme" if present.
 * - Falls back to system preference (prefers-color-scheme).
 * - Keeps document.documentElement.classList in sync ("dark" class).
 * - Listens to system preference changes (unless user already chose a theme).
 *
 * Returns: { isDark, toggle, setDark }
 */
export default function useDarkMode(defaultToDark = null) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true; // safe for SSR
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    if (defaultToDark !== null) return Boolean(defaultToDark);
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply/remove class and persist selection
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Listen to system preference changes, but DO NOT override an explicit user choice (localStorage)
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia === "undefined") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      const saved = localStorage.getItem("theme");
      if (saved) return; // user already set preference, don't override
      setIsDark(e.matches);
    };

    // modern browsers use addEventListener
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
    } else {
      mq.addListener(handler);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handler);
      } else {
        mq.removeListener(handler);
      }
    };
  }, []);

  const toggle = useCallback(() => setIsDark((v) => !v), []);
  const setDark = useCallback((v) => setIsDark(Boolean(v)), []);

  return { isDark, toggle, setDark };
}
