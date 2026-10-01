"use client";

import { FormEvent, useId, useMemo, useState } from "react";
import { useLang } from "./LanguageProvider";
import { ALL_TREATMENTS } from "@/lib/i18n";

const CLINIC_WA = "919022117458";

type FieldErrors = {
  name?: string;
  phone?: string;
  treatment?: string;
};

export default function BookEnquiry() {
  const { t } = useLang();
  const [errors, setErrors] = useState<FieldErrors>({});
  const nameErrorId = useId();
  const phoneErrorId = useId();
  const treatmentErrorId = useId();
  const [treatment, setTreatment] = useState("");

  const times = useMemo(
    () => [
      { value: "morning", label: t.bookTimeMorning },
      { value: "afternoon", label: t.bookTimeAfternoon },
      { value: "evening", label: t.bookTimeEvening },
    ],
    [t]
  );

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const treatmentVal = String(data.get("treatment") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const time = String(data.get("time") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();

    const next: FieldErrors = {};
    if (!name) next.name = t.bookNameError;
    if (!phone) next.phone = "Enter a phone number.";
    if (!treatmentVal) next.treatment = "Select a treatment.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = !name
        ? "guest-name"
        : !phone
          ? "guest-phone"
          : "guest-treatment";
      requestAnimationFrame(() => document.getElementById(first)?.focus());
      return;
    }

    const lines = [
      "Hello Smile Dental Clinic — booking enquiry (concept demo site)",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Treatment: ${treatmentVal}`,
      date ? `Preferred date: ${date}` : null,
      time ? `Preferred time: ${time}` : null,
      note ? `Note: ${note}` : null,
      "",
      "Sent from the portfolio concept demo — please confirm availability.",
    ].filter(Boolean);

    const url = `https://wa.me/${CLINIC_WA}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="book-panel booking-form">
      <div className="booking-steps" aria-label="Booking steps">
        <ol>
          <li>Choose a treatment</li>
          <li>Share your preferred time</li>
          <li>Receive confirmation on WhatsApp</li>
        </ol>
      </div>

      {treatment ? (
        <div className="selected-treatment" aria-live="polite">
          <span aria-hidden="true">✓</span>
          <span>
            Selected: <strong>{treatment}</strong>
          </span>
          <button type="button" className="btn-text" onClick={() => setTreatment("")}>
            Change
          </button>
        </div>
      ) : null}

      <form className="book-form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="guest-name">Full name</label>
          <input
            id="guest-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder={t.bookNamePh}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? nameErrorId : undefined}
            onChange={() =>
              setErrors((prev) =>
                prev.name ? { ...prev, name: undefined } : prev
              )
            }
          />
          {errors.name ? (
            <p className="field-error" id={nameErrorId} role="alert">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="guest-phone">Phone number</label>
          <input
            id="guest-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            placeholder="e.g. 98xxx xxxxx"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? phoneErrorId : undefined}
            onChange={() =>
              setErrors((prev) =>
                prev.phone ? { ...prev, phone: undefined } : prev
              )
            }
          />
          {errors.phone ? (
            <p className="field-error" id={phoneErrorId} role="alert">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="guest-treatment">Treatment or concern</label>
          <select
            id="guest-treatment"
            name="treatment"
            required
            value={treatment}
            onChange={(e) => {
              setTreatment(e.target.value);
              setErrors((prev) =>
                prev.treatment ? { ...prev, treatment: undefined } : prev
              );
            }}
            aria-invalid={errors.treatment ? true : undefined}
            aria-describedby={errors.treatment ? treatmentErrorId : undefined}
          >
            <option value="">Select a treatment</option>
            {ALL_TREATMENTS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.treatment ? (
            <p className="field-error" id={treatmentErrorId} role="alert">
              {errors.treatment}
            </p>
          ) : null}
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="guest-date">Preferred date</label>
            <input id="guest-date" name="date" type="date" />
          </div>
          <div className="field">
            <label htmlFor="guest-time">Preferred time</label>
            <select id="guest-time" name="time" defaultValue="morning">
              {times.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="field">
          <label htmlFor="guest-note">Anything the clinic should know?</label>
          <textarea
            id="guest-note"
            name="note"
            placeholder={t.bookNotePh}
            rows={3}
          />
        </div>

        <p className="form-hint">
          Your details are sent only through WhatsApp when you choose to
          continue. Clinic number: 90221 17458. Demo path — not a live booking
          system.
        </p>
        <button type="submit" className="btn-primary">
          Continue on WhatsApp
          <span aria-hidden="true"> →</span>
        </button>
      </form>
    </div>
  );
}
