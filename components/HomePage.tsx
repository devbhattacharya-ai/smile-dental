"use client";

import Image from "next/image";
import Header from "./Header";
import BookEnquiry from "./BookEnquiry";
import FAQ from "./FAQ";
import ScrollProgress from "./ScrollProgress";
import RevealOnScroll from "./RevealOnScroll";
import BackToTop from "./BackToTop";
import AssistantDialog from "./AssistantDialog";
import MobileActionBar from "./MobileActionBar";
import { LanguageProvider, useLang } from "./LanguageProvider";
import {
  FEATURED_TREATMENTS,
  ALL_TREATMENTS,
  REVIEWS,
} from "@/lib/i18n";

const TRUST = [
  "17 focused treatments",
  "Online booking",
  "WhatsApp confirmation",
  "Sector 10 · Kharghar",
  "4.8 patient rating",
  "Calm visit flow",
];

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
              <a href="tel:+919022117458">{t.utilityPhone}</a>
              <span className="utility-phone-note"> · {t.utilityPhoneNote}</span>
            </p>
          </div>
        </div>
        <div className="header-shell">
          <Header />
          <ScrollProgress />
        </div>
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
                <a className="btn-ghost" href="#care">
                  Explore care
                  <span aria-hidden="true"> ↓</span>
                </a>
              </div>
              <ul className="hero-proof" aria-label="Clinic highlights">
                <li>
                  <strong>4.8</strong>
                  <span>Verified patient rating · 42 reviews</span>
                </li>
                <li>
                  <strong>17</strong>
                  <span>Focused treatments</span>
                </li>
                <li>
                  <strong>WA</strong>
                  <span>WhatsApp confirmation</span>
                </li>
              </ul>
              <p className="concept-chip">{t.conceptChip}</p>
            </div>

            <div className="hero-visual">
              <div className="hero-orbit orbit-one" aria-hidden="true" />
              <div className="hero-orbit orbit-two" aria-hidden="true" />

              <div className="floating-card hero-location-card">
                <span className="icon-chip" aria-hidden="true">
                  📍
                </span>
                <span>
                  <strong>{t.locationTitle}</strong>
                  <span className="location-sub">{t.locationSub}</span>
                </span>
              </div>

              <div className="floating-card hero-doctor-card">
                <span className="icon-chip doctor" aria-hidden="true">
                  ✦
                </span>
                <span>
                  <strong>Your dentist</strong>
                  <span className="location-sub">
                    Dr. Rajeshwar Bhattacharya
                  </span>
                  <span className="doctor-blurb">
                    Personal, unhurried care with treatment choices explained in
                    plain language.
                  </span>
                </span>
              </div>

              <div className="hero-image-frame">
                <Image
                  src="/clinic-hero-wow.png"
                  alt="Bright modern dental clinic treatment room"
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

        <div className="trust-strip" aria-hidden="true">
          <div className="trust-track">
            {[0, 1].map((copy) => (
              <div className="trust-group" key={copy}>
                {TRUST.map((item) => (
                  <span key={`${copy}-${item}`}>{item}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="care" className="section care" aria-labelledby="care-heading">
          <div className="section-inner">
            <p className="section-label">{t.careLabel}</p>
            <h2 id="care-heading" className="reveal">
              {t.careHeading}
            </h2>
            <p className="section-intro reveal">{t.careIntro}</p>
            <div className="card-grid three">
              <article className="info-card reveal">
                <h3>{t.care1Title}</h3>
                <p>{t.care1Body}</p>
              </article>
              <article className="info-card reveal">
                <h3>{t.care2Title}</h3>
                <p>{t.care2Body}</p>
              </article>
              <article className="info-card reveal">
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
            <h2 id="treatments-heading" className="reveal">
              Treatment, without the guesswork
            </h2>
            <p className="section-intro reveal">
              Everything your smile may need, in one considered space.
            </p>
            <div className="featured-grid">
              {FEATURED_TREATMENTS.map((item) => (
                <article key={item.title} className="treatment-card reveal">
                  <div className="treatment-card-top">
                    <span className="treatment-icon" aria-hidden="true">
                      ◆
                    </span>
                    <span className="treatment-index">{item.index}</span>
                  </div>
                  <h3 lang="en">{item.title}</h3>
                  <p lang="en">{item.body}</p>
                  <a className="btn-text" href="#book">
                    Start booking →
                  </a>
                </article>
              ))}
            </div>

            <div className="all-treatments reveal">
              <div className="all-treatments-heading">
                <h3>All treatments</h3>
                <p>
                  A complete view of the care available at the clinic.{" "}
                  <strong>17 treatments available</strong> — choose any to start
                  booking.
                </p>
              </div>
              <ul className="treatment-list">
                {ALL_TREATMENTS.map((name) => (
                  <li key={name} className="treatment-list-item">
                    <a href="#book">{name}</a>
                  </li>
                ))}
              </ul>
              <p className="treatment-list-callout">
                <a className="btn-primary" href="#book">
                  {t.ctaBook}
                </a>
              </p>
            </div>
          </div>
        </section>

        <section id="clinic" className="section clinic" aria-labelledby="clinic-heading">
          <div className="section-inner">
            <p className="section-label">{t.clinicLabel}</p>
            <h2 id="clinic-heading" className="reveal">
              Inside the clinic
            </h2>
            <p className="section-intro reveal">
              Clean, calm and designed around your comfort.
            </p>
            <div className="clinic-gallery reveal">
              <figure className="gallery-main">
                <Image
                  src="/clinic-consultation-premium.png"
                  alt="Consultation room with natural light"
                  fill
                  sizes="(max-width: 900px) 100vw, 60vw"
                  className="gallery-img"
                />
                <figcaption className="gallery-brand">
                  Clear treatment guidance
                </figcaption>
              </figure>
              <figure className="gallery-side-top">
                <Image
                  src="/clinic-treatment-premium.png"
                  alt="Treatment chair and clinical equipment"
                  fill
                  sizes="40vw"
                  className="gallery-img"
                />
                <figcaption>Convenient WhatsApp follow-up</figcaption>
              </figure>
              <figure className="gallery-side-bottom">
                <Image
                  src="/clinic-ceiling-premium.png"
                  alt="Clinic ceiling and lighting detail"
                  fill
                  sizes="40vw"
                  className="gallery-img"
                />
                <figcaption>Easy local access in Sector 10</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section
          id="reviews"
          className="rating-section section"
          aria-labelledby="reviews-heading"
        >
          <div className="rating-copy reveal">
            <p className="section-label">{t.reviewsLabel}</p>
            <h2 id="reviews-heading">Trusted locally</h2>
            <p>A 4.8-rated dental clinic in your neighbourhood.</p>
            <a className="btn-primary rating-button" href="#book">
              {t.ctaBook}
            </a>
            <p className="concept-note">{t.reviewsConceptNote}</p>
          </div>
          <div className="rating-card reveal">
            <p className="rating-watermark" aria-hidden="true">
              4.8
            </p>
            <p className="rating-number">4.8</p>
            <div className="rating-stars" aria-hidden="true">
              ★★★★★
            </div>
            <p className="rating-divider">Patient rating</p>
            <p>Verified reviews · concept layout</p>
          </div>
        </section>

        <section className="section reviews-quotes" aria-label="Concept reviews">
          <div className="section-inner card-grid three">
            {REVIEWS.map((r) => (
              <blockquote key={r.name} className="review-card reveal" lang="en">
                <p>“{r.quote}”</p>
                <footer>— {r.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="book" className="section book booking-section" aria-labelledby="book-heading">
          <div className="section-inner book-layout">
            <div className="booking-intro reveal">
              <p className="section-label">{t.bookLabel}</p>
              <h2 id="book-heading">Book in under a minute</h2>
              <p className="section-intro">
                Tell us what you need. We’ll take it from there — continue on
                WhatsApp with your details already prepared. The clinic will
                confirm availability directly.
              </p>
            </div>
            <div className="reveal">
              <BookEnquiry />
            </div>
          </div>
        </section>

        <FAQ />

        <section className="section visit" aria-labelledby="visit-heading">
          <div className="section-inner visit-grid">
            <div className="visit-card reveal">
              <p className="section-label">Visit us</p>
              <h2 id="visit-heading">Dental care, close to home.</h2>
              <p>
                <strong>Clinic address</strong>
                <br />
                Sector 10 · Kopra, Kharghar, Navi Mumbai
              </p>
              <div className="visit-actions">
                <a
                  className="btn-primary"
                  href="https://maps.google.com/?q=Sector+10+Kopra+Kharghar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps
                </a>
                <a className="btn-ghost" href="tel:+919022117458">
                  Call clinic
                </a>
              </div>
            </div>
            <div className="visit-map-art reveal" aria-hidden="true">
              <Image
                src="/clinic-logo.webp"
                alt=""
                width={120}
                height={120}
                className="visit-logo"
              />
              <p>Sector 10 · Kharghar</p>
              <p>Thoughtful dental care in Kharghar.</p>
            </div>
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
            <p className="footer-contact">
              Contact · <a href="tel:+919022117458">90221 17458</a> · Sector 10,
              Kharghar
            </p>
          </div>
          <nav className="footer-links" aria-label="Quick links">
            <a href="#care">Care</a>
            <a href="#treatments">Treatments</a>
            <a href="#clinic">Clinic</a>
            <a href="#book">Book</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </footer>

      <AssistantDialog />
      <BackToTop />
      <MobileActionBar />
      <RevealOnScroll />
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
