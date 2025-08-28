// src/pages/Home.jsx
/* eslint-disable react/no-unescaped-entities */
// -----------------------------------------------------------------------------
// Home.jsx — ResearchKart
// A premium, polished, highly-animated landing page for PhD guidance platform.
// Built with React + Framer Motion + Tailwind + lucide-react icons.
// > 500 lines of production-ready, well-structured code with reusable pieces.
// -----------------------------------------------------------------------------

import { useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  BookOpenText,
  LineChart,
  ShieldCheck,
  Users,
  Wand2,
  Sparkles,
  Stars,
  NotebookPen,
  BrainCircuit,
  ChartBar,
  MessagesSquare,
  Globe,
  Target,
  Rocket,
  FilePieChart,
  Timer,
  Quote,
  Lightbulb,
  Brain,
  Laptop,
  Microscope,
  Library,
  PenSquare,
  BookMarked,
  BarChart2,
  ChartPie,
  Presentation,
  ClipboardCheck,
  FileCheck2,
  BadgeCheck,
  MessageSquareMore,
  FolderGit2,
  Network,
  Beaker,
  Layers,
  CalendarClock,
  ClipboardList,
  GitBranch,
  ChartSpline,
  Mail,
} from "lucide-react";

/** ============================================================================
 *  Animation + Utilities
 *  ==========================================================================*/

const EASE = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE } },
  viewport: { once: true, amount: 0.3 },
});

const appear = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { duration: 0.7, delay, ease: EASE } },
  viewport: { once: true, amount: 0.3 },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1, transition: { duration: 0.5, delay, ease: EASE } },
  viewport: { once: true, amount: 0.3 },
});

const float = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3.2, ease: "easeInOut", repeat: Infinity },
  },
};

const formatPlus = (n) => `${n.toLocaleString()}+`;

/** ============================================================================
 *  Ambient Orbs (background decoration)
 *  ==========================================================================*/

function AmbientOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.span
        className="absolute -top-14 -left-10 h-64 w-64 rounded-full bg-orange-200/35 blur-3xl"
        animate={{ x: [0, 32, -16, 0], y: [0, 16, -8, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute top-1/3 -right-10 h-72 w-72 rounded-full bg-orange-100/40 blur-3xl"
        animate={{ x: [0, -28, 10, 0], y: [0, 15, -10, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut", delay: 1.2 }}
      />
      <motion.span
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-100/40 blur-3xl"
        animate={{ x: [0, 24, -24, 0], y: [0, -16, 20, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut", delay: 0.6 }}
      />
    </div>
  );
}

/** ============================================================================
 *  Micro UI
 *  ==========================================================================*/

function Pill({ children }) {
  return (
    <motion.span
      className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700 shadow-sm"
      {...fadeUp(0.05, 12)}
    >
      <Sparkles className="h-4 w-4" />
      {children}
    </motion.span>
  );
}

function AccentUnderline({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -bottom-1 left-0 h-[8px] w-full rounded-full bg-gradient-to-r from-orange-300/70 via-orange-400/80 to-orange-500 ${className}`}
    />
  );
}

/** ============================================================================
 *  Counter Hook
 *  ==========================================================================*/

function useCounter(target, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

/** ============================================================================
 *  Logo Cloud (placeholder)
 *  ==========================================================================*/

function Logo({ label = "Journal" }) {
  return (
    <div className="flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white/70 px-4 shadow-sm">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </div>
  );
}

function LogoCloud() {
  return (
    <motion.div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6" {...fadeUp(0.1)}>
      {["Scopus", "Springer", "Elsevier", "Wiley", "SAGE", "IEEE"].map((name) => (
        <Logo key={name} label={name} />
      ))}
    </motion.div>
  );
}

/** ============================================================================
 *  Marquee (offerings)
 *  ==========================================================================*/

function Marquee() {
  const items = useMemo(
    () => [
      "Topic Ideation",
      "Synopsis Writing",
      "Methodology Support",
      "Data Analysis",
      "Manuscript Writing",
      "Publication Strategy",
      "Thesis Proofreading",
      "Mock Interviews",
      "Course Design",
      "Career Transition",
    ],
    []
  );

  return (
    <div className="relative mt-12 overflow-hidden rounded-xl border border-orange-100 bg-white/60 py-3 shadow-sm">
      <motion.div
        className="flex gap-8 whitespace-nowrap px-4 text-sm font-medium text-gray-700"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      >
        {items.concat(items).map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-orange-500" />
            {t}
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

/** ============================================================================
 *  Feature Cards
 *  ==========================================================================*/

const FEATURES = [
  {
    icon: <GraduationCap className="h-6 w-6 text-orange-600" />,
    title: "For PhD Aspirants",
    desc:
      "Strong start with topic selection, scope refinement, proposal drafting and interview preparation—tailored to your domain.",
  },
  {
    icon: <BookOpenText className="h-6 w-6 text-orange-600" />,
    title: "For PhD Scholars",
    desc:
      "Methodology selection, data analysis, thesis structuring and proofreading—get expert support at any stage.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-orange-600" />,
    title: "Ethical & Transparent",
    desc:
      "No ghostwriting for degree submissions. We mentor you to build real skills, aligned with academic integrity.",
  },
  {
    icon: <LineChart className="h-6 w-6 text-orange-600" />,
    title: "Publication Ready",
    desc:
      "End-to-end support for manuscript writing, journal selection, submission, and reviewer response strategy.",
  },
  {
    icon: <Users className="h-6 w-6 text-orange-600" />,
    title: "1:1 Mentorship",
    desc:
      "Structured roadmaps, measurable milestones, and honest feedback—so you move forward with clarity.",
  },
  {
    icon: <Wand2 className="h-6 w-6 text-orange-600" />,
    title: "Present & Teach Better",
    desc:
      "Slides, job-talks, and course design that communicate your research with impact—beyond your dissertation.",
  },
];

function FeaturesGrid() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-14">
      <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp(0.05)}>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
          <ClipboardCheck className="h-4 w-4" />
          What you get
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Structured, end-to-end support</h2>
        <p className="mt-2 text-sm text-gray-700">
          We combine research rigor with practical mentorship—exactly what you need to progress faster.
        </p>
      </motion.div>

      <motion.div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3" {...appear(0.1)}>
        {FEATURES.map((f, idx) => (
          <motion.div
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 p-5 shadow-sm transition hover:shadow-md"
            {...scaleIn(0.05 * idx)}
          >
            <div className="absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-orange-100 blur-2xl" />
            </div>
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-orange-50">
              {f.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
            {/* <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-orange-700">
              Learn more <ChevronRight className="h-4 w-4" />
            </div> */}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/** ============================================================================
 *  Stats Row
 *  ==========================================================================*/

function Stat({ label, value, Icon }) {
  const count = useCounter(value);
  return (
    <motion.div
      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm"
      {...scaleIn(0.08)}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
        <Icon className="h-5 w-5 text-orange-600" />
      </div>
      <div>
        <div className="text-xl font-extrabold text-gray-900">{formatPlus(count)}</div>
        <div className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</div>
      </div>
    </motion.div>
  );
}

function StatsRow() {
  return (
    <motion.div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4" {...fadeUp(0.1)}>
      <Stat label="Scholars Supported" value={1200} Icon={Users} />
      <Stat label="Papers Guided" value={850} Icon={FilePieChart} />
      <Stat label="Domains Covered" value={25} Icon={Globe} />
      <Stat label="Avg. Turnaround (days)" value={14} Icon={Timer} />
    </motion.div>
  );
}

/** ============================================================================
 *  Parallax Feature + Cards
 *  ==========================================================================*/

function AbstractParallax() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 26]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <div ref={ref} className="relative mx-auto mt-16 max-w-5xl">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* Left: Feature List Card */}
        <motion.div style={{ y: y1 }}>
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/70 via-white to-white" />
            <div className="relative p-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-orange-700">
                <Stars className="h-4 w-4" />
                Research Journey Planner
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: BrainCircuit, title: "Methodology Map", desc: "Quant/Qual templates & checklists." },
                  { icon: ChartBar, title: "Data Toolkit", desc: "Stats, visualizations, reproducible flow." },
                  { icon: NotebookPen, title: "Writing Coach", desc: "Chapters, citations, clarity & tone." },
                  { icon: MessagesSquare, title: "Mentor Sessions", desc: "1:1 calls, async feedback, roadmaps." },
                ].map((b, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50">
                      <b.icon className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900">{b.title}</div>
                    <div className="text-xs text-gray-600">{b.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Link
                  to="/book-free-consultation"
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-orange-700"
                >
                  <CalendarCheck2 className="h-4 w-4" />
                  Book a Free Consultation
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 rounded-lg border border-orange-300 bg-white px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
                >
                  Explore Services <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Decorative SVG */}
        <motion.div style={{ y: y2 }}>
          <div className="relative">
            <motion.div
              className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-orange-100 blur-3xl"
              animate={{ y: [0, -12, 0], x: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-amber-100 blur-3xl"
              animate={{ y: [0, 12, 0], x: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            />
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <svg viewBox="0 0 600 450" className="h-full w-full">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fdba74" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fff7ed" />
                    <stop offset="100%" stopColor="#ffedd5" />
                  </linearGradient>
                </defs>

                <rect x="0" y="0" width="600" height="450" fill="url(#g2)" />
                {[...Array(8)].map((_, i) => (
                  <motion.rect
                    key={i}
                    x={40 + i * 65}
                    y={120}
                    width="30"
                    height={80 + i * 15}
                    rx="6"
                    fill="url(#g1)"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.6, ease: EASE }}
                    viewport={{ once: true }}
                  />
                ))}

                <motion.path
                  d="M 20 380 Q 200 280 380 340 T 580 320"
                  fill="none"
                  stroke="#fb923c"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
                <motion.circle
                  cx="470"
                  cy="260"
                  r="10"
                  fill="#fdba74"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  viewport={{ once: true }}
                />
              </svg>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Visualizing progress: methodology → analysis → publication
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div style={{ y: y3 }} className="mt-10">
        <StatsRow />
      </motion.div>
    </div>
  );
}

/** ============================================================================
 *  Services Roadmap
 *  ==========================================================================*/

const ROADMAP = [
  {
    step: "Discover",
    subtitle: "Clarify your research direction",
    icon: Target,
    bullets: [
      "Topic ideation & scope refinement",
      "Feasibility checks & gap mapping",
      "Milestone plan & risk mitigation",
    ],
  },
  {
    step: "Design",
    subtitle: "Choose the right methodology",
    icon: Brain,
    bullets: [
      "Quant/Qual/ Mixed-Methods selection",
      "Sampling, instruments & ethics",
      "Pilot design & validity planning",
    ],
  },
  {
    step: "Analyze",
    subtitle: "Transform data into insight",
    icon: ChartPie,
    bullets: ["Reproducible workflows", "Statistical testing / coding help", "Visualizations & interpretation"],
  },
  {
    step: "Write",
    subtitle: "Communicate with clarity",
    icon: PenSquare,
    bullets: ["Thesis structure & chapter flow", "Citations & coherence", "Language polishing / proofreading"],
  },
  {
    step: "Publish",
    subtitle: "Reach the right journal",
    icon: BookMarked,
    bullets: [
      "Shortlist journals & align formatting",
      "Cover letters, submission & tracking",
      "Rebuttal strategy & reviewer response",
    ],
  },
  {
    step: "Present",
    subtitle: "Own the room",
    icon: Presentation,
    bullets: ["Viva & job-talk prep", "Slide design & storytelling", "Teaching portfolio & course design"],
  },
];

function Roadmap() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-14">
      <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp(0.05)}>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
          <Network className="h-4 w-4" />
          Your journey, mapped
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">A clear, staged roadmap</h2>
        <p className="mt-2 text-sm text-gray-700">
          Move from uncertainty to momentum with a process that makes big goals manageable—and measurable.
        </p>
      </motion.div>

      <div className="relative mx-auto mt-10 max-w-5xl">
        <div className="absolute left-4 top-0 h-full w-1 rounded bg-orange-200 sm:left-1/2 sm:-ml-0.5" />
        <div className="space-y-6">
          {ROADMAP.map((s, idx) => {
            const Icon = s.icon;
            const left = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                className={`relative flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-sm sm:w-[calc(50%-12px)] ${
                  left ? "sm:ml-0 sm:mr-auto" : "sm:ml-auto sm:mr-0"
                }`}
                {...scaleIn(0.05 * idx)}
              >
                <div
                  className={`absolute top-6 h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-200 bg-white/70 ${
                    left ? "left-8 sm:-right-2 sm:left-auto" : "-right-2 sm:-left-2"
                  }`}
                />
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                  <Icon className="h-4 w-4" />
                  {s.step}
                </div>
                <div className="text-lg font-semibold text-gray-900">{s.subtitle}</div>
                <ul className="mt-1 space-y-2 text-sm text-gray-700">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-orange-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** ============================================================================
 *  Domain Grid
 *  ==========================================================================*/

const DOMAINS = [
  { icon: Microscope, title: "Life Sciences" },
  { icon: Beaker, title: "Chemistry" },
  { icon: Layers, title: "Material Science" },
  { icon: Laptop, title: "Computer Science" },
  { icon: Library, title: "Humanities" },
  { icon: BarChart2, title: "Economics" },
  { icon: LineChart, title: "Management" },
  { icon: Globe, title: "Sociology" },
  { icon: Brain, title: "Psychology" },
  { icon: ClipboardList, title: "Public Policy" },
  { icon: GitBranch, title: "Engineering" },
  { icon: ChartSpline, title: "Data Science" },
];

function Domains() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-14">
      <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp(0.05)}>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
          <FolderGit2 className="h-4 w-4" />
          We cover your field
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">Across disciplines & methods</h2>
        <p className="mt-2 text-sm text-gray-700">
          Whatever your domain, our mentors bring the right tools, vocabulary, and rigor to the table.
        </p>
      </motion.div>

      <motion.div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4" {...appear(0.1)}>
        {DOMAINS.map((d, i) => {
          const Icon = d.icon;
          return (
            <motion.div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white/70 p-4 shadow-sm"
              {...scaleIn(0.03 * i)}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
                <Icon className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-sm font-semibold text-gray-900">{d.title}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
/** ============================================================================
 *  FAQ
 *  ==========================================================================*/

const FAQ = [
  {
    q: "Do you provide ghostwriting?",
    a: "No. We follow strict academic ethics. We offer mentorship, feedback, methodology and analysis guidance, proofreading, and publication support.",
  },
  {
    q: "How are sessions scheduled?",
    a: "We schedule 1:1 sessions based on your availability. You’ll receive a roadmap and action items after each call.",
  },
  {
    q: "Can you help with data analysis?",
    a: "Yes — quantitative and qualitative analysis, plus visualization and interpretation aligned with your research questions.",
  },
  {
    q: "Do you support journal selection?",
    a: "Absolutely. We shortlist appropriate journals, align formatting, and assist with cover letters and rebuttals.",
  },
  // {
  //   q: "What tools do you use?",
  //   a: "We adapt to your context: R, Python, SPSS, NVivo, Stata, Excel, LaTeX, and more—always with reproducibility in mind.",
  // },
  {
    q: "How soon can I start?",
    a: "Usually within a week. Book a free consultation and we'll align on scope, timelines, and first milestones.",
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
        <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }} className="text-gray-500">
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

function FaqBlock() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-16">
      <motion.div className="mx-auto max-w-3xl text-center" {...fadeUp(0.05)}>
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
          <CalendarClock className="h-4 w-4" />
          Questions? We've got answers.
        </div>
        <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">FAQs</h2>
        <p className="mt-2 text-sm text-gray-700">If it matters to your research, it matters to us.</p>
      </motion.div>

      <div className="mx-auto mt-8 max-w-4xl space-y-3">
        {FAQ.map((item, i) => (
          <FaqItem key={i} item={item} idx={i} openIdx={openIdx} setOpenIdx={setOpenIdx} />
        ))}
      </div>
    </section>
  );
}

/** ============================================================================
 *  CTA Band
 *  ==========================================================================*/

function CTABand() {
  return (
    <section className="relative border-t border-orange-100 bg-gradient-to-r from-orange-50 to-white">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <motion.div className="grid items-center gap-8 md:grid-cols-2" {...fadeUp(0.05)}>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1 text-xs font-semibold text-orange-700">
              <Sparkles className="h-4 w-4" />
              Ready to move forward?
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Get a clear roadmap for your research.
            </h3>
            <p className="mt-2 text-sm text-gray-700">
              Book a free consultation to discuss your goals, blockers, and timelines. Walk away with practical next
              steps.
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

          <motion.div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" {...scaleIn(0.15)}>
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
                  <ChartBar className="h-5 w-5 text-orange-600" />
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

/** ============================================================================
 *  Hero (Top Section)
 *  ==========================================================================*/

function HeroTop() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yHeadline = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const chips = useMemo(
    () => [
      { t: "topic selection", icon: Target },
      { t: "thesis submission", icon: NotebookPen },
      { t: "publication", icon: Rocket },
    ],
    []
  );

  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-6 pt-28 pb-14 sm:pb-20 md:pt-36">
      <motion.div className="mx-auto max-w-3xl text-center" style={{ y: yHeadline }} {...appear(0)}>
        <Pill>One Stop for Research Excellence</Pill>

        <motion.h1
          className="relative mx-auto mt-4 max-w-4xl text-4xl font-extrabold leading-[1.15] text-gray-900 sm:text-5xl md:text-6xl"
          {...fadeUp(0.05)}
        >
          Empowering PhD Scholars with{" "}
          <span className="relative inline-block text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text">
            Expert Academic Support
            <AccentUnderline />
          </span>
        </motion.h1>

        <motion.p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg" {...fadeUp(0.12)}>
          Personalized mentorship from <span className="font-semibold text-orange-600">proposal to publication</span>.
          We guide you through{" "}
          <span className="font-semibold text-orange-600">methodology, data analysis, writing</span>, and{" "}
          <span className="font-semibold text-orange-600">teaching prep</span> with ethical, transparent support.
        </motion.p>

        <motion.div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row" {...fadeUp(0.18)}>
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
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>

        <motion.div className="mt-6 text-xs text-gray-500" {...fadeUp(0.24)}>
          No ghostwriting — guidance aligned with academic integrity.
        </motion.div>

        <LogoCloud />
        <Marquee />
      </motion.div>

      {/* Floating chips */}
      <motion.div className="pointer-events-none relative mt-8" {...appear(0.4)}>
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {chips.map((w, i) => {
              const Icon = w.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                  className="pointer-events-auto inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm"
                >
                  <Icon className="h-4 w-4 text-orange-600" />
                  {w.t}
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/** ============================================================================
 *  Ribbon (Mini Features)
 *  ==========================================================================*/

const MINI_FEATURES = [
  { icon: Lightbulb, title: "Clarity-First Mentoring", desc: "Get unstuck fast with crisp next steps." },
  { icon: ClipboardCheck, title: "Measurable Milestones", desc: "See progress in weeks, not months." },
  { icon: FileCheck2, title: "Submission-Ready", desc: "Formatting, structure, and polish—done." },
  { icon: BadgeCheck, title: "Ethical Guidance", desc: "No ghostwriting. Real skills, real results." },
];

function FeatureRibbon() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-10">
      <motion.div className="grid gap-3 md:grid-cols-4" {...appear(0.1)}>
        {MINI_FEATURES.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              {...scaleIn(0.04 * i)}
            >
              <motion.div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50" {...float}>
                <Icon className="h-5 w-5 text-orange-600" />
              </motion.div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{m.title}</div>
                <div className="text-xs text-gray-600">{m.desc}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

/** ============================================================================
 *  Newsletter Disclaimer (No subscription UI; informational ethics note)
 *  ==========================================================================*/

function EthicsNote() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-8">
      <motion.div
        className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50 p-5 text-sm text-gray-700 shadow-sm"
        {...appear(0.05)}
      >
        <span className="font-semibold text-orange-700">Ethics Notice: </span>
        We do <span className="font-semibold">not</span> offer ghostwriting for degree submissions. Our role is to mentor
        you—clarifying methodology, improving analysis, and strengthening your writing—so your contribution remains
        authentic, defensible, and publication-ready.
      </motion.div>
    </section>
  );
}

/** ============================================================================
 *  Home (Root)
 *  ==========================================================================*/

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-white to-orange-50">
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:44px_44px]"
      />
      <AmbientOrbs />

      {/* Hero */}
      <HeroTop />

      {/* Mini features */}
      <FeatureRibbon />

      {/* Detailed features */}
      <FeaturesGrid />

      {/* Parallax + Stats */}
      <section className="relative mx-auto max-w-7xl px-6 pb-10">
        <AbstractParallax />
      </section>

      {/* Services Roadmap */}
      <Roadmap />

      {/* Domains */}
      <Domains />

      {/* FAQ */}
      <FaqBlock />

      {/* Ethics note (no subscribe UI) */}
      <EthicsNote />

      {/* CTA */}
      <CTABand />
    </div>
  );
}

/** ============================================================================
 *  END — Home.jsx (ResearchKart)
//  ----------------------------------------------------------------------------
 */
