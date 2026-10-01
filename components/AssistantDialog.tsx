"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";

export default function AssistantDialog() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="assistant-fab"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t.fabAria}
        onClick={() => setOpen(true)}
      >
        <span className="fab-icon" aria-hidden="true">
          ●
        </span>
        <span className="fab-text">
          <span className="assistant-status">Online now</span>
          <span className="assistant-fab-copy">{t.fabLabel}</span>
        </span>
      </button>

      {open ? (
        <div
          className="assistant-backdrop"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            className="assistant-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="assistant-dialog-head">
              <h2 id={titleId}>Website assistant</h2>
              <button
                ref={closeRef}
                type="button"
                className="btn-ghost"
                aria-label="Close assistant"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
            <p>
              I can help you start a visit enquiry. Choose a treatment, pick a
              preferred time, then continue on WhatsApp to the clinic number —
              they confirm availability.
            </p>
            <p className="assistant-note">
              Supports booking only. Does not provide medical diagnosis.
            </p>
            <a
              className="btn-primary"
              href="#book"
              onClick={() => setOpen(false)}
            >
              {t.ctaBook}
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
