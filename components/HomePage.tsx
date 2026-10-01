"use client";

import Image from "next/image";
import Header from "./Header";
import BookEnquiry from "./BookEnquiry";
import { LanguageProvider, useLang } from "./LanguageProvider";
import { TREATMENTS, REVIEWS } from "@/lib/i18n";

function HomeInner() {
  const { t, lang } = useLang();

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>

      <div id="top">
        <div className="utility-bar">
          <div className="utility-inner">
            <p className="utility-text">{t.utilityLeft}</p>
            <p className="utility-phone">
              <span aria-hidden="true">☎ </span>
              <span>{t.utilityPhone}</span>
              <span className="utility-phone-note"> · {t.utilityPhoneNote}</span>
            </p>
          </div>
        </div>
        <Header />
      </div>

      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-eyebrow">{t.heroEyebrow}</p>
              <h1 id="hero-heading">
                <span className="hero-line1">{t.heroLine1}</span>
                <span className="hero-line2" lang={lang}>
                  {t.heroLine2}
                </span>
              </h1>
              <p className="hero-support">{t.heroSupport}</p>
              <div className="hero-actions">
                <a className="btn-primary" href="#book">
                  {t.ctaBook}
                  <span aria-hidden="true"> ↑</span>
                </a>
                <a className="btn-ghost" href="#treatments">
                  {t.navTreatments}
                  <span aria-hidden="true"> ↓</span>
                </a>
              </div>
              <p className="concept-chip">{t.conceptChip}</p>
            </div>

            <div className="hero-media">
              <div className="location-chip">
                <span className="pin" aria-hidden="true">
                  📍
                </span>
                <span>
                  <strong>{t.locationTitle}</strong>
                  <span className="location-sub">{t.locationSub}</span>
                </span>
              </div>
              <div className="arch-frame">
                <Image
                  src="/demo-smile-dental.jpg"
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 48vw"
                  quality={85}
                  className="arch-image"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="care" className="section care" aria-labelledby="care-heading">
          <div className="section-inner">
            <p className="section-label">{t.careLabel}</p>
            <h2 id="care-heading">{t.careHeading}</h2>
            <p className="section-intro">{t.careIntro}</p>
            <div className="card-grid three">
              <article className="info-card">
                <h3>{t.care1Title}</h3>
                <p>{t.care1Body}</p>
              </article>
              <article className="info-card">
                <h3>{t.care2Title}</h3>
                <p>{t.care2Body}</p>
              </article>
              <article className="info-card">
                <h3>{t.care3Title}</h3>
                <p>{t.care3Body}</p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="treatments"
          className="section treatments"
          aria-labelledby="treatments-heading"
        >
          <div className="section-inner">
            <p className="section-label">{t.treatmentsLabel}</p>
            <h2 id="treatments-heading">{t.treatmentsHeading}</h2>
            <p className="section-intro">{t.treatmentsIntro}</p>
            <div className="card-grid treatments-grid">
              {TREATMENTS.map((item) => (
                <article key={item.title} className="treatment-card">
                  <h3 lang="en">{item.title}</h3>
                  <p lang="en">{item.body}</p>
                </article>
              ))}
            </div>
            <p className="section-cta-row">
              <a className="btn-primary" href="#book">
                {t.ctaBook}
                <span aria-hidden="true"> ↑</span>
              </a>
            </p>
          </div>
        </section>

        <section id="clinic" className="section clinic" aria-labelledby="clinic-heading">
          <div className="section-inner">
            <p className="section-label">{t.clinicLabel}</p>
            <h2 id="clinic-heading">{t.clinicHeading}</h2>
            <p className="section-intro">{t.clinicIntro}</p>
            <div className="card-grid three">
              <article className="info-card">
                <h3>{t.clinic1Title}</h3>
                <p>{t.clinic1Body}</p>
              </article>
              <article className="info-card">
                <h3>{t.clinic2Title}</h3>
                <p>{t.clinic2Body}</p>
              </article>
              <article className="info-card">
                <h3>{t.clinic3Title}</h3>
                <p>{t.clinic3Body}</p>
              </article>
            </div>
          </div>
        </section>

        <section id="reviews" className="section reviews" aria-labelledby="reviews-heading">
          <div className="section-inner">
            <p className="section-label">{t.reviewsLabel}</p>
            <h2 id="reviews-heading">{t.reviewsHeading}</h2>
            <p className="section-intro">{t.reviewsIntro}</p>
            <p className="concept-note">{t.reviewsConceptNote}</p>
            <div className="card-grid three">
              {REVIEWS.map((r) => (
                <blockquote key={r.name} className="review-card" lang="en">
                  <p>“{r.quote}”</p>
                  <footer>— {r.name}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className="section book" aria-labelledby="book-heading">
          <div className="section-inner book-layout">
            <div>
              <p className="section-label">{t.bookLabel}</p>
              <h2 id="book-heading">{t.bookHeading}</h2>
              <p className="section-intro">{t.bookIntro}</p>
            </div>
            <BookEnquiry />
          </div>
        </section>

        <section className="section disclaimer" aria-labelledby="disclaimer-heading">
          <div className="section-inner">
            <h2 id="disclaimer-heading" className="disclaimer-heading">
              {t.disclaimerHeading}
            </h2>
            <p className="disclaimer-body">{t.disclaimerBody}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <p className="footer-brand">{t.footerBrand}</p>
            <p className="footer-tag">{t.footerTag}</p>
            <p className="concept-chip footer-chip">{t.conceptChip}</p>
          </div>
          <a className="footer-top" href="#top">
            {t.footerTop}
            <span aria-hidden="true"> ↑</span>
          </a>
        </div>
      </footer>

      <a href="#book" className="assistant-fab" aria-label={t.fabAria}>
        <span className="fab-icon" aria-hidden="true">
          ⌂
        </span>
        <span className="fab-text">{t.fabLabel}</span>
      </a>
    </>
  );
}

export default function HomePage() {
  return (
    <LanguageProvider>
      <HomeInner />
    </LanguageProvider>
  );
}
