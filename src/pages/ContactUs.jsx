/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // ✅ Import Firestore

/* ---------------------------- Motion helpers ---------------------------- */
const EASE = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE } },
  viewport: { once: true, amount: 0.3 },
});

/* ---------------------------- Hero Section ------------------------------ */
function ContactHero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 text-center">
      <motion.div {...fadeUp(0)}>
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700 shadow-sm">
          <MessageSquare className="h-4 w-4" /> Get in Touch
        </span>
      </motion.div>
      <motion.h1
        className="mt-4 text-4xl font-extrabold leading-[1.15] text-gray-900 sm:text-5xl md:text-6xl"
        {...fadeUp(0.1)}
      >
        Contact{" "}
        <span className="text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text">
          ResearchKart
        </span>
      </motion.h1>
      <motion.p
        className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg"
        {...fadeUp(0.2)}
      >
        Have questions, need guidance, or want to discuss your research project?  
        We're here to help you at every stage of your academic journey.
      </motion.p>
    </section>
  );
}

/* ---------------------------- Contact Form ------------------------------ */
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    return newErrors;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await addDoc(collection(db, "messages"), {
          ...formData,
          timestamp: serverTimestamp(),
        });
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } catch (err) {
        console.error("Error saving message:", err);
        alert("❌ Failed to send message. Try again.");
      }
    }
  };

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-16">
      <motion.div className="mx-auto max-w-2xl text-center" {...fadeUp(0)}>
        <h2 className="text-3xl font-extrabold text-gray-900">Send Us a Message</h2>
        <p className="mt-2 text-gray-600">
          Fill out the form below and our team will reach out to you shortly.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-10 grid gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-md"
        {...fadeUp(0.2)}
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-2 w-full rounded-lg border px-4 py-2 text-sm text-gray-800 focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-200"
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-2 w-full rounded-lg border px-4 py-2 text-sm text-gray-800 focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-200"
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`mt-2 w-full rounded-lg border px-4 py-2 text-sm text-gray-800 focus:ring-2 ${
              errors.subject
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-200"
            }`}
          />
          {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Message</label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={`mt-2 w-full rounded-lg border px-4 py-2 text-sm text-gray-800 focus:ring-2 ${
              errors.message
                ? "border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-orange-500 focus:ring-orange-200"
            }`}
          ></textarea>
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
        >
          <Send className="h-5 w-5" /> Send Message
        </button>

        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm font-semibold text-green-600"
          >
            ✅ Your message has been sent successfully!
          </motion.p>
        )}
      </motion.form>
    </section>
  );
}

/* --------------------------- Contact Info ------------------------------- */
function ContactInfo() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16">
      <motion.div className="grid gap-8 md:grid-cols-3" {...fadeUp(0.2)}>
        {/* <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <Mail className="mb-2 h-6 w-6 text-orange-600" />
          <h4 className="font-semibold text-gray-900">Email</h4>
          <p className="mt-1 text-sm text-gray-700">hello@researchkart.in</p>
        </div> */}
        {/* <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <Phone className="mb-2 h-6 w-6 text-orange-600" />
          <h4 className="font-semibold text-gray-900">Phone</h4>
          <p className="mt-1 text-sm text-gray-700">+91 98765 43210</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <MapPin className="mb-2 h-6 w-6 text-orange-600" />
          <h4 className="font-semibold text-gray-900">Address</h4>
          <p className="mt-1 text-sm text-gray-700">
            123 Knowledge Park, Research City, India
          </p>
        </div> */}
      </motion.div>
    </section>
  );
}

/* --------------------------- Main Component ----------------------------- */
export default function ContactUs() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-white to-orange-50">
      <ContactHero />
      <ContactForm />
      <ContactInfo />
    </div>
  );
}
