import { useEffect, useId, useRef, useState, type CSSProperties, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock3,
  Gem,
  Heart,
  MapPin,
  Menu,
  Phone,
  Shield,
  Smile,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import {
  type Concern,
  type Lang,
  type Timing,
  type TreatId,
  concerns,
  copy,
  featured,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  timings,
  treatLabel,
  treatments,
  waLink,
} from "@/lib/clinic-copy";

const NAV = [
  { id: "care", key: "care" },
  { id: "treatments", key: "treatments" },
  { id: "clinic", key: "clinic" },
  { id: "reviews", key: "reviews" },
  { id: "book", key: "book" },
] as const;

const concernIcon = {
  pain: Heart,
  routine: Sparkles,
  cosmetic: Gem,
  child: Smile,
  other: Circle,
} as const;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDate(value: string) {
  if (!value) return "";
  const [y, m, d] = value.split("-");
  if (!y || !m || !d) return value;
  return `${d}-${m}-${y}`;
}

function toISODate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseISODate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

function monthCells(year: number, month: number) {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= count; day += 1) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function DateField({
  id,
  label,
  value,
  lang,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  lang: Lang;
  onChange: (value: string) => void;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const selected = value ? parseISODate(value) : null;
  const [view, setView] = useState(() => selected ?? new Date());
  const today = startOfDay(new Date());
  const locale = lang === "mr" ? "mr-IN" : "en-GB";
  const weekdays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(2024, 0, 1 + index);
    return day.toLocaleDateString(locale, { weekday: "short" });
  });

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span className="date-field" ref={rootRef}>
      <button
        id={id}
        type="button"
        className="select-btn date-btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setView(selected ?? new Date());
          setOpen((current) => !current);
        }}
      >
        <span className={value ? undefined : "is-placeholder"}>{value ? formatDate(value) : "dd-mm-yyyy"}</span>
        <CalendarDays size={16} aria-hidden="true" />
      </button>
      {open ? (
        <div className="date-pop" role="dialog" aria-label={label}>
          <div className="date-pop-head">
            <button
              type="button"
              className="date-nav"
              aria-label={lang === "mr" ? "मागील महिना" : "Previous month"}
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
            >
              <ChevronLeft size={16} />
            </button>
            <strong>{view.toLocaleDateString(locale, { month: "long", year: "numeric" })}</strong>
            <button
              type="button"
              className="date-nav"
              aria-label={lang === "mr" ? "पुढील महिना" : "Next month"}
              onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="date-grid" aria-hidden="true">
            {weekdays.map((day, index) => (
              <span key={`${day}-${index}`} className="date-dow">
                {day}
              </span>
            ))}
          </div>
          <div className="date-grid">
            {monthCells(view.getFullYear(), view.getMonth()).map((day, index) => {
              if (!day) return <span key={`empty-${index}`} />;
              const past = startOfDay(day) < today;
              const iso = toISODate(day);
              const isSelected = value === iso;
              const isToday = startOfDay(day) === today;
              return (
                <button
                  key={iso}
                  type="button"
                  className={`date-day${isSelected ? " is-selected" : ""}${isToday ? " is-today" : ""}`}
                  disabled={past}
                  aria-label={day.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" })}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </span>
  );
}

const CLOCK_HOURS = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const CLOCK_MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

function parseClock(value: string) {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return { hour: 10, minute: 0, period: "AM" as const };
  const minute = Number(match[2]);
  return {
    hour: Number(match[1]),
    minute: CLOCK_MINUTES.reduce((best, step) => (Math.abs(step - minute) < Math.abs(best - minute) ? step : best), 0),
    period: match[3].toUpperCase() as "AM" | "PM",
  };
}

function formatClock(hour: number, minute: number, period: "AM" | "PM") {
  return `${pad(hour)}:${pad(minute)} ${period}`;
}

function TimeField({
  id,
  label,
  value,
  lang,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  lang: Lang;
  onChange: (value: string) => void;
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const parsed = parseClock(value);
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [phase, setPhase] = useState<"hour" | "minute">("hour");
  const [hour, setHour] = useState(parsed.hour);
  const [minute, setMinute] = useState(parsed.minute);
  const [period, setPeriod] = useState<"AM" | "PM">(parsed.period);
  const index = phase === "hour" ? hour % 12 : minute / 5;
  const marks = phase === "hour" ? CLOCK_HOURS : CLOCK_MINUTES;

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span className="date-field" ref={rootRef}>
      <button
        id={id}
        type="button"
        className="select-btn date-btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          const next = parseClock(value);
          setHour(next.hour);
          setMinute(next.minute);
          setPeriod(next.period);
          setPhase("hour");
          const rect = rootRef.current?.getBoundingClientRect();
          setDropUp(Boolean(rect && rect.bottom + 340 > window.innerHeight && rect.top > 360));
          setOpen((current) => !current);
        }}
      >
        <span className={value ? undefined : "is-placeholder"}>{value || "--:--"}</span>
        <Clock3 size={16} aria-hidden="true" />
      </button>
      {open ? (
        <div className={`date-pop time-pop${dropUp ? " drop-up" : ""}`} role="dialog" aria-label={label}>
          <div className="time-readout">
            <div className="time-digits">
              <button type="button" className={phase === "hour" ? "is-on" : undefined} onClick={() => setPhase("hour")}>
                {pad(hour)}
              </button>
              <span>:</span>
              <button type="button" className={phase === "minute" ? "is-on" : undefined} onClick={() => setPhase("minute")}>
                {pad(minute)}
              </button>
            </div>
            <div className="period-toggle">
              {(["AM", "PM"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={period === item ? "is-on" : undefined}
                  onClick={() => {
                    setPeriod(item);
                    if (value) onChange(formatClock(hour, minute, item));
                  }}
                  aria-pressed={period === item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="clock-face">
            <span className="clock-hand" style={{ "--angle": `${index * 30}deg` } as CSSProperties} />
            <span className="clock-hub" />
            {marks.map((mark, markIndex) => {
              const angle = (markIndex / 12) * Math.PI * 2 - Math.PI / 2;
              const selected = phase === "hour" ? hour % 12 === markIndex : minute === mark;
              return (
                <button
                  key={mark}
                  type="button"
                  className={`clock-num${selected ? " is-on" : ""}`}
                  style={{ left: `calc(50% + ${Math.cos(angle) * 78}px)`, top: `calc(50% + ${Math.sin(angle) * 78}px)` }}
                  onClick={() => {
                    if (phase === "hour") {
                      setHour(mark);
                      setPhase("minute");
                      return;
                    }
                    setMinute(mark);
                    onChange(formatClock(hour, mark, period));
                    setOpen(false);
                  }}
                >
                  {phase === "hour" ? mark : pad(mark)}
                </button>
              );
            })}
          </div>
          <p className="clock-hint">{phase === "hour" ? (lang === "mr" ? "तास निवडा" : "Choose an hour") : lang === "mr" ? "मिनिटे निवडा" : "Choose minutes"}</p>
        </div>
      ) : null}
    </span>
  );
}

function openWhatsApp(text: string) {
  const url = waLink(text);
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) window.location.href = url;
}

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="wa-mark">
      <path
        fill="currentColor"
        d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.4a10.1 10.1 0 0 0 4.65 1.12h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2Zm5.76 13.95c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.24-4.76-4.14-4.9-4.33-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09 1-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.15.07.14.12.32.02.51-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.13-.28.28-.12.54.16.26.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.09 1.62.76 1.9.9.28.14.46.21.53.32.07.12.07.68-.17 1.36Z"
      />
    </svg>
  );
}

function SmileMark() {
  return (
    <span className="smile-mark" aria-hidden="true">
      <svg viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="27" />
        <path d="M40 25.2c-2.7 0-4.7-2.5-7.4-2.7-3.4-.3-6.3 2.6-7.5 7.1C23.4 35.4 23.2 42 25.2 48.2 26.7 52.6 28.6 55.8 31.6 59.6 33.4 56.4 35.5 53.6 37.6 51.6 38.7 50.6 39.4 50.1 40 51.2 40.6 50.1 41.3 50.6 42.4 51.6 44.5 53.6 46.6 56.4 48.4 59.6 51.4 55.8 53.3 52.6 54.8 48.2 56.8 42 56.6 35.4 54.9 29.6 53.7 25.1 50.8 22.2 47.4 22.5 44.7 25.2 42.7 25.2 40 25.2z" />
        <path d="M31.2 34.2c2.7 4.4 5.6 6.4 8.8 6.4s6.1-2 8.8-6.4" />
        <path d="M34.4 43.2c1.7 2.2 3.6 3.3 5.6 3.3s3.9-1.1 5.6-3.3" />
      </svg>
    </span>
  );
}

function FeatureIcon({ name }: { name: (typeof featured)[number]["icon"] }) {
  const props = { size: 18, strokeWidth: 1.75, "aria-hidden": true as const };
  if (name === "shield") return <Shield {...props} />;
  if (name === "heart") return <Heart {...props} />;
  if (name === "spark") return <Sparkles {...props} />;
  if (name === "gem") return <Gem {...props} />;
  return <Smile {...props} />;
}

export function ClinicPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [active, setActive] = useState("care");
  const [menu, setMenu] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [faqOpen, setFaqOpen] = useState(-1);
  const [treatOpen, setTreatOpen] = useState(false);
  const [treatment, setTreatment] = useState<TreatId | "">("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [formError, setFormError] = useState("");
  const [assistant, setAssistant] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [concern, setConcern] = useState<Concern | "">("");
  const [timing, setTiming] = useState<Timing | "">("");
  const [assistName, setAssistName] = useState("");
  const [assistPhone, setAssistPhone] = useState("");
  const [assistError, setAssistError] = useState("");
  const treatRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const formId = useId();
  const t = copy[lang];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("lang") === "mr") setLang("mr");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "mr" ? "mr" : "en";
  }, [lang]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const settle = (node: Element) => {
      node.addEventListener("animationend", () => node.classList.add("settled"), { once: true });
    };
    document.querySelectorAll(".hero-copy > *, .arch, .location-card, .doctor-card").forEach(settle);
    if (reduce) return;

    const nodes = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          settle(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const seen = rect.top < window.innerHeight * 0.92 && rect.bottom > 40;
      if (seen) node.classList.add("is-in", "settled");
      else {
        node.classList.add("will-reveal");
        observer.observe(node);
      }
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nodes = NAV.map((item) => document.getElementById(item.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setActive(hit.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!treatOpen) return;
    const close = (event: MouseEvent) => {
      if (!treatRef.current?.contains(event.target as Node)) setTreatOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setTreatOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [treatOpen]);

  useEffect(() => {
    if (!assistant) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAssistant(false);
    };
    document.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [assistant]);

  function go(id: string) {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function chooseTreatment(id: TreatId) {
    setTreatment(id);
    setTreatOpen(false);
    setFormError("");
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submitForm(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) {
      setFormError(t.nameError);
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setFormError(t.phoneError);
      return;
    }
    setFormError("");
    const lines = [
      lang === "mr"
        ? "नमस्कार Smile Dental Clinic, मला भेटीची विनंती करायची आहे."
        : "Hello Smile Dental Clinic, I would like to request a visit.",
      "",
      `${t.fullName}: ${name.trim()}`,
      `${t.phone}: +91 ${phone}`,
      treatment ? `${t.treatmentLabel}: ${treatLabel(treatment, lang)}` : "",
      date ? `${t.dateLabel}: ${formatDate(date)}` : "",
      time ? `${t.timeLabel}: ${time}` : "",
      note.trim() ? `${t.noteLabel} ${note.trim()}` : "",
    ].filter(Boolean);
    openWhatsApp(lines.join("\n"));
  }

  function openAssistant() {
    setAssistError("");
    setStep(concern ? (timing ? 3 : 2) : 1);
    setAssistant(true);
  }

  function submitAssistant(event: FormEvent) {
    event.preventDefault();
    if (assistName.trim().length < 2) {
      setAssistError(t.nameError);
      return;
    }
    if (!/^\d{10}$/.test(assistPhone)) {
      setAssistError(t.phoneError);
      return;
    }
    setAssistError("");
    const lines = [
      lang === "mr"
        ? "नमस्कार Smile Dental Clinic, मी वेबसाइट असिस्टंटमधून भेट मागत आहे."
        : "Hello Smile Dental Clinic, I used the website assistant to request a visit.",
      "",
      concern ? `${t.assistQ1} ${t.concernLabels[concern]}` : "",
      timing ? `${t.assistQ2} ${t.timingLabels[timing]}` : "",
      `${t.yourName}: ${assistName.trim()}`,
      `${t.yourPhone}: +91 ${assistPhone}`,
    ].filter(Boolean);
    openWhatsApp(lines.join("\n"));
    setAssistant(false);
  }

  const selectedLabel = treatment ? treatLabel(treatment, lang) : t.treatmentPh;

  return (
    <div className="clinic" data-lang={lang}>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header" id="top">
        <div className="header-inner">
          <a className="brand" href="#top" onClick={(event) => { event.preventDefault(); go("top"); }}>
            <SmileMark />
            <span>
              <span className="brand-title">Smile Dental Clinic</span>
              <span className="brand-sub">Implant Center</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "is-active" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id);
                }}
              >
                {t.nav[item.key]}
              </a>
            ))}
          </nav>
          <div className="header-tools">
            <div className="lang-switch" role="group" aria-label="Language">
              <button
                type="button"
                className={lang === "en" ? "is-on" : undefined}
                aria-pressed={lang === "en"}
                onClick={() => setLang("en")}
              >
                <Sparkles size={14} aria-hidden="true" />
                EN
              </button>
              <button
                type="button"
                className={`lang-knob ${lang === "mr" ? "is-mr" : ""}`}
                aria-hidden="true"
                tabIndex={-1}
                onClick={() => setLang(lang === "en" ? "mr" : "en")}
              />
              <button
                type="button"
                className={lang === "mr" ? "is-on" : undefined}
                lang="mr"
                aria-pressed={lang === "mr"}
                onClick={() => setLang("mr")}
              >
                मराठी
              </button>
            </div>
            <a
              className="btn-book"
              href="#book"
              onClick={(event) => {
                event.preventDefault();
                go("book");
              }}
            >
              {t.bookCta}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={menu}
              aria-controls="mobile-nav"
              onClick={() => setMenu((value) => !value)}
            >
              {menu ? <X size={20} /> : <Menu size={20} />}
              <span className="sr-only">{menu ? t.closeMenu : t.openMenu}</span>
            </button>
          </div>
        </div>
        <div id="mobile-nav" className={menu ? "mobile-nav is-open" : "mobile-nav"} aria-hidden={menu ? undefined : true}>
          <div className="mobile-nav-list">
            {NAV.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{ "--i": index } as CSSProperties}
                tabIndex={menu ? undefined : -1}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id);
                }}
              >
                {t.nav[item.key]}
              </a>
            ))}
          </div>
        </div>
      </header>
      <p className="lang-hint">
        <strong>You can change the language</strong>
        <span lang="mr">भाषा येथे बदलू शकता</span>
      </p>

      <main id="main">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow">{t.heroEyebrow}</p>
            <h1 id="hero-heading">
              <span>{t.heroLine1}</span>
              <span className="hero-italic">{t.heroLine2}</span>
            </h1>
            <p className="hero-support">{t.heroSupport}</p>
            <div className="hero-actions">
              <a
                className="btn-gold"
                href="#book"
                onClick={(event) => {
                  event.preventDefault();
                  go("book");
                }}
              >
                {t.checkAvailability}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <button type="button" className="btn-ghost" onClick={openAssistant}>
                <Sparkles size={16} aria-hidden="true" />
                {t.askAssistant}
              </button>
            </div>
            <div className="proof">
              <span className="avatars" aria-hidden="true">
                <span>स</span>
                <span>R</span>
                <span>अ</span>
              </span>
              <span className="stars" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star key={index} size={14} fill="currentColor" />
                ))}
              </span>
              <strong>4.8</strong>
              <span>{t.ratingLabel}</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="arch">
              <img
                src="/clinic-hero-wow.webp"
                alt="Treatment room at Smile Dental Clinic in Kharghar"
              />
            </div>
            <div className="float-card location-card">
              <span className="pin-chip">
                <MapPin size={16} aria-hidden="true" />
              </span>
              <span>
                <strong>{t.locationTitle}</strong>
                <span>{t.locationSub}</span>
              </span>
            </div>
            <div className="float-card doctor-card">
              <p>{t.yourDentist}</p>
              <strong>{t.doctorName}</strong>
              <span>{t.doctorBlurb}</span>
              <a
                href="#care"
                onClick={(event) => {
                  event.preventDefault();
                  go("care");
                }}
              >
                {t.exploreCare}
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map((copyIndex) => (
              <div className="marquee-group" key={copyIndex}>
                {Array.from({ length: 4 }, () => t.marquee)
                  .flat()
                  .map((item, index) => (
                    <span key={`${copyIndex}-${index}`}>
                      <Sparkles size={14} />
                      {item}
                    </span>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <section id="care" className="band-cream care-band">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow dark">{t.careKicker}</p>
              <h2>{t.careTitle}</h2>
            </div>
            <p className="section-aside">{t.careIntro}</p>
          </div>
          <div className="feature-grid">
            {featured.map((card, index) => {
              const text = t.featured[card.treat];
              return (
                <article
                  key={card.treat}
                  className={`feature-card tone-${card.tone}`}
                  data-reveal
                  style={{ "--reveal": `${index * 90}ms` } as CSSProperties}
                >
                  <div className="feature-top">
                    <span className="feature-icon">
                      <FeatureIcon name={card.icon} />
                    </span>
                    <span className="feature-index">{pad(index + 1)}</span>
                  </div>
                  <h3>{text.title}</h3>
                  <p>{text.body}</p>
                  <button type="button" onClick={() => chooseTreatment(card.treat)}>
                    {t.bookVisit}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section id="treatments" className="band-cream treatments-band">
          <div className="treat-panel" data-reveal>
            <div className="treat-head">
              <div>
                <p className="eyebrow">{t.allKicker}</p>
                <p>{t.allIntro}</p>
              </div>
              <div className="treat-badge">
                <span>
                  <Sparkles size={16} aria-hidden="true" />
                </span>
                <strong>{t.allBadge}</strong>
                <small>{t.allBadgeSub}</small>
              </div>
            </div>
            <ul className="treat-list">
              {treatments.map((item, index) => (
                <li key={item.id}>
                  <button type="button" onClick={() => chooseTreatment(item.id)}>
                    <span>{pad(index + 1)}</span>
                    <span>{item[lang]}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="clinic" className="clinic-band">
          <div className="clinic-copy" data-reveal>
            <p className="eyebrow">{t.clinicKicker}</p>
            <h2>{t.clinicTitle}</h2>
            <p>{t.clinicBody}</p>
            <ul>
              {t.clinicPoints.map((point) => (
                <li key={point}>
                  <span className="check-dot" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="clinic-mosaic" data-reveal style={{ "--reveal": "120ms" } as CSSProperties}>
            <img
              className="mosaic-main"
              src="/clinic-treatment-premium.webp"
              alt="Treatment cabinetry and dental chair at the clinic"
            />
            <img
              src="/clinic-consultation-premium.webp"
              alt="Consultation desk at Smile Dental Clinic"
            />
            <img
              src="/clinic-ceiling-premium.webp"
              alt="Tooth-shaped ceiling light in the clinic"
            />
          </div>
        </section>

        <section id="reviews" className="reviews-band">
          <div className="reviews-copy" data-reveal>
            <p className="eyebrow dark">{t.reviewsKicker}</p>
            <h2>{t.reviewsTitle}</h2>
            <p>{t.reviewsBody}</p>
            <a
              className="btn-line"
              href="#book"
              onClick={(event) => {
                event.preventDefault();
                go("book");
              }}
            >
              {t.bookVisit}
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="score-card" data-reveal style={{ "--reveal": "140ms" } as CSSProperties}>
            <p className="score">4.8</p>
            <span className="stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={16} fill="currentColor" />
              ))}
            </span>
            <span className="score-label">{t.patientRating}</span>
            <p className="score-count">42</p>
            <span className="score-label">{t.verifiedReviews}</span>
          </div>
        </section>

        <section id="book" className="book-band">
          <div className="book-copy" data-reveal>
            <p className="eyebrow">{t.bookKicker}</p>
            <h2>{t.bookTitle}</h2>
            <p>{t.bookBody}</p>
            <ol>
              {t.steps.map((stepLabel, index) => (
                <li key={stepLabel}>
                  <span>{pad(index + 1)}</span>
                  {stepLabel}
                </li>
              ))}
            </ol>
          </div>
          <form className="book-card" data-reveal style={{ "--reveal": "120ms" } as CSSProperties} onSubmit={submitForm} noValidate>
            <div className="field-row">
              <label htmlFor={`${formId}-name`}>
                {t.fullName}
                <input
                  id={`${formId}-name`}
                  name="name"
                  autoComplete="name"
                  placeholder={t.fullNamePh}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <label htmlFor={`${formId}-phone`}>
                {t.phone}
                <span className="phone-field">
                  <span>+91</span>
                  <input
                    id={`${formId}-phone`}
                    name="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    maxLength={10}
                    value={phone}
                    onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
                  />
                </span>
              </label>
            </div>
            <div className="field-stack" ref={treatRef}>
              <span id={`${formId}-treat-label`}>{t.treatmentLabel}</span>
              <button
                type="button"
                className="select-btn"
                aria-haspopup="listbox"
                aria-expanded={treatOpen}
                aria-labelledby={`${formId}-treat-label`}
                onClick={() => setTreatOpen((value) => !value)}
              >
                <span className={treatment ? undefined : "is-placeholder"}>{selectedLabel}</span>
                <ChevronDown size={16} aria-hidden="true" />
              </button>
              {treatOpen ? (
                <ul className="select-menu" role="listbox" aria-labelledby={`${formId}-treat-label`}>
                  {treatments.map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={treatment === item.id}
                        onClick={() => {
                          setTreatment(item.id);
                          setTreatOpen(false);
                        }}
                      >
                        {item[lang]}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="field-row">
              <label htmlFor={`${formId}-date`}>
                {t.dateLabel}
                <DateField id={`${formId}-date`} label={t.dateLabel} value={date} lang={lang} onChange={setDate} />
              </label>
              <label htmlFor={`${formId}-time`}>
                {t.timeLabel}
                <TimeField id={`${formId}-time`} label={t.timeLabel} value={time} lang={lang} onChange={setTime} />
              </label>
            </div>
            <label htmlFor={`${formId}-note`}>
              {t.noteLabel}
              <textarea
                id={`${formId}-note`}
                rows={3}
                placeholder={t.notePh}
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </label>
            {formError ? (
              <p className="form-error" role="alert">
                {formError}
              </p>
            ) : null}
            <button type="submit" className="btn-gold btn-wide">
              <WhatsAppMark />
              {t.continueWa}
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <p className="form-hint">{t.formHint}</p>
          </form>
        </section>

        <section id="faq" className="faq-band">
          <div className="faq-copy" data-reveal>
            <p className="eyebrow dark">{t.faqKicker}</p>
            <h2>{t.faqTitle}</h2>
            <p>{t.faqIntro}</p>
            <a
              className="wa-pill"
              href={waLink(
                lang === "mr"
                  ? "नमस्कार Smile Dental Clinic, मला भेटीबद्दल विचारायचे आहे."
                  : "Hello Smile Dental Clinic, I would like to ask about a visit.",
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{t.whatsapp}</span>
              <strong>{PHONE_DISPLAY}</strong>
            </a>
          </div>
          <div className="faq-list" data-reveal style={{ "--reveal": "100ms" } as CSSProperties}>
            {t.faqs.map((item, index) => {
              const open = faqOpen === index;
              return (
                <div key={item.q} className={open ? "faq-item is-open" : "faq-item"}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setFaqOpen(open ? -1 : index)}
                    >
                      <span>{pad(index + 1)}</span>
                      {item.q}
                      <ChevronDown size={18} aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="faq-panel" hidden={!open}>
                    <p>{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="visit-band" aria-labelledby="visit-heading">
          <div className="visit-card" data-reveal>
            <p className="eyebrow dark">{t.visitKicker}</p>
            <h2 id="visit-heading">{t.visitTitle}</h2>
            <p className="address-label">{t.addressLabel}</p>
            <p className="address">{t.address}</p>
            <div className="visit-actions">
              <a className="btn-book" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
                <MapPin size={16} aria-hidden="true" />
                {t.openMaps}
              </a>
              <a className="btn-line" href={`tel:${PHONE_TEL}`}>
                <Phone size={16} aria-hidden="true" />
                {t.callClinic}
              </a>
            </div>
          </div>
          <div className="map-frame" data-reveal style={{ "--reveal": "140ms" } as CSSProperties}>
            <svg className="map-art" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="800" height="520" fill="#e6eed9" />
              <g fill="none" stroke="#f4f7ee" strokeWidth="22" strokeLinecap="square">
                <path d="M-40 70 H840" />
                <path d="M-40 190 H840" />
                <path d="M-40 320 H840" />
                <path d="M-40 450 H840" />
                <path d="M90 -30 V560" />
                <path d="M250 -30 V560" />
                <path d="M470 -30 V560" />
                <path d="M660 -30 V560" />
              </g>
              <g fill="none" stroke="#c9d7b4" strokeWidth="10" strokeLinecap="square">
                <path d="M-60 500 L860 -40" />
                <path d="M140 560 L980 20" />
                <path d="M-80 180 L420 -20" />
                <path d="M360 560 L900 180" />
                <path d="M20 40 L280 520" />
              </g>
            </svg>
            <div className="map-chip">
              <strong>{t.mapLabel}</strong>
              <span>{t.mapChip}</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-grid" data-reveal>
          <div>
            <div className="brand footer-brand">
              <SmileMark />
              <span>
                <span className="brand-title">Smile Dental Clinic</span>
                <span className="brand-sub">Implant Center</span>
              </span>
            </div>
            <p className="footer-tag">{t.footerTag}</p>
          </div>
          <nav aria-label={t.quickLinks}>
            <p>{t.quickLinks}</p>
            {NAV.slice(0, 4).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id);
                }}
              >
                {t.nav[item.key]}
              </a>
            ))}
          </nav>
          <div>
            <p>{t.contact}</p>
            <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            <span>Sector 10, Kharghar</span>
            <button type="button" onClick={openAssistant}>
              {t.whatsapp}
            </button>
          </div>
        </div>
        <div className="footer-base">
          <span>{t.rights}</span>
          <span>{t.assistantNote}</span>
        </div>
      </footer>

      {showTop ? (
        <a
          className="to-top"
          href="#top"
          aria-label={t.backToTop}
          onClick={(event) => {
            event.preventDefault();
            go("top");
          }}
        >
          <ArrowUpRight size={18} className="to-top-icon" aria-hidden="true" />
        </a>
      ) : null}

      <div className="mobile-bar">
        <a href={`tel:${PHONE_TEL}`}>
          <Phone size={16} aria-hidden="true" />
          {t.callClinic}
        </a>
        <a
          href="#book"
          onClick={(event) => {
            event.preventDefault();
            go("book");
          }}
        >
          {t.bookCta}
        </a>
      </div>

      {assistant ? (
        <div className="assist-overlay" onMouseDown={() => setAssistant(false)}>
          <div
            className="assist-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="assist-title"
            ref={dialogRef}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="assist-head">
              <span className="assist-icon">
                <CalendarDays size={18} aria-hidden="true" />
              </span>
              <div>
                <p>{t.assistKicker}</p>
                <h2 id="assist-title">{t.assistTitle}</h2>
                <span>{t.assistSub}</span>
              </div>
              <button type="button" className="assist-close" onClick={() => setAssistant(false)} aria-label={t.close}>
                <X size={18} />
              </button>
            </div>
            <div className="assist-progress" aria-hidden="true">
              <span className={`step-${step}`} />
            </div>
            <div className="assist-body">
              {step === 1 ? (
                <>
                  <p className="assist-q">{t.assistQ1}</p>
                  <div className="assist-options">
                    {concerns.map((item) => {
                      const Icon = concernIcon[item];
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setConcern(item);
                            setStep(2);
                          }}
                        >
                          <Icon size={16} aria-hidden="true" />
                          {t.concernLabels[item]}
                          <ChevronRight size={16} aria-hidden="true" />
                        </button>
                      );
                    })}
                  </div>
                </>
              ) : null}
              {step === 2 ? (
                <>
                  <p className="assist-q">{t.assistQ2}</p>
                  <div className="assist-options">
                    {timings.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setTiming(item);
                          setStep(3);
                        }}
                      >
                        <Clock3 size={16} aria-hidden="true" />
                        {t.timingLabels[item]}
                        <ChevronRight size={16} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                  <button type="button" className="text-back" onClick={() => setStep(1)}>
                    {t.back}
                  </button>
                </>
              ) : null}
              {step === 3 ? (
                <form onSubmit={submitAssistant} noValidate>
                  <p className="assist-q">{t.assistQ3}</p>
                  <label>
                    {t.yourName}
                    <input value={assistName} autoComplete="name" onChange={(event) => setAssistName(event.target.value)} />
                  </label>
                  <label>
                    {t.yourPhone}
                    <input
                      inputMode="numeric"
                      autoComplete="tel-national"
                      maxLength={10}
                      value={assistPhone}
                      onChange={(event) => setAssistPhone(event.target.value.replace(/\D/g, "").slice(0, 10))}
                    />
                  </label>
                  {assistError ? (
                    <p className="form-error" role="alert">
                      {assistError}
                    </p>
                  ) : null}
                  <button type="submit" className="btn-mint">
                    <WhatsAppMark />
                    {t.prepareWa}
                  </button>
                  <button type="button" className="text-back" onClick={() => setStep(2)}>
                    {t.back}
                  </button>
                </form>
              ) : null}
              <p className="assist-note">
                <Shield size={13} aria-hidden="true" />
                {t.assistantNote}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
