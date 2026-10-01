"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";

const CLINIC_WA = "919022117458";

type Step = "pain" | "soon" | "details" | "prepare";

const PAIN_KEYS = [
  "assistPain1",
  "assistPain2",
  "assistPain3",
  "assistPain4",
] as const;

const SOON_KEYS = ["assistSoon1", "assistSoon2", "assistSoon3"] as const;

export default function AssistantDialog() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("pain");
  const [pain, setPain] = useState("");
  const [soon, setSoon] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  function reset() {
    setStep("pain");
    setPain("");
    setSoon("");
    setName("");
    setPhone("");
  }

  function close() {
    setOpen(false);
    reset();
  }

  function back() {
    // Back closes per checklist
    close();
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button, input")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step]);

  function prepareWhatsApp(e?: FormEvent) {
    e?.preventDefault();
    const lines = [
      "Hello Smile Dental Clinic — booking via website assistant (concept demo)",
      `Concern: ${pain}`,
      `Urgency: ${soon}`,
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      "",
      "Please confirm availability. Sent from the portfolio concept demo.",
    ];
    const url = `https://wa.me/${CLINIC_WA}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  }

  return (
    <>
      <button
        type="button"
        className="assistant-fab"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t.fabAria}
        onClick={() => {
          reset();
          setOpen(true);
        }}
      >
        <span className="fab-icon" aria-hidden="true">
          ●
        </span>
        <span className="fab-text">
          <span className="assistant-status">{t.assistOnline}</span>
          <span className="assistant-fab-copy">{t.assistFabShort}</span>
        </span>
      </button>

      {open ? (
        <div
          className="assistant-backdrop"
          role="presentation"
          onClick={close}
        >
          <div
            ref={panelRef}
            className="assistant-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="assistant-dialog-head">
              <div>
                <p className="assistant-kicker">{t.assistOnline}</p>
                <h2 id={titleId}>{t.assistTitle}</h2>
              </div>
              <div className="assistant-head-actions">
                <button type="button" className="btn-text" onClick={back}>
                  {t.assistBack}
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  aria-label={t.assistClose}
                  onClick={close}
                >
                  {t.assistClose}
                </button>
              </div>
            </div>

            <div className="assistant-steps" aria-hidden="true">
              {(["pain", "soon", "details", "prepare"] as Step[]).map((s, i) => (
                <span
                  key={s}
                  className={
                    step === s
                      ? "as-dot active"
                      : (["pain", "soon", "details", "prepare"].indexOf(step) >
                        i
                          ? "as-dot done"
                          : "as-dot")
                  }
                />
              ))}
            </div>

            {step === "pain" ? (
              <div className="assistant-body">
                <h3>{t.assistStepPain}</h3>
                <p className="assistant-note">{t.assistPainHint}</p>
                <div className="assist-choice-grid">
                  {PAIN_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      className="assist-choice"
                      onClick={() => {
                        setPain(t[key]);
                        setStep("soon");
                      }}
                    >
                      {t[key]}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {step === "soon" ? (
              <div className="assistant-body">
                <h3>{t.assistStepSoon}</h3>
                <div className="assist-choice-grid">
                  {SOON_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      className="assist-choice"
                      onClick={() => {
                        setSoon(t[key]);
                        setStep("details");
                      }}
                    >
                      {t[key]}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {step === "details" ? (
              <form
                className="assistant-body"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!name.trim() || !phone.trim()) return;
                  setStep("prepare");
                }}
              >
                <h3>{t.assistStepDetails}</h3>
                <div className="field">
                  <label htmlFor="assist-name">{t.assistName}</label>
                  <input
                    id="assist-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="assist-phone">{t.assistPhone}</label>
                  <input
                    id="assist-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoComplete="tel"
                  />
                </div>
                <button type="submit" className="btn-primary btn-yellow">
                  {t.assistContinue}
                </button>
              </form>
            ) : null}

            {step === "prepare" ? (
              <div className="assistant-body">
                <h3>{t.assistPrepare}</h3>
                <ul className="assist-summary">
                  <li>{pain}</li>
                  <li>{soon}</li>
                  <li>
                    {name} · {phone}
                  </li>
                </ul>
                <p className="assistant-note">{t.assistPrepareHint}</p>
                <button
                  type="button"
                  className="btn-primary btn-yellow"
                  onClick={() => prepareWhatsApp()}
                >
                  {t.assistPrepare}
                  <span aria-hidden="true"> →</span>
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
