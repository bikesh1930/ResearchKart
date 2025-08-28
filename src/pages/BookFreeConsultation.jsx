/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck2, Send, User, Mail, Phone } from "lucide-react";

// ✅ Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

/* ---------------------------- Motion helpers ---------------------------- */
const EASE = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0, y = 24) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EASE } },
  viewport: { once: true, amount: 0.3 },
});

/* ---------------------------- Hero Section ------------------------------ */
function ConsultationHero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-28 pb-16 md:pt-36 text-center">
      <motion.div {...fadeUp(0)}>
        <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700 shadow-sm">
          <CalendarCheck2 className="h-4 w-4" /> Free Consultation
        </span>
      </motion.div>
      <motion.h1
        className="mt-4 text-4xl font-extrabold leading-[1.15] text-gray-900 sm:text-5xl md:text-6xl"
        {...fadeUp(0.1)}
      >
        Book Your{" "}
        <span className="text-transparent bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text">
          Free Consultation
        </span>
      </motion.h1>
      <motion.p
        className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-700 sm:text-lg"
        {...fadeUp(0.2)}
      >
        Get expert advice on your research journey. Fill out the form to schedule
        your free consultation session with our experts.
      </motion.p>
    </section>
  );
}

/* ---------------------------- Booking Form ------------------------------ */
function BookingForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    mode: "Online",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!form.service.trim()) newErrors.service = "Please select a service.";
    if (!form.date.trim()) newErrors.date = "Please choose a date.";
    if (!form.time.trim()) newErrors.time = "Please choose a time.";
    return newErrors;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // ✅ Save booking details to Firestore
        await addDoc(collection(db, "consultations"), {
          ...form,
          timestamp: serverTimestamp(),
        });

        setSubmitted(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          service: "",
          date: "",
          time: "",
          mode: "Online",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 4000);
      } catch (error) {
        console.error("Error saving booking:", error);
        alert("Something went wrong. Try again!");
      }
    }
  };

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-16">
      <motion.div className="mx-auto max-w-2xl text-center" {...fadeUp(0)}>
        <h2 className="text-3xl font-extrabold text-gray-900">Consultation Form</h2>
        <p className="mt-2 text-gray-600">
          Fill out the form below to schedule your free consultation.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-10 grid gap-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-md"
        {...fadeUp(0.2)}
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Full Name</label>
          <div className="mt-2 flex items-center rounded-lg border px-3">
            <User className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm text-gray-800 focus:outline-none"
            />
          </div>
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Email</label>
          <div className="mt-2 flex items-center rounded-lg border px-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm text-gray-800 focus:outline-none"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Phone</label>
          <div className="mt-2 flex items-center rounded-lg border px-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm text-gray-800 focus:outline-none"
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Service</label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border px-4 py-2 text-sm text-gray-800"
          >
            <option value="">Select a service</option>
            <option value="Thesis Guidance">Thesis Guidance</option>
            <option value="Research Paper Help">Research Paper Help</option>
            <option value="Data Analysis">Data Analysis</option>
            <option value="Editing & Proofreading">Editing & Proofreading</option>
          </select>
          {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service}</p>}
        </div>

        {/* Date & Time */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border px-4 py-2 text-sm text-gray-800"
            />
            {errors.date && <p className="mt-1 text-sm text-red-500">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border px-4 py-2 text-sm text-gray-800"
            />
            {errors.time && <p className="mt-1 text-sm text-red-500">{errors.time}</p>}
          </div>
        </div>

        {/* Mode */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Mode</label>
          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border px-4 py-2 text-sm text-gray-800"
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">Message</label>
          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border px-4 py-2 text-sm text-gray-800"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
        >
          <Send className="h-5 w-5" /> Submit Booking
        </button>

        {submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm font-semibold text-green-600"
          >
            ✅ Your consultation request has been received. We'll contact you soon!
          </motion.p>
        )}
      </motion.form>
    </section>
  );
}

/* ---------------------------- Page Wrapper ------------------------------ */
export default function BookFreeConsultation() {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-white to-orange-50">
      <ConsultationHero />
      <BookingForm />
    </div>
  );
}
