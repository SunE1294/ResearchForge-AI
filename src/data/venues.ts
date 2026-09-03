import { VenueItem } from "@/types";

export const KEY_VENUES: VenueItem[] = [
  {
    id: "ieee-tpami",
    name: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    acronym: "IEEE TPAMI",
    type: "Journal",
    tier: "Q1",
    indexing: ["Scopus", "SCIE", "IEEE Xplore"],
    hIndex: 412,
    field: "Computer Vision & AI",
    website: "https://www.computer.org/csdl/journal/tp",
    departments: ["CSE", "SWE", "CIS"]
  },
  {
    id: "acm-chi",
    name: "ACM Conference on Human Factors in Computing Systems",
    acronym: "CHI",
    type: "Conference",
    tier: "CORE A*",
    indexing: ["ACM Digital Library", "Scopus"],
    hIndex: 145,
    field: "HCI & UX Design",
    deadlineText: "Annual September submission cycle",
    website: "https://chi.acm.org/",
    departments: ["MCT", "CSE", "SWE"]
  },
  {
    id: "lancet-gh",
    name: "The Lancet Global Health",
    acronym: "Lancet GH",
    type: "Journal",
    tier: "Q1",
    indexing: ["PubMed", "MEDLINE", "Scopus", "SCIE"],
    hIndex: 135,
    field: "Public Health & Epidemiology",
    website: "https://www.thelancet.com/journals/langlo/home",
    departments: ["PH", "PHARM", "NFE"]
  },
  {
    id: "j-cleaner-prod",
    name: "Journal of Cleaner Production",
    acronym: "JCLP",
    type: "Journal",
    tier: "Q1",
    indexing: ["Scopus", "SCIE", "Elsevier"],
    hIndex: 268,
    field: "Environmental Science & Sustainable Tech",
    website: "https://www.sciencedirect.com/journal/journal-of-cleaner-production",
    departments: ["ESDM", "TE", "CE", "BBA"]
  },
  {
    id: "asce-jse",
    name: "ASCE Journal of Structural Engineering",
    acronym: "ASCE JSE",
    type: "Journal",
    tier: "Q1",
    indexing: ["Scopus", "SCIE", "ASCE Library"],
    hIndex: 172,
    field: "Civil & Structural Engineering",
    website: "https://ascelibrary.org/journal/jsendh",
    departments: ["CE", "ARCH"]
  },
  {
    id: "j-bus-res",
    name: "Journal of Business Research",
    acronym: "JBR",
    type: "Journal",
    tier: "Q1",
    indexing: ["Scopus", "SSCI", "Elsevier", "ABS 3*"],
    hIndex: 215,
    field: "Business Administration & Marketing",
    website: "https://www.sciencedirect.com/journal/journal-of-business-research",
    departments: ["BBA", "DoIE", "THM", "BIT"]
  },
  {
    id: "world-dev",
    name: "World Development",
    acronym: "World Dev",
    type: "Journal",
    tier: "Q1",
    indexing: ["Scopus", "SSCI", "Elsevier"],
    hIndex: 198,
    field: "Development Studies & Policy",
    website: "https://www.sciencedirect.com/journal/world-development",
    departments: ["DS", "LAW", "JMC", "BBA"]
  },
  {
    id: "oxford-jls",
    name: "Oxford Journal of Legal Studies",
    acronym: "OJLS",
    type: "Journal",
    tier: "Q1",
    indexing: ["Scopus", "SSCI", "Oxford Academic"],
    hIndex: 42,
    field: "Jurisprudence & Doctrinal Law",
    website: "https://academic.oup.com/ojls",
    departments: ["LAW"]
  }
];

export interface PredatoryChecklistItem {
  id: string;
  rule: string;
  ruleBn: string;
  severity: "high" | "critical" | "warning";
  explanation: string;
  explanationBn: string;
}

export const PREDATORY_CHECKLIST: PredatoryChecklistItem[] = [
  {
    id: "fake-impact-factor",
    rule: "Bogus Impact Metric Claims (e.g., 'Universal Impact Factor', 'SJIF')",
    ruleBn: "ভুয়া ইমপ্যাক্ট ফ্যাক্টরের দাবি (যেমন 'Universal Impact Factor', 'SJIF')",
    severity: "critical",
    explanation: "Authentic Impact Factors are ONLY provided by Clarivate Journal Citation Reports (JCR) for Web of Science. CiteScore is provided exclusively by Elsevier Scopus. Any other acronym is fabricated.",
    explanationBn: "প্রকৃত ইমপ্যাক্ট ফ্যাক্টর শুধুমাত্র ক্ল্যারিভেট অ্যানালিটিক্স (JCR/Web of Science) প্রদান করে। স্কোপাস প্রদান করে CiteScore। অন্যান্য যেকোনো অদ্ভুত সংক্ষিপ্ত নাম ভুয়া।"
  },
  {
    id: "rapid-acceptance",
    rule: "Guaranteed 48-72 Hour Peer Review Acceptance",
    ruleBn: "৪৮-৭২ ঘণ্টার মধ্যে নিশ্চয়তাপূর্ণ পিয়ার রিভিউ গ্রহণ",
    severity: "critical",
    explanation: "Rigorous academic peer review requires 4-12 weeks. Venues promising review within days without substantial feedback are predatory cash-grabs.",
    explanationBn: "যথাযথ একাডেমিক পিয়ার রিভিউ করতে কমপক্ষে ৪ থেকে ১২ সপ্তাহ সময় লাগে। কয়েকদিনের মধ্যে পেপার গ্রহণের প্রতিশ্রুতি সুস্পষ্ট জালিয়াতি।"
  },
  {
    id: "unsolicited-email",
    rule: "Aggressive Flattering Unsolicited Emails",
    ruleBn: "অযাচিত ইমেইলে অতিরিক্ত তোষামোদপূর্ণ পেপার আহ্বান",
    severity: "high",
    explanation: "Predatory publishers crawl university thesis archives and send automated emails: 'We were impressed by your article... please submit to our upcoming volume'.",
    explanationBn: "শিকারি প্রকাশকরা শিক্ষার্থীদের থিসিস সাইট থেকে ইমেইল সংগ্রহ করে অটোমেটেড স্প্যাম পাঠায় এবং টাকা নিয়ে ছাপানোর প্রস্তাব দেয়।"
  },
  {
    id: "no-retraction-policy",
    rule: "No Clear Editorial Board with Institutional Affiliations",
    ruleBn: "বিশ্ববিদ্যালয় অনুষদের পরিচয়হীন অথবা ভুয়া এডিটোরিয়াল বোর্ড",
    severity: "high",
    explanation: "Check the editorial board members on Google Scholar or university faculty directories. Predatory journals frequently list legitimate professors without their knowledge.",
    explanationBn: "এডিটোরিয়াল বোর্ডের অধ্যাপকদের প্রাতিষ্ঠানিক ওয়েবসাইটে যেয়ে নিশ্চিত হোন তারা আসলেই ওই জার্নালের সাথে যুক্ত কিনা।"
  },
  {
    id: "hijacked-domain",
    rule: "Hijacked Journal Domain (Cloned Website)",
    ruleBn: "হাইজ্যাকড ডোমেইন (আসল জার্নালের হুবহু নকল ওয়েবসাইট)",
    severity: "critical",
    explanation: "Scammers register expired domains of legitimate print-only journals. Always verify the ISSN on the official ISSN Portal (portal.issn.org) and Scopus Source Preview.",
    explanationBn: "অনেক নামকরা প্রিন্ট জার্নালের ডোমেইন মেয়াদ শেষ হলে প্রতারকরা তা কিনে হুবহু একই নামে ভুয়া ওয়েবসাইট বানায়। portal.issn.org থেকে সঠিক লিংক যাচাই করুন।"
  }
];
