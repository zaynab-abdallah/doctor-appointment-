"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add logic to send the message (API or email service)
    console.log({ name, email, message });
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="container mx-auto px-4 py-8 mb-20 flex justify-center items-center min-h-[60vh]">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          <span className="text-lime-600">Contact</span> Us
        </h1>

        {submitted && (
          <div className="bg-lime-100 text-lime-800 p-4 rounded mb-4 text-center">
            Thank you! Your message has been sent.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-lime-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-lime-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-lime-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            required
          />
          <button
            type="submit"
            className="w-full bg-lime-600 text-white p-3 rounded hover:bg-lime-700 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
