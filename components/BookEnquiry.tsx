"use client";

import { FormEvent, useState } from "react";
import { useLang } from "./LanguageProvider";

export default function BookEnquiry() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="book-panel" role="status" aria-live="polite">
        <div className="success-box">
          <h3>{t.bookSuccessTitle}</h3>
          <p>{t.bookSuccessBody}</p>
          <button type="button" className="btn-secondary" onClick={() => setSent(false)}>
            {t.bookSuccessReset}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="book-panel">
      <form className="book-form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label htmlFor="guest-name">{t.bookName}</label>
          <input
            id="guest-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder={t.bookNamePh}
          />
        </div>
        <div className="field">
          <label htmlFor="guest-time">{t.bookTime}</label>
          <select id="guest-time" name="time" defaultValue="morning">
            <option value="morning">{t.bookTimeMorning}</option>
            <option value="afternoon">{t.bookTimeAfternoon}</option>
            <option value="evening">{t.bookTimeEvening}</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="guest-concern">{t.bookConcern}</label>
          <select id="guest-concern" name="concern" defaultValue="checkup">
            <option value="checkup">{t.bookConcernCheckup}</option>
            <option value="cleaning">{t.bookConcernCleaning}</option>
            <option value="treatment">{t.bookConcernTreatment}</option>
            <option value="other">{t.bookConcernOther}</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="guest-note">{t.bookNote}</label>
          <textarea id="guest-note" name="note" placeholder={t.bookNotePh} rows={3} />
        </div>
        <p className="form-hint">{t.bookHint}</p>
        <button type="submit" className="btn-primary">
          {t.bookSubmit}
          <span aria-hidden="true"> →</span>
        </button>
      </form>
    </div>
  );
}
