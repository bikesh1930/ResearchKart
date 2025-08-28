/* eslint-disable react/no-unescaped-entities */
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpenText,
  Rocket,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Sparkles,
  Target,
  CalendarCheck2,
  NotebookPen,
  FilePieChart,
  BrainCircuit,
  LineChart,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/**
 * SERVICES.JSX — ResearchKart
 * Theme: Light background + orange accents
 * Sections: Hero, Tabs, Accordion, CTA
 */

/* ---------------------------- Motion helpers ---------------------------- */
const EASE = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE } },
  viewport: { once: true, amount: 0.3 },
});
const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1, transition: { duration: 0.6, delay, ease: EASE } },
  viewport: { once: true, amount: 0.3 },
});

/* ---------------------------- Background orbs --------------------------- */
function AmbientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span
        className="absolute -top-14 -left-10 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl"
        animate={{ x: [0, 40, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute top-1/3 -right-10 h-72 w-72 rounded-full bg-orange-100/40 blur-3xl"
        animate={{ x: [0, -30, 10, 0], y: [0, 15, -5, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 1.2 }}
      />
    </div>
  );
}

/* ------------------------------ Hero Header ----------------------------- */
function ServicesHero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pb-20 md:pt-36 text-center">
      <AmbientOrbs />
      <motion.div {...fadeUp(0)}>
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700 shadow-sm">
          <ClipboardCheck className="h-4 w-4" /> Our Offerings
        </span>
      </motion.div>
      <motion.h1
        className="mt-4 text-4xl font-extrabold leading-[1.15] text-gray-900 sm:text-5xl md:text-6xl"
        {...fadeUp(0.1)}
      >
        Services at <span className="text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text">ResearchKart</span>
      </motion.h1>
      <motion.p
        className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg"
        {...fadeUp(0.2)}
      >
        Structured, ethical, and expert support for every stage of your PhD journey — from ideation to publication and beyond.
      </motion.p>
      <motion.div className="mt-7" {...fadeUp(0.3)}>
        <Link
          to="/book-free-consultation"
          className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
        >
          <CalendarCheck2 className="h-5 w-5" /> Book Free Consultation
        </Link>
      </motion.div>
      <motion.div className="mt-6 text-xs text-gray-500" {...fadeUp(0.4)}>
        Disclaimer: We do not provide ghostwriting for degree submissions. All support aligns with academic ethics.
      </motion.div>
    </section>
  );
}

/* ------------------------------ Service Cards --------------------------- */
function ServiceCard({ icon: Icon, title, bullets, idx }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm hover:shadow-md"
      {...scaleIn(0.06 * idx)}
    >
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
    </motion.div>
  );
}

/* ----------------------------- Filter Tabs ------------------------------ */
function ServiceTabs() {
  const [tab, setTab] = useState("aspirants");

  const data = useMemo(
    () => ({
      aspirants: [
        {
          icon: GraduationCap,
          title: "PhD Aspirants",
          bullets: [
            "Topic ideation & scope refinement",
            "Proposal & synopsis coaching",
            "Literature mapping & gap identification",
            "Roadmap planning & milestone setting",
          ],
        },
      ],
      scholars: [
        {
          icon: BookOpenText,
          title: "PhD Scholars",
          bullets: [
            "Methodology selection & design",
            "Quantitative/Qualitative data analysis",
            "Thesis structuring & proofreading",
            "Reviewer response & revisions",
          ],
        },
      ],
      postphd: [
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
    }),
    []
  );

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-16">
      <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp(0)}>
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
          <Sparkles className="h-4 w-4" /> Choose Your Stage
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Tailored Services</h2>
        <p className="mt-2 text-sm text-gray-700">
          Select your research stage to see the relevant services crafted for your journey.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={() => setTab("aspirants")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            tab === "aspirants" ? "bg-orange-600 text-white" : "bg-orange-50 text-orange-700 hover:bg-orange-100"
          }`}
        >
          Aspirants
        </button>
        <button
          onClick={() => setTab("scholars")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            tab === "scholars" ? "bg-orange-600 text-white" : "bg-orange-50 text-orange-700 hover:bg-orange-100"
          }`}
        >
          Scholars
        </button>
        <button
          onClick={() => setTab("postphd")}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            tab === "postphd" ? "bg-orange-600 text-white" : "bg-orange-50 text-orange-700 hover:bg-orange-100"
          }`}
        >
          Post-PhD
        </button>
      </div>

      {/* Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 justify-center max-w-3xl mx-auto">
        {data[tab].map((s, i) => (
          <ServiceCard key={i} icon={s.icon} title={s.title} bullets={s.bullets} idx={i} />
        ))}
      </div>
    </section>
  );
}

/* -------------------------- Accordion for Details ----------------------- */
function ServiceAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const services = [
    {
      title: "PhD Topic Ideation",
      description:
        "We guide you in identifying a unique and relevant research topic. Our experts ensure that your topic has sufficient research gaps, academic value, and practical applicability.",
    },
    {
      title: "Research Methodology Support",
      description:
        "From choosing between qualitative, quantitative, or mixed methods to structuring your methodology chapter, we provide clarity and ensure alignment with your research objectives.",
    },
    {
      title: "Thesis Structuring & Proofreading",
      description:
        "We help you organize your chapters, ensure flow and coherence, and refine grammar, citations, and formatting for a professional final document.",
    },
    {
      title: "Publication Guidance",
      description:
        "We recommend journals based on impact factor and relevance, help you prepare manuscripts, and guide you through reviewer comments ethically and effectively.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-4xl px-6 py-16 text-center">
      <motion.div {...fadeUp(0)}>
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
          <ChevronRight className="h-4 w-4" /> Learn More
        </span>
        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
          Detailed Service Descriptions
        </h2>
        <p className="mt-2 text-gray-600 text-sm max-w-2xl mx-auto">
          Click each service to explore how we can support your research journey in detail.
        </p>
      </motion.div>

      <div className="mt-10 space-y-4 text-left">
        {services.map((service, idx) => {
          const isOpen = openIndex === idx;
          return (
            <motion.div
              key={idx}
              className="rounded-xl border border-gray-200 bg-white shadow-sm"
              {...fadeUp(idx * 0.1)}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-semibold text-gray-900">{service.title}</span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-orange-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-orange-600" />
                )}
              </button>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-5 text-sm text-gray-700"
                >
                  {service.description}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------- CTA Band ------------------------------- */
function CTABand() {
  return (
    <section className="relative border-t border-orange-100 bg-gradient-to-r from-orange-50 to-white">
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16 text-center">
        <motion.div className="grid items-center gap-8 md:grid-cols-2" {...fadeUp(0.05)}>
          <div className="text-left md:text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
              <Target className="h-4 w-4" /> Next Step
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Book a free consultation today.
            </h3>
            <p className="mt-2 text-sm text-gray-700">
              Let's discuss your goals and create a clear, step-by-step roadmap for your success.
            </p>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/book-free-consultation"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
              >
                <CalendarCheck2 className="h-5 w-5" /> Book Free Consultation
              </Link>
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl border border-orange-300 bg-white px-5 py-3 text-sm font-semibold text-orange-700 shadow-sm transition hover:bg-orange-50"
              >
                Contact Us <MessageSquare className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            {...scaleIn(0.15)}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <NotebookPen className="mb-2 h-5 w-5 text-orange-600" />
                <div className="text-sm font-semibold text-gray-900">Writing Support</div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <BrainCircuit className="mb-2 h-5 w-5 text-orange-600" />
                <div className="text-sm font-semibold text-gray-900">Methodology Guidance</div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <LineChart className="mb-2 h-5 w-5 text-orange-600" />
                <div className="text-sm font-semibold text-gray-900">Data Analysis</div>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <FilePieChart className="mb-2 h-5 w-5 text-orange-600" />
                <div className="text-sm font-semibold text-gray-900">Publication Strategy</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ ROOT VIEW ------------------------------- */
export default function Services() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-white to-orange-50">
      <AmbientOrbs />
      <ServicesHero />
      <ServiceTabs />
      <ServiceAccordion />
      <CTABand />
    </div>
  );
}
