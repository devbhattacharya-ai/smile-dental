"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const links = [
    { href: "#care", label: t.navCare },
    { href: "#treatments", label: t.navTreatments },
    { href: "#clinic", label: t.navClinic },
    { href: "#reviews", label: t.navReviews },
    { href: "#book", label: t.navBook },
  ] as const;

  return (
    <header className="site-header">
      <div className="nav-inner">
        <a href="#top" className="logo" onClick={close}>
          <span className="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
              <rect width="32" height="32" rx="8" fill="currentColor" />
              <path
                d="M10 14c1.5 4 4 6 6 6s4.5-2 6-6"
                stroke="#c5d86d"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12.5" cy="12" r="1.4" fill="#c5d86d" />
              <circle cx="19.5" cy="12" r="1.4" fill="#c5d86d" />
            </svg>
          </span>
          <span className="logo-text">
            <span className="logo-title">{t.logoTitle}</span>
            <span className="logo-sub">{t.logoSub}</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label={t.navAria}>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions nav-desktop">
          <div className="lang-toggle-wrap">
            <div
              className="lang-toggle"
              role="group"
              aria-label={lang === "en" ? t.langSwitchToMr : t.langSwitchToEn}
            >
              <button
                type="button"
                className={lang === "en" ? "lang-btn active" : "lang-btn"}
                aria-pressed={lang === "en"}
                onClick={() => setLang("en")}
              >
                {t.langEn}
              </button>
              <button
                type="button"
                className={lang === "mr" ? "lang-btn active" : "lang-btn"}
                aria-pressed={lang === "mr"}
                lang="mr"
                onClick={() => setLang("mr")}
              >
                {t.langMr}
              </button>
            </div>
            {lang === "en" ? (
              <p className="lang-hint" lang="mr">
                {t.langHint}
              </p>
            ) : null}
          </div>
          <a href="#book" className="btn-book-nav">
            {t.ctaBook}
            <span aria-hidden="true"> ↑</span>
          </a>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t.closeMenu : t.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div id="mobile-nav" className={`nav-mobile${open ? " open" : ""}`}>
        <nav aria-label={t.navMobileAria}>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="lang-toggle mobile-lang" role="group" aria-label={lang === "en" ? t.langSwitchToMr : t.langSwitchToEn}>
            <button
              type="button"
              className={lang === "en" ? "lang-btn active" : "lang-btn"}
              aria-pressed={lang === "en"}
              onClick={() => setLang("en")}
            >
              {t.langEn}
            </button>
            <button
              type="button"
              className={lang === "mr" ? "lang-btn active" : "lang-btn"}
              aria-pressed={lang === "mr"}
              lang="mr"
              onClick={() => setLang("mr")}
            >
              {t.langMr}
            </button>
          </div>
          <a href="#book" className="btn-book-nav" onClick={close}>
            {t.ctaBook}
            <span aria-hidden="true"> ↑</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
