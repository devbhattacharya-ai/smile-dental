"use client";

import { useState } from "react";
import { FAQS } from "@/lib/i18n";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq-section section" id="faq" aria-labelledby="faq-title">
      <div className="section-inner faq-grid">
        <div className="faq-intro">
          <p className="section-label">Before your visit</p>
          <h2 id="faq-title">A few useful answers, upfront.</h2>
          <p>
            Straight answers about booking, WhatsApp confirmation, and where to
            find the clinic.
          </p>
          <p className="faq-contact-note">
            Prefer to talk? Call <strong>90221 17458</strong> or continue on
            WhatsApp from the booking form.
          </p>
        </div>
        <div className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="faq-card">
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
                {isOpen ? <p className="faq-answer">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
