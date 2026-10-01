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
import ClinicParallax from "./ClinicParallax";
import { LanguageProvider, useLang } from "./LanguageProvider";
import {
  FEATURED_TREATMENTS,
  ALL_TREATMENTS,
  REVIEWS,
} from "@/lib/i18n";

const TRUST = [
  "WHATSAPP CONFIRMATION",
  "ONLINE BOOKING",
  "17 FOCUSED TREATMENTS",
  "SECTOR 10 · KHARGHAR",
  "4.8 PATIENT RATING",
  "CALM VISIT FLOW",
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
                <a className="btn-primary btn-yellow" href="#book">
                  {t.ctaBook}
                  <span aria-hidden="true"> ↑</span>
                </a>
                <button
                  type="button"
                  className="btn-ghost btn-ask"
                  onClick={() =>
                    document.querySelector<HTMLButtonElement>(".assistant-fab")?.click()
                  }
                >
                  {t.ctaAsk}
                </button>
              </div>
              <ul className="hero-proof" aria-label="Clinic highlights">
                <li>
                  <strong>4.8</strong>
                  <span>{t.proofRating}</span>
                </li>
                <li>
                  <strong>17</strong>
                  <span>{t.proofTreatments}</span>
                </li>
                <li>
                  <strong>WA</strong>
                  <span>{t.proofWa}</span>
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
                  <strong>{t.doctorTitle}</strong>
                  <span className="location-sub">
                    {t.doctorName}
                  </span>
                  <span className="doctor-blurb">
                    {t.doctorBlurb}
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

        <section id="care" className="section care band-beige" aria-labelledby="care-heading">
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
          className="section treatments band-green"
          aria-labelledby="treatments-heading"
        >
          <div className="section-inner">
            <p className="section-label">{t.treatmentsLabel}</p>
            <h2 id="treatments-heading" className="reveal">
              {t.treatmentsHeadingAlt}
            </h2>
            <p className="section-intro reveal">
              {t.treatmentsIntroAlt}
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
                    {t.startBooking} →
                  </a>
                </article>
              ))}
            </div>

            <div className="all-treatments reveal">
              <div className="all-treatments-heading">
                <h3>{t.allTreatmentsTitle}</h3>
                <p>
                  {t.allTreatmentsIntro}{" "}
                  <strong>{t.allTreatmentsCount}</strong>
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
                <a className="btn-primary btn-yellow" href="#book">
                  {t.ctaBook}
                </a>
              </p>
            </div>
          </div>
        </section>

        <section id="clinic" className="section clinic band-beige" aria-labelledby="clinic-heading">
          <div className="section-inner">
            <p className="section-label">{t.clinicLabel}</p>
            <h2 id="clinic-heading" className="reveal">
              {t.clinicInside}
            </h2>
            <p className="section-intro reveal">
              {t.clinicInsideIntro}
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
                  {t.galleryCap1}
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
                <figcaption>{t.galleryCap2}</figcaption>
              </figure>
              <figure className="gallery-side-bottom">
                <Image
                  src="/clinic-ceiling-premium.png"
                  alt="Clinic ceiling and lighting detail"
                  fill
                  sizes="40vw"
                  className="gallery-img"
                />
                <figcaption>{t.galleryCap3}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section
          id="reviews"
          className="rating-section section band-green"
          aria-labelledby="reviews-heading"
        >
          <div className="rating-copy reveal">
            <p className="section-label">{t.reviewsLabel}</p>
            <h2 id="reviews-heading">{t.ratingHeading}</h2>
            <p>{t.ratingIntro}</p>
            <a className="btn-primary btn-yellow rating-button" href="#book">
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
            <p className="rating-divider">{t.ratingPatient}</p>
            <p>{t.ratingVerified}</p>
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

        <section id="book" className="section book booking-section band-beige" aria-labelledby="book-heading">
          <div className="section-inner book-layout">
            <div className="booking-intro reveal">
              <p className="section-label">{t.bookLabel}</p>
              <h2 id="book-heading">{t.bookHeadingAlt}</h2>
              <p className="section-intro">
                {t.bookIntroAlt}
              </p>
            </div>
            <div className="reveal">
              <BookEnquiry />
            </div>
          </div>
        </section>

        <FAQ />

        <section className="section visit band-green" aria-labelledby="visit-heading">
          <div className="section-inner visit-grid">
            <div className="visit-card reveal">
              <p className="section-label">{t.visitLabel}</p>
              <h2 id="visit-heading">{t.visitHeading}</h2>
              <p>
                <strong>{t.visitAddressLabel}</strong>
                <br />
                {t.visitAddress}
              </p>
              <div className="visit-actions">
                <a
                  className="btn-primary btn-yellow"
                  href="https://maps.google.com/?q=Smile+Dental+Clinic+Sector+10+Kopra+Kharghar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.visitMaps}
                </a>
                <a className="btn-ghost" href="tel:+919022117458">
                  {t.visitCall}
                </a>
              </div>
            </div>
            <div className="visit-map reveal">
              <div className="map-frame">
                <iframe
                  title="Smile Dental Clinic map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=73.055%2C19.033%2C73.085%2C19.055&amp;layer=mapnik&amp;marker=19.044%2C73.070"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="map-pin" role="img" aria-label="Smile Dental Clinic">
                  <span className="map-pin-badge">
                    <img src="/clinic-logo.webp" alt="" width={36} height={36} />
                  </span>
                  <span className="map-pin-label">Smile Dental</span>
                </div>
              </div>
              <p className="visit-tag">{t.visitTag}</p>
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
      <ClinicParallax />
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
