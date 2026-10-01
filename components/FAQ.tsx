"use client";

import { useState } from "react";
import { useLang } from "./LanguageProvider";

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  const items = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
  ];

  return (
    <section className="faq-section section band-beige" id="faq" aria-labelledby="faq-title">
      <div className="section-inner faq-grid">
        <div className="faq-intro">
          <p className="section-label">{t.faqLabel}</p>
          <h2 id="faq-title">{t.faqHeading}</h2>
          <p>{t.faqIntro}</p>
          <p className="faq-contact-note">{t.faqContact}</p>
        </div>
        <div className="faq-list">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`faq-card${isOpen ? " is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                </h3>
                <div className="faq-panel" aria-hidden={!isOpen}>
                  <p className="faq-answer">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
