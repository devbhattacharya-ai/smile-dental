"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { strings, type Lang } from "@/lib/i18n";

type Dict = (typeof strings)[Lang];

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const LanguageContext = createContext<Ctx | null>(null);

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const q = new URLSearchParams(window.location.search).get("lang");
  if (q === "mr" || q === "en") return q;
  try {
    const saved = window.localStorage.getItem("smile-dental-lang");
    if (saved === "mr" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = readInitialLang();
    setLangState(initial);
    document.documentElement.lang = initial;
    setReady(true);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    try {
      window.localStorage.setItem("smile-dental-lang", l);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    if (l === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", "mr");
    window.history.replaceState({}, "", url.toString());
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: strings[lang],
    }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>
      <div data-lang={lang} data-i18n-ready={ready ? "true" : "false"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
