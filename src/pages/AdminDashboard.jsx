/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { db } from "../firebase"; // ✅ make sure your firebase.js is configured
import { collection, getDocs } from "firebase/firestore";
import { Mail, Calendar } from "lucide-react";

export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [bookings, setBookings] = useState([]);

  // ✅ Fetch messages from Firestore
  useEffect(() => {
    const fetchMessages = async () => {
      const querySnapshot = await getDocs(collection(db, "messages"));
      setMessages(querySnapshot.docs.map((doc) => doc.data()));
    };

    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      setBookings(querySnapshot.docs.map((doc) => doc.data()));
    };

    fetchMessages();
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {/* ✅ Contact Messages */}
      <section className="mb-12">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-4">
          <Mail className="text-orange-600" /> Contact Messages
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-orange-100 text-gray-900">
              <tr>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Email</th>
                <th className="px-4 py-2 font-semibold">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <tr
                    key={index}
                    className="border-b bg-gray-50 hover:bg-gray-100 text-gray-900"
                  >
                    <td className="px-4 py-2">{msg.name}</td>
                    <td className="px-4 py-2">{msg.email}</td>
                    <td className="px-4 py-2">{msg.message}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-4 text-center text-gray-500 italic"
                  >
                    No messages yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ✅ Consultation Bookings */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-4">
          <Calendar className="text-orange-600" /> Consultation Bookings
        </h2>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-orange-100 text-gray-900">
              <tr>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Email</th>
                <th className="px-4 py-2 font-semibold">Phone</th>
                <th className="px-4 py-2 font-semibold">Service</th>
                <th className="px-4 py-2 font-semibold">Date</th>
                <th className="px-4 py-2 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="border-b bg-gray-50 hover:bg-gray-100 text-gray-900"
                  >
                    <td className="px-4 py-2">{booking.name}</td>
                    <td className="px-4 py-2">{booking.email}</td>
                    <td className="px-4 py-2">{booking.phone}</td>
                    <td className="px-4 py-2">{booking.service}</td>
                    <td className="px-4 py-2">{booking.date}</td>
                    <td className="px-4 py-2">{booking.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-4 text-center text-gray-500 italic"
                  >
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
