export type Lang = "en" | "mr";

export const PHONE_DISPLAY = "90221 17458";
export const PHONE_TEL = "+919022117458";
export const WHATSAPP = "919022117458";
export const ADDRESS_EN =
  "Shop No. 8, Shree Jeevdani Heights, Kopra, Sector 10, Kharghar, Panvel, Maharashtra 410210";
export const ADDRESS_MR =
  "दुकान क्र. ८, श्री जीवदानी हाइट्स, कोपरा, सेक्टर १०, खारघर, पनवेल, महाराष्ट्र ४१०२१०";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Shop+No.+8%2C+Shree+Jeevdani+Heights%2C+Kopra%2C+Sector+10%2C+Kharghar%2C+Panvel%2C+Maharashtra+410210";

export type TreatId =
  | "xray"
  | "online"
  | "cosmetic"
  | "checkup"
  | "veneers"
  | "whitening"
  | "extractions"
  | "cleaning"
  | "reshaping"
  | "implants"
  | "dentures"
  | "paediatrics"
  | "bonding"
  | "fillings"
  | "guards"
  | "surgery"
  | "rootcanal";

export const treatments: { id: TreatId; en: string; mr: string }[] = [
  { id: "xray", en: "X-ray", mr: "एक्स-रे" },
  { id: "online", en: "Online dentist booking", mr: "ऑनलाइन डेंटिस्ट बुकिंग" },
  { id: "cosmetic", en: "Cosmetic procedures", mr: "कॉस्मेटिक प्रक्रिया" },
  { id: "checkup", en: "Check-ups", mr: "तपासणी" },
  { id: "veneers", en: "Veneers & crowns", mr: "व्हेनियर आणि क्राउन" },
  { id: "whitening", en: "Teeth whitening", mr: "दात पांढरे करणे" },
  { id: "extractions", en: "Extractions", mr: "दात काढणे" },
  { id: "cleaning", en: "Teeth cleaning", mr: "दात स्वच्छता" },
  { id: "reshaping", en: "Teeth reshaping", mr: "दातांचा आकार" },
  { id: "implants", en: "Dental implants", mr: "डेंटल इम्प्लांट" },
  { id: "dentures", en: "Dentures & bridges", mr: "डेंचर आणि ब्रिज" },
  { id: "paediatrics", en: "Paediatrics", mr: "बालरोग दंत" },
  { id: "bonding", en: "Bonding", mr: "बाँडिंग" },
  { id: "fillings", en: "Fillings & sealants", mr: "फिलिंग आणि सीलंट" },
  { id: "guards", en: "Mouth guards", mr: "माउथ गार्ड" },
  { id: "surgery", en: "Oral surgery", mr: "ओरल सर्जरी" },
  { id: "rootcanal", en: "Root canal treatment", mr: "रूट कॅनाल" },
];

export type FeaturedTone = "paper" | "sage" | "forest" | "butter";

export const featured: {
  treat: TreatId;
  tone: FeaturedTone;
  icon: "shield" | "heart" | "spark" | "smile" | "gem";
}[] = [
  { treat: "implants", tone: "paper", icon: "shield" },
  { treat: "rootcanal", tone: "sage", icon: "heart" },
  { treat: "cosmetic", tone: "forest", icon: "spark" },
  { treat: "checkup", tone: "butter", icon: "smile" },
  { treat: "paediatrics", tone: "sage", icon: "smile" },
  { treat: "fillings", tone: "paper", icon: "gem" },
];

export const concerns = ["pain", "routine", "cosmetic", "child", "other"] as const;
export const timings = ["asap", "week", "flexible"] as const;
export type Concern = (typeof concerns)[number];
export type Timing = (typeof timings)[number];

type Copy = {
  nav: { care: string; treatments: string; clinic: string; reviews: string; book: string };
  bookCta: string;
  skip: string;
  openMenu: string;
  closeMenu: string;
  heroEyebrow: string;
  heroLine1: string;
  heroLine2: string;
  heroSupport: string;
  checkAvailability: string;
  askAssistant: string;
  ratingLabel: string;
  locationTitle: string;
  locationSub: string;
  yourDentist: string;
  doctorName: string;
  doctorBlurb: string;
  exploreCare: string;
  marquee: string[];
  careKicker: string;
  careTitle: string;
  careIntro: string;
  bookVisit: string;
  featured: Record<string, { title: string; body: string }>;
  allKicker: string;
  allIntro: string;
  allBadge: string;
  allBadgeSub: string;
  clinicKicker: string;
  clinicTitle: string;
  clinicBody: string;
  clinicPoints: string[];
  reviewsKicker: string;
  reviewsTitle: string;
  reviewsBody: string;
  patientRating: string;
  verifiedReviews: string;
  bookKicker: string;
  bookTitle: string;
  bookBody: string;
  steps: string[];
  fullName: string;
  fullNamePh: string;
  phone: string;
  treatmentLabel: string;
  treatmentPh: string;
  dateLabel: string;
  timeLabel: string;
  noteLabel: string;
  notePh: string;
  continueWa: string;
  formHint: string;
  nameError: string;
  phoneError: string;
  faqKicker: string;
  faqTitle: string;
  faqIntro: string;
  whatsapp: string;
  faqs: { q: string; a: string }[];
  visitKicker: string;
  visitTitle: string;
  addressLabel: string;
  address: string;
  openMaps: string;
  callClinic: string;
  mapLabel: string;
  mapChip: string;
  footerTag: string;
  quickLinks: string;
  contact: string;
  rights: string;
  assistantNote: string;
  assistKicker: string;
  assistTitle: string;
  assistSub: string;
  assistQ1: string;
  assistQ2: string;
  assistQ3: string;
  concernLabels: Record<Concern, string>;
  timingLabels: Record<Timing, string>;
  back: string;
  yourName: string;
  yourPhone: string;
  prepareWa: string;
  close: string;
  backToTop: string;
};

export const copy: Record<Lang, Copy> = {
  en: {
    nav: {
      care: "Care",
      treatments: "Treatments",
      clinic: "Clinic",
      reviews: "Reviews",
      book: "Book",
    },
    bookCta: "Book a visit",
    skip: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    heroEyebrow: "Smile Dental Clinic & Implant Center",
    heroLine1: "A healthier smile.",
    heroLine2: "A calmer visit.",
    heroSupport:
      "Thoughtful dental care led by Dr. Rajeshwar Bhattacharya, with simple online booking and clear WhatsApp confirmation.",
    checkAvailability: "Check availability",
    askAssistant: "Ask our assistant",
    ratingLabel: "Verified patient rating · 42 reviews",
    locationTitle: "Kharghar, Navi Mumbai",
    locationSub: "Sector 10 – Kopra",
    yourDentist: "Your dentist",
    doctorName: "Dr. Rajeshwar Bhattacharya",
    doctorBlurb:
      "Personal, unhurried care with treatment choices explained in plain language.",
    exploreCare: "Explore care",
    marquee: ["WhatsApp confirmation", "17 focused treatments", "Online booking"],
    careKicker: "Treatment, without the guesswork",
    careTitle: "Everything your smile may need, in one considered space.",
    careIntro:
      "From preventive check-ups to implants and cosmetic care, start with a conversation and a plan built around your concern.",
    bookVisit: "Book a visit",
    featured: {
      implants: {
        title: "Dental implants",
        body: "A considered path to replace missing teeth and restore everyday confidence.",
      },
      rootcanal: {
        title: "Root canal care",
        body: "Focused care designed to relieve discomfort and preserve your natural tooth.",
      },
      cosmetic: {
        title: "Smile design",
        body: "Whitening, veneers, crowns and bonding planned around your smile.",
      },
      checkup: {
        title: "Preventive care",
        body: "Routine check-ups, X-rays and cleaning to catch concerns early.",
      },
      paediatrics: {
        title: "Children’s dentistry",
        body: "A calm, reassuring approach for younger patients and their families.",
      },
      fillings: {
        title: "Restorative dentistry",
        body: "Fillings, bridges, dentures and crowns to restore comfortable function.",
      },
    },
    allKicker: "All treatments",
    allIntro: "A complete view of the care available at the clinic.",
    allBadge: "17 treatments available",
    allBadgeSub: "Choose any treatment to start booking",
    clinicKicker: "Inside the clinic",
    clinicTitle: "Clean, calm and designed around your comfort.",
    clinicBody:
      "A modern neighbourhood clinic in Kharghar with a focused consultation area and dedicated treatment room.",
    clinicPoints: [
      "Clear treatment guidance",
      "Convenient WhatsApp follow-up",
      "Easy local access in Sector 10",
    ],
    reviewsKicker: "Trusted locally",
    reviewsTitle: "A 4.8-rated dental clinic in your neighbourhood.",
    reviewsBody:
      "Based on 42 verified patient reviews. A strong local reputation, supported by an easier digital booking experience.",
    patientRating: "Patient rating",
    verifiedReviews: "Verified reviews",
    bookKicker: "Book in under a minute",
    bookTitle: "Tell us what you need. We’ll take it from there.",
    bookBody:
      "Complete the short form and continue to WhatsApp with your details already prepared. The clinic will confirm availability directly.",
    steps: [
      "Choose a treatment",
      "Share your preferred time",
      "Receive confirmation on WhatsApp",
    ],
    fullName: "Full name",
    fullNamePh: "Your full name",
    phone: "Phone number",
    treatmentLabel: "Treatment or concern",
    treatmentPh: "Select a treatment",
    dateLabel: "Preferred date",
    timeLabel: "Preferred time",
    noteLabel: "Anything the clinic should know?",
    notePh: "For example: tooth pain for two days",
    continueWa: "Continue on WhatsApp",
    formHint: "Your details are sent only through WhatsApp when you choose to continue.",
    nameError: "Add your name so the clinic knows who to expect.",
    phoneError: "Enter a 10-digit mobile number.",
    faqKicker: "Before your visit",
    faqTitle: "A few useful answers, upfront.",
    faqIntro:
      "Clear expectations make booking easier. Here is what happens after you choose to contact the clinic.",
    whatsapp: "WhatsApp",
    faqs: [
      {
        q: "Does submitting the form confirm my appointment?",
        a: "No. Continuing on WhatsApp sends a prepared message to the clinic. The clinic confirms availability directly.",
      },
      {
        q: "Can I contact the clinic without completing the form?",
        a: "Yes. Call 90221 17458. The form simply prepares your details for WhatsApp.",
      },
      {
        q: "What does the website assistant do?",
        a: "The assistant helps you start a booking. It does not provide medical diagnosis or treatment advice.",
      },
      {
        q: "Where is Smile Dental Clinic located?",
        a: ADDRESS_EN,
      },
    ],
    visitKicker: "Visit us",
    visitTitle: "Dental care, close to home.",
    addressLabel: "Clinic address",
    address: ADDRESS_EN,
    openMaps: "Open in Google Maps",
    callClinic: "Call clinic",
    mapLabel: "Smile Dental Clinic",
    mapChip: "Sector 10 · Kharghar",
    footerTag: "Thoughtful dental care in Kharghar.",
    quickLinks: "Quick links",
    contact: "Contact",
    rights: "© 2026 Smile Dental Clinic & Implant Center",
    assistantNote: "Website assistant supports booking only and does not provide medical diagnosis.",
    assistKicker: "Dental booking assistant",
    assistTitle: "How can we help today?",
    assistSub: "Answer three quick questions. We’ll prepare your WhatsApp booking request.",
    assistQ1: "What would you like help with?",
    assistQ2: "When would you prefer to visit?",
    assistQ3: "Last step — where should the clinic reach you?",
    concernLabels: {
      pain: "Pain or sensitivity",
      routine: "Routine check-up",
      cosmetic: "Cosmetic concern",
      child: "Child dental care",
      other: "Something else",
    },
    timingLabels: {
      asap: "As soon as possible",
      week: "This week",
      flexible: "I’m flexible",
    },
    back: "Back",
    yourName: "Your name",
    yourPhone: "Your phone number",
    prepareWa: "Prepare WhatsApp request",
    close: "Close",
    backToTop: "Back to top",
  },
  mr: {
    nav: {
      care: "सेवा",
      treatments: "उपचार",
      clinic: "क्लिनिक",
      reviews: "रेटिंग",
      book: "अपॉइंटमेंट",
    },
    bookCta: "अपॉइंटमेंट बुक करा",
    skip: "थेट मजकुरावर जा",
    openMenu: "मेनू उघडा",
    closeMenu: "मेनू बंद करा",
    heroEyebrow: "स्माईल डेंटल क्लिनिक आणि इम्प्लांट सेंटर",
    heroLine1: "अधिक निरोगी स्माईल.",
    heroLine2: "अधिक शांत भेट.",
    heroSupport:
      "डॉ. राजेश्वर भट्टाचार्य यांच्या नेतृत्वाखाली विचारपूर्वक दंतसेवा, सोपे ऑनलाइन बुकिंग आणि स्पष्ट WhatsApp पुष्टी.",
    checkAvailability: "उपलब्धता तपासा",
    askAssistant: "आमच्या सहाय्यकाला विचारा",
    ratingLabel: "सत्यापित रुग्ण रेटिंग · 42 पुनरावलोकने",
    locationTitle: "खारघर, नवी मुंबई",
    locationSub: "सेक्टर 10 – कोपरा",
    yourDentist: "तुमचे दंतवैद्य",
    doctorName: "डॉ. राजेश्वर भट्टाचार्य",
    doctorBlurb: "वैयक्तिक, न घाईची काळजी. उपचार सोप्या भाषेत समजावले जातात.",
    exploreCare: "सेवा पाहा",
    marquee: ["WhatsApp पुष्टी", "17 उपचार", "ऑनलाइन बुकिंग"],
    careKicker: "उपचार, अंदाजाशिवाय",
    careTitle: "तुमच्या स्माईलसाठी लागणारी प्रत्येक गोष्ट, एका विचारपूर्वक जागेत.",
    careIntro:
      "तपासणीपासून इम्प्लांट आणि कॉस्मेटिक काळजीपर्यंत — आधी संवाद, मग तुमच्या तक्रारीभोवती योजना.",
    bookVisit: "भेट बुक करा",
    featured: {
      implants: {
        title: "डेंटल इम्प्लांट",
        body: "हरवलेले दात बदलण्याचा आणि रोजचा आत्मविश्वास परत मिळवण्याचा विचारपूर्वक मार्ग.",
      },
      rootcanal: {
        title: "रूट कॅनाल",
        body: "त्रास कमी करण्यासाठी आणि नैसर्गिक दात जपण्यासाठी लक्ष केंद्रित काळजी.",
      },
      cosmetic: {
        title: "स्माईल डिझाइन",
        body: "पांढरे करणे, व्हेनियर, क्राउन आणि बाँडिंग — तुमच्या स्माईलभोवती योजना.",
      },
      checkup: {
        title: "प्रतिबंधात्मक काळजी",
        body: "नियमित तपासणी, एक्स-रे आणि स्वच्छता, जेणेकरून काळजी लवकर लक्षात येईल.",
      },
      paediatrics: {
        title: "बाल दंतचिकित्सा",
        body: "लहान रुग्ण आणि त्यांच्या कुटुंबासाठी शांत, विश्वास देणारा दृष्टिकोन.",
      },
      fillings: {
        title: "पुनर्स्थापना",
        body: "फिलिंग, ब्रिज, डेंचर आणि क्राउन — सोयीस्कर खाणे आणि बोलणे परत मिळवण्यासाठी.",
      },
    },
    allKicker: "सर्व उपचार",
    allIntro: "क्लिनिकमध्ये उपलब्ध काळजीचे संपूर्ण चित्र.",
    allBadge: "17 उपचार उपलब्ध",
    allBadgeSub: "बुकिंग सुरू करण्यासाठी कोणताही उपचार निवडा",
    clinicKicker: "क्लिनिकच्या आत",
    clinicTitle: "स्वच्छ, शांत आणि तुमच्या आरामाभोवती रचलेली.",
    clinicBody:
      "खारघरमधील आधुनिक शेजारची क्लिनिक — स्वतंत्र सल्लामसलत आणि उपचार खोली.",
    clinicPoints: [
      "स्पष्ट उपचार मार्गदर्शन",
      "सोयीस्कर WhatsApp फॉलो-अप",
      "सेक्टर 10 मध्ये सोपी पोहोच",
    ],
    reviewsKicker: "स्थानिक विश्वास",
    reviewsTitle: "तुमच्या शेजारची 4.8 रेटिंग असलेली डेंटल क्लिनिक.",
    reviewsBody:
      "42 सत्यापित रुग्ण पुनरावलोकनांवर आधारित. सोपी डिजिटल बुकिंगसोबत मजबूत स्थानिक विश्वास.",
    patientRating: "रुग्ण रेटिंग",
    verifiedReviews: "सत्यापित पुनरावलोकने",
    bookKicker: "एका मिनिटात बुक करा",
    bookTitle: "तुमची गरज सांगा. पुढचे आम्ही पाहू.",
    bookBody:
      "छोटा फॉर्म भरा आणि तयार तपशीलांसह WhatsApp वर पुढे जा. क्लिनिक उपलब्धतेची थेट पुष्टी करेल.",
    steps: ["उपचार निवडा", "पसंतीची वेळ सांगा", "WhatsApp वर पुष्टी मिळवा"],
    fullName: "पूर्ण नाव",
    fullNamePh: "तुमचे पूर्ण नाव",
    phone: "फोन नंबर",
    treatmentLabel: "उपचार किंवा समस्या",
    treatmentPh: "उपचार निवडा",
    dateLabel: "पसंतीची तारीख",
    timeLabel: "पसंतीची वेळ",
    noteLabel: "क्लिनिकला आणखी काही सांगायचे आहे का?",
    notePh: "उदाहरण: दोन दिवसांपासून दात दुखत आहे",
    continueWa: "WhatsApp वर पुढे जा",
    formHint: "तुम्ही पुढे जाणे निवडल्यावर तपशील फक्त WhatsApp वर जातात.",
    nameError: "क्लिनिकला तुमचे नाव हवे आहे.",
    phoneError: "१० अंकी मोबाइल नंबर टाका.",
    faqKicker: "भेटीपूर्वी",
    faqTitle: "काही महत्त्वाची उत्तरे, आधीच.",
    faqIntro:
      "स्पष्ट माहितीमुळे बुकिंग सोपे होते. क्लिनिकशी संपर्क साधल्यानंतर पुढे काय होते ते येथे पहा.",
    whatsapp: "WhatsApp",
    faqs: [
      {
        q: "फॉर्म पाठवल्यावर अपॉइंटमेंट निश्चित होते का?",
        a: "नाही. WhatsApp वर पुढे गेल्यावर तयार संदेश क्लिनिककडे जातो. उपलब्धतेची पुष्टी क्लिनिक थेट करते.",
      },
      {
        q: "फॉर्म न भरता क्लिनिकशी संपर्क साधू शकतो का?",
        a: "होय. 90221 17458 वर कॉल करा. फॉर्म फक्त WhatsApp साठी तपशील तयार करतो.",
      },
      {
        q: "वेबसाइट असिस्टंट काय करतो?",
        a: "असिस्टंट बुकिंग सुरू करायला मदत करतो. तो वैद्यकीय निदान किंवा उपचार सल्ला देत नाही.",
      },
      {
        q: "स्माईल डेंटल क्लिनिक कुठे आहे?",
        a: ADDRESS_MR,
      },
    ],
    visitKicker: "आमच्याकडे या",
    visitTitle: "घराजवळची दंतसेवा.",
    addressLabel: "क्लिनिकचा पत्ता",
    address: ADDRESS_MR,
    openMaps: "Google Maps उघडा",
    callClinic: "क्लिनिकला कॉल करा",
    mapLabel: "Smile Dental Clinic",
    mapChip: "सेक्टर 10 · खारघर",
    footerTag: "खारघरमध्ये विचारपूर्वक दंतसेवा.",
    quickLinks: "द्रुत दुवे",
    contact: "संपर्क",
    rights: "© 2026 Smile Dental Clinic & Implant Center",
    assistantNote: "वेबसाइट असिस्टंट फक्त बुकिंगसाठी आहे आणि वैद्यकीय निदान देत नाही.",
    assistKicker: "डेंटल बुकिंग असिस्टंट",
    assistTitle: "आज आम्ही कशी मदत करू?",
    assistSub: "तीन छोटे प्रश्न. आम्ही तुमची WhatsApp विनंती तयार करू.",
    assistQ1: "तुम्हाला कशासाठी मदत हवी आहे?",
    assistQ2: "भेट कधी हवी आहे?",
    assistQ3: "शेवटची पायरी — क्लिनिकने कुठे संपर्क साधावा?",
    concernLabels: {
      pain: "दुखणे किंवा संवेदनशीलता",
      routine: "नियमित तपासणी",
      cosmetic: "कॉस्मेटिक काळजी",
      child: "मुलांची दंतकाळजी",
      other: "इतर काही",
    },
    timingLabels: {
      asap: "लवकरात लवकर",
      week: "या आठवड्यात",
      flexible: "मी लवचिक आहे",
    },
    back: "मागे",
    yourName: "तुमचे नाव",
    yourPhone: "तुमचा फोन नंबर",
    prepareWa: "WhatsApp विनंती तयार करा",
    close: "बंद करा",
    backToTop: "वर जा",
  },
};

export function treatLabel(id: string, lang: Lang) {
  return treatments.find((item) => item.id === id)?.[lang] ?? "";
}

export function waLink(text: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}
