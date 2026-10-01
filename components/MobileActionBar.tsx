"use client";

import { useLang } from "./LanguageProvider";

const CLINIC_TEL = "9022117458";

export default function MobileActionBar() {
  const { t } = useLang();
  return (
    <div className="mobile-action-bar" role="navigation" aria-label="Quick actions">
      <a href={`tel:+91${CLINIC_TEL}`} className="mab-call">
        {t.mabCall}
      </a>
      <a href="#book" className="mab-book">
        {t.ctaBook}
      </a>
    </div>
  );
}
