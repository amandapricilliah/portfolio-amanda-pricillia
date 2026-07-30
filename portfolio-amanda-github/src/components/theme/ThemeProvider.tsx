import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { ReactNode } from "react";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const STORAGE_KEY = "amanda-portfolio-theme";

const ThemeContext = createContext<
  ThemeContextValue | undefined
>(undefined);

function getInitialTheme(): Theme {
  /*
   * Saat halaman pertama kali dibuka,
   * tema default-nya selalu dark.
   *
   * Kalau pengguna sebelumnya pernah memilih light,
   * pilihan light tersebut akan digunakan kembali.
   */
  if (typeof window === "undefined") {
    return "dark";
  }

  const savedTheme =
    window.localStorage.getItem(STORAGE_KEY);

  return savedTheme === "light" ? "light" : "dark";
}

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] =
    useState<Theme>(getInitialTheme);

  const transitionTimerRef =
    useRef<number | null>(null);

  /*
   * Setiap tema berubah:
   * 1. Tema dipasang pada elemen HTML.
   * 2. Pilihan disimpan ke localStorage.
   */
  useEffect(() => {
    const root = document.documentElement;

    root.dataset.theme = theme;
    root.style.colorScheme = theme;

    window.localStorage.setItem(
      STORAGE_KEY,
      theme,
    );
  }, [theme]);

  /*
   * Membersihkan timer saat komponen ditutup.
   */
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(
          transitionTimerRef.current,
        );
      }
    };
  }, []);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      const root = document.documentElement;

      /*
       * Class ini nanti dipakai CSS
       * agar perubahan warna terasa halus.
       */
      root.classList.add("theme-transitioning");

      setThemeState(newTheme);

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(
          transitionTimerRef.current,
        );
      }

      transitionTimerRef.current =
        window.setTimeout(() => {
          root.classList.remove(
            "theme-transitioning",
          );
        }, 450);
    },
    [],
  );

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => {
      const newTheme =
        currentTheme === "dark"
          ? "light"
          : "dark";

      const root = document.documentElement;

      root.classList.add(
        "theme-transitioning",
      );

      if (transitionTimerRef.current !== null) {
        window.clearTimeout(
          transitionTimerRef.current,
        );
      }

      transitionTimerRef.current =
        window.setTimeout(() => {
          root.classList.remove(
            "theme-transitioning",
          );
        }, 450);

      return newTheme;
    });
  }, []);

  const contextValue =
    useMemo<ThemeContextValue>(
      () => ({
        theme,
        isDark: theme === "dark",
        setTheme,
        toggleTheme,
      }),
      [theme, setTheme, toggleTheme],
    );

  return (
    <ThemeContext.Provider
      value={contextValue}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme harus digunakan di dalam ThemeProvider.",
    );
  }

  return context;
}