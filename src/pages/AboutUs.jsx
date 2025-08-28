/* eslint-disable react/no-unescaped-entities */
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  Star,
  Target,
  BookOpenText,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Users,
  HeartHandshake,
  Globe,
  BrainCircuit,
  ClipboardCheck,
  CheckCircle2,
  NotebookPen,
  FilePieChart,
  Lightbulb,
  Rocket,
  Timer,
  CalendarCheck2,
  MessageSquareMore,
  Quote,
  ChevronRight,
  Mail,
  Phone,
} from "lucide-react";

/**
 * ABOUTUS.JSX — ResearchKart
 * Theme: Light, professional (white ↔ orange-50 base), Orange brand accents
 * Animations: Framer Motion (staggered fades, reveals, subtle parallax)
 *
 * Sections
 * 1) Hero Intro (Who we are) — uses tagline/headline/subheadline from your doc
 * 2) Mission & Vision cards
 * 3) Our Story + Timeline
 * 4) Core Values grid
 * 5) Service Buckets (Aspirants, Scholars, Post-PhD)
 * 6) Leadership / Team
 * 7) Testimonials
 * 8) FAQ
 * 9) CTA band (Book Consultation / Contact)
 *
 * Notes:
 * - Matches your Hero.jsx light background + subtle grid motif for continuity
 * - Uses ethical disclaimer from doc: no ghostwriting for degree submissions
 * - Replace placeholder text/photos (team) as needed; structure is ready
 */

/* ---------------------------- Motion helpers ---------------------------- */

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE } },
  viewport: { once: true, amount: 0.3 },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1, transition: { duration: 0.5, delay, ease: EASE } },
  viewport: { once: true, amount: 0.3 },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { duration: 0.7, delay, ease: EASE } },
  viewport: { once: true, amount: 0.3 },
});

/* ---------------------------- Tiny UI helpers --------------------------- */

function Pill({ children }) {
  return (
    <motion.span
      className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700 shadow-sm"
      {...fadeUp(0.05, 10)}
    >
      <Sparkles className="h-4 w-4" />
      {children}
    </motion.span>
  );
}

function AccentUnderline() {
  return (
    <span
      aria-hidden="true"
      className="absolute -bottom-1 left-0 h-[8px] w-full rounded-full bg-gradient-to-r from-orange-300/70 via-orange-400/80 to-orange-500"
    />
  );
}

/* ------------------------------ Background ----------------------------- */

function AmbientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span
        className="absolute -top-14 -left-10 h-64 w-64 rounded-full bg-orange-200/35 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute top-1/3 -right-10 h-72 w-72 rounded-full bg-orange-100/40 blur-3xl"
        animate={{ x: [0, -30, 10, 0], y: [0, 15, -5, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.span
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl"
        animate={{ x: [0, 20, -30, 0], y: [0, -10, 25, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut", delay: 0.6 }}
      />
    </div>
  );
}

/* ------------------------------ Intro Hero ----------------------------- */

function IntroHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pb-20 md:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:44px_44px]"
      />
      <AmbientOrbs />

      <motion.div
        style={{ y }}
        className="relative mx-auto max-w-3xl text-center"
        {...fadeIn(0)}
      >
        <Pill>One Stop for Research Excellence</Pill>

        <motion.h1
          className="relative mx-auto mt-4 max-w-4xl text-4xl font-extrabold leading-[1.15] text-gray-900 sm:text-5xl md:text-6xl"
          {...fadeUp(0.08)}
        >
          Who We Are at{" "}
          <span className="relative inline-block text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text">
            ResearchKart
            <AccentUnderline />
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg"
          {...fadeUp(0.14)}
        >
          Empowering PhD scholars with expert academic support — from{" "}
          <span className="font-semibold text-orange-600">topic selection</span> to{" "}
          <span className="font-semibold text-orange-600">thesis submission</span> and{" "}
          <span className="font-semibold text-orange-600">publication</span>. We guide you at every step with ethical,
          transparent mentorship.
        </motion.p>

        <motion.div
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
          {...fadeUp(0.2)}
        >
          <Link
            to="/book-free-consultation"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700 active:translate-y-0"
          >
            <CalendarCheck2 className="h-5 w-5" />
            Book Free Consultation
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-orange-300 bg-white px-6 py-3 text-base font-semibold text-orange-700 shadow-sm transition hover:bg-orange-50"
          >
            Explore Services
            <ChevronRight className="h-5 w-5" />
          </Link>
        </motion.div>

        <motion.div
          className="mt-6 text-xs text-gray-500"
          {...fadeUp(0.26)}
        >
          Disclaimer: We do not offer ghostwriting for degree submissions. Support is aligned with academic ethics.
        </motion.div>
      </motion.div>
    </section>
  );
}

/* --------------------------- Mission & Vision --------------------------- */

function MVCard({ icon: Icon, title, children, idx }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm transition hover:shadow-md"
      {...scaleIn(0.05 * idx)}
    >
      <div className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-orange-100 blur-2xl" />
      </div>
      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange-50">
        <Icon className="h-6 w-6 text-orange-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{children}</p>
    </motion.div>
  );
}

function MissionVision() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-12">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        {...fadeUp(0.05)}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
          <Star className="h-4 w-4" />
          What drives us
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Mission & Vision</h2>
        <p className="mt-2 text-sm text-gray-700">
          We bring deep academic and research experience to support scholars across the research lifecycle — from
          ideation and methodology to publication and teaching preparation.
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MVCard icon={Target} title="Our Mission" idx={0}>
          Enable scholars to achieve rigorous, ethical, and impactful research outcomes with clear roadmaps, personalized mentorship, and practical tools.
        </MVCard>
        <MVCard icon={Rocket} title="Our Vision" idx={1}>
          Build a community of confident researchers who publish with integrity, teach with clarity, and lead with evidence.
        </MVCard>
      </div>
    </section>
  );
}

/* ------------------------------ Our Story ------------------------------ */

function StoryTimeline() {
  const steps = [
    {
      year: "2019",
      title: "Foundations",
      desc:
        "We began by mentoring a small cohort of PhD aspirants, focusing on topic ideation and proposal clarity.",
    },
    {
      year: "2020",
      title: "Methodology & Analysis",
      desc:
        "Expanded to structured methodology maps, reproducible data workflows, and hands-on analysis support.",
    },
    {
      year: "2022",
      title: "Publication & Teaching",
      desc:
        "Launched dedicated manuscript coaching, journal selection guidance, and presentation/teaching prep.",
    },
    {
      year: "2024",
      title: "Comprehensive Ecosystem",
      desc:
        "Now supporting end-to-end journeys — from proposal to publication and beyond (career transition, course design).",
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-12">
      <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp(0.05)}>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
          <BookOpenText className="h-4 w-4" />
          Our Journey
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">The Story of ResearchKart</h2>
        <p className="mt-2 text-sm text-gray-700">
          Whether you are beginning your PhD, stuck mid-way, or preparing for your viva, we provide clear, actionable support at every stage.
        </p>
      </motion.div>

      <div className="relative mx-auto mt-8 max-w-4xl">
        <div className="absolute left-4 top-0 h-full w-1 rounded bg-orange-200 sm:left-1/2 sm:-ml-0.5" />
        <div className="space-y-6">
          {steps.map((s, idx) => (
            <motion.div
              key={idx}
              className={`relative flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm sm:w-[calc(50%-12px)] ${
                idx % 2 === 0 ? "sm:ml-0 sm:mr-auto" : "sm:ml-auto sm:mr-0"
              }`}
              {...scaleIn(0.05 * idx)}
            >
              <div
                className={`absolute top-6 h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-200 bg-white/70 ${
                  idx % 2 === 0 ? "left-8 sm:-right-2 sm:left-auto" : "-right-2 sm:-left-2"
                }`}
              />
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                {s.year}
              </div>
              <div className="text-lg font-semibold text-gray-900">{s.title}</div>
              <div className="text-sm text-gray-600">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Core Values ----------------------------- */

const CORE_VALUES = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-orange-600" />,
    title: "Integrity",
    desc: "No ghostwriting for degree submissions. We align with academic ethics and transparency.",
  },
  {
    icon: <Users className="h-6 w-6 text-orange-600" />,
    title: "Mentorship",
    desc: "Personalized guidance with realistic timelines and measurable outcomes.",
  },
  {
    icon: <LineChart className="h-6 w-6 text-orange-600" />,
    title: "Rigor",
    desc: "Methodologies that fit your questions, reproducible analysis, and strong evidence.",
  },
  {
    icon: <HeartHandshake className="h-6 w-6 text-orange-600" />,
    title: "Empathy",
    desc: "We meet you where you are — and help you move forward with clarity.",
  },
  {
    icon: <Globe className="h-6 w-6 text-orange-600" />,
    title: "Community",
    desc: "Learning together — seminars, templates, and shared resources.",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-orange-600" />,
    title: "Clarity",
    desc: "Crisp writing, structured thinking, and confident presentations.",
  },
];

function ValuesGrid() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-12">
      <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp(0.05)}>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
          <ShieldCheck className="h-4 w-4" />
          What we stand for
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Core Values</h2>
        <p className="mt-2 text-sm text-gray-700">
          The principles that shape every interaction, decision, and deliverable.
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {CORE_VALUES.map((v, i) => (
          <motion.div
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm transition hover:shadow-md"
            {...scaleIn(0.05 * i)}
          >
            <div className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-orange-100 blur-2xl" />
            </div>
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange-50">
              {v.icon}
            </div>
            <div className="text-lg font-semibold text-gray-900">{v.title}</div>
            <div className="mt-1 text-sm text-gray-600">{v.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------ Services Map ---------------------------- */

function ServiceCard({ icon: Icon, title, bullets, idx }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm"
      {...scaleIn(0.06 * idx)}
    >
      <div className="absolute inset-0 -z-10 opacity-0 transition hover:opacity-100">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-orange-100 blur-2xl" />
      </div>

      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange-50">
        <Icon className="h-6 w-6 text-orange-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>

      <ul className="mt-3 space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-orange-500" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-700">
        Learn more <ChevronRight className="h-4 w-4" />
      </div>
    </motion.div>
  );
}

function ServicesMap() {
  const buckets = useMemo(
    () => [
      {
        icon: GraduationCap,
        title: "For PhD Aspirants",
        bullets: [
          "Topic ideation & scope refinement",
          "Proposal & synopsis coaching",
          "Literature mapping & gap identification",
          "Roadmap planning & milestone setting",
        ],
      },
      {
        icon: BookOpenText,
        title: "For PhD Scholars",
        bullets: [
          "Methodology selection & design",
          "Quantitative/Qualitative data analysis",
          "Thesis structuring & proofreading",
          "Reviewer response and revisions",
        ],
      },
      {
        icon: Rocket,
        title: "Post-PhD Services",
        bullets: [
          "Journal selection & submission strategy",
          "Teaching portfolio & course design",
          "Job talk & interview preparation",
          "Career transition guidance",
        ],
      },
    ],
    []
  );

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-12">
      <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp(0.05)}>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
          <ClipboardCheck className="h-4 w-4" />
          How we help
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Structured Support</h2>
        <p className="mt-2 text-sm text-gray-700">
          Clear, step-by-step mentorship across stages — designed to remove blockers and accelerate progress.
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {buckets.map((b, i) => (
          <ServiceCard key={i} icon={b.icon} title={b.title} bullets={b.bullets} idx={i} />
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/book-free-consultation"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700 active:translate-y-0"
        >
          <CalendarCheck2 className="h-5 w-5" />
          Book Free Consultation
        </Link>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 rounded-xl border border-orange-300 bg-white px-5 py-3 text-sm font-semibold text-orange-700 shadow-sm transition hover:bg-orange-50"
        >
          Explore Services
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------ Leadership ----------------------------- */

function TeamCard({ name, role, bio, idx }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm transition hover:shadow-md"
      {...scaleIn(0.05 * idx)}
    >
      <div className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-orange-100 blur-2xl" />
      </div>

      {/* Placeholder avatar */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <div className="text-base font-semibold text-gray-900">{name}</div>
          <div className="text-xs text-gray-500">{role}</div>
        </div>
      </div>

      <p className="text-sm text-gray-700">{bio}</p>

      {/* <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-orange-700">
        Connect <ChevronRight className="h-4 w-4" />
      </div> */}
    </motion.div>
  );
}

function Leadership() {
  const team = [
    {
      name: "Dr. A. Mehta",
      role: "Founder & Lead Mentor",
      bio:
        "15+ years across academic research and mentoring. Specializes in methodology design, research writing, and publication strategies.",
    },
    {
      name: "Dr. P. Nair",
      role: "Quant & Data Coach",
      bio:
        "Focuses on quantitative techniques, reproducible analysis, and data storytelling. Guides scholars on tools and interpretation.",
    },
    {
      name: "Dr. S. Rao",
      role: "Writing & Review Coach",
      bio:
        "Helps scholars structure chapters, refine arguments, and craft reviewer responses with precision and clarity.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-12">
      <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp(0.05)}>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
          <Users className="h-4 w-4" />
          Leadership
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Mentors Who Care</h2>
        <p className="mt-2 text-sm text-gray-700">
          Personal mentorship, pragmatic advice, and honest feedback — so you can move forward with confidence.
        </p>
      </motion.div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {team.map((m, i) => (
          <TeamCard key={i} idx={i} {...m} />
        ))}
      </div>
    </section>
  );
}


/* ---------------------------------- FAQ -------------------------------- */

const FAQ = [
  {
    q: "Do you provide ghostwriting?",
    a:
      "No. We follow strict academic ethics. We offer mentorship, feedback, methodology and analysis guidance, proofreading, and publication support.",
  },
  {
    q: "How are sessions scheduled?",
    a:
      "We schedule 1:1 sessions based on your availability. You’ll receive a roadmap and action items after each call.",
  },
  {
    q: "Can you help with data analysis?",
    a:
      "Yes — quantitative and qualitative analysis, plus visualization and interpretation aligned with your research questions.",
  },
  {
    q: "Do you support journal selection?",
    a:
      "Absolutely. We shortlist appropriate journals, align formatting, and assist with cover letters and rebuttals.",
  },
];

function FaqItem({ item, idx, openIdx, setOpenIdx }) {
  const open = idx === openIdx;
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/70 shadow-sm">
      <button
        className="flex w-full items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpenIdx(open ? -1 : idx)}
      >
        <span className="text-sm font-semibold text-gray-900">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-500"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="px-5 pb-4 text-sm text-gray-700">{item.a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQBlock() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-16">
      <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp(0.05)}>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
          <QuestionMarkIcon />
          Frequently Asked Questions
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">FAQs</h2>
        <p className="mt-2 text-sm text-gray-700">Quick answers to common questions.</p>
      </motion.div>

      <div className="mx-auto mt-8 max-w-4xl space-y-3">
        {FAQ.map((item, i) => (
          <FaqItem key={i} item={item} idx={i} openIdx={openIdx} setOpenIdx={setOpenIdx} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------- CTA Band ------------------------------- */

function CTABand() {
  return (
    <section className="relative border-t border-orange-100 bg-gradient-to-r from-orange-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <motion.div
          className="grid items-center gap-8 md:grid-cols-2"
          {...fadeUp(0.05)}
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
              <Sparkles className="h-4 w-4" />
              Ready to move forward?
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Book a free consultation and get a clear roadmap.
            </h3>
            <p className="mt-2 text-sm text-gray-700">
              Discuss your goals, blockers, and timelines. Leave with tangible next steps and confidence.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/book-free-consultation"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700 active:translate-y-0"
              >
                <CalendarCheck2 className="h-5 w-5" />
                Book Free Consultation
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl border border-orange-300 bg-white px-5 py-3 text-sm font-semibold text-orange-700 shadow-sm transition hover:bg-orange-50"
              >
                Contact Us <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <motion.div
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            {...scaleIn(0.15)}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50">
                  <Target className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-sm font-semibold text-gray-900">Clarity First</div>
                <div className="text-xs text-gray-600">Define scope, outcomes, and milestones.</div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50">
                  <BrainCircuit className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-sm font-semibold text-gray-900">Methodology Fit</div>
                <div className="text-xs text-gray-600">Align approach with research questions.</div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50">
                  <LineChart className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-sm font-semibold text-gray-900">Analysis Support</div>
                <div className="text-xs text-gray-600">From cleaning to interpretation.</div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50">
                  <NotebookPen className="h-5 w-5 text-orange-600" />
                </div>
                <div className="text-sm font-semibold text-gray-900">Writing & Review</div>
                <div className="text-xs text-gray-600">Chapters, citations, peer feedback.</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------- Little helper: icon -------------------------- */
/* lucide-react has no explicit QuestionMarkCircle named this way, so we synthesize a small icon */
function QuestionMarkIcon() {
  return (
    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-orange-300 text-orange-600">
      ?
    </div>
  );
}

/* ------------------------------- ROOT VIEW ------------------------------ */

export default function AboutUs() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-white to-orange-50">
      {/* subtle grid bg */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:44px_44px]"
      />
      <AmbientOrbs />

      <IntroHero />
      <MissionVision />
      <StoryTimeline />
      <ValuesGrid />
      <ServicesMap />
      <Leadership />
      <FAQBlock />
      <CTABand />
    </div>
  );
}
