import React from "react";
import { motion } from "framer-motion";
import { PlayCircle, Quote } from "lucide-react";

const featuredArticles = [
  {
    title: "Why Yagna Still Matters in Modern Life",
    excerpt: "Ancient wisdom meets 2025. Discover how fire rituals heal karmic blocks and protect mental health.",
    cta: "Read Full Article",
  },
  {
    title: "Do Shraddh Abroad: Is It Accepted by Dharma?",
    excerpt: "You may be thousands of miles from India, but your ancestors still hear your prayers.",
    cta: "Explore Guidance",
  },
  {
    title: "How Navagraha Pooja Balances Planetary Energy",
    excerpt: "Based on Vedic astrology, this ritual realigns your energies and removes cosmic hurdles.",
    cta: "Mantra & Setup Tips",
  },
];

const categories = [
  "Occasions & Festivals",
  "Remedy & Protection Rituals",
  "Daily Devotion Tips",
  "Spiritual Science & Astrology",
  "Global Devotion (for NRIs)",
  "Mantras & Meditations",
];

export default function DivineJournal() {
  return (
    <div className="p-6 md:p-10 bg-[#fff7f0] text-[#4b2e2e]">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-6"
      >
        Divine Journal – Discover the Deeper Meaning Behind Every Ritual
      </motion.h1>

      {/* Featured Articles */}
      <section className="grid gap-6 md:grid-cols-3 mb-12">
        {featuredArticles.map((article, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="rounded-2xl shadow-md bg-white p-6">
              <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
              <p className="text-sm mb-4">{article.excerpt}</p>
              <button className="px-4 py-2 border border-[#4b2e2e] text-[#4b2e2e] rounded hover:bg-[#f3e6d7] transition">
                {article.cta}
              </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Blog Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-white border border-[#4b2e2e] text-sm rounded-full cursor-pointer hover:bg-[#f3e6d7] transition"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      {/* Voice of Devotees */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Voice of Devotees</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {["Riya, UK", "Arun, Singapore", "Priya & Nikhil, UAE"].map((name, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white rounded-xl p-4 shadow-md"
            >
              <PlayCircle className="text-orange-500 mb-2" size={32} />
              <p className="italic">“{name} - Video testimonial snippet...”</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Written Blessings */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Written Blessings</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              quote: "BookMyYagna made us feel like we were home.",
              author: "Poonam Sharma, Chicago 🇺🇸",
            },
            {
              quote: "Panditji guided us beautifully during Antim Sanskar.",
              author: "Rajesh Verma, Kolkata 🇮🇳",
            },
          ].map((blessing, i) => (
            <div key={i} className="bg-[#f3e6d7] rounded-xl p-4 shadow-md">
              <Quote className="text-pink-600 mb-2" />
              <p className="italic">“{blessing.quote}”</p>
              <p className="text-sm mt-2">– {blessing.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pandit's Voice */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Behind the Ritual – Pandit’s Voice</h2>
        <div className="space-y-4">
          <div>
            <strong>Pandit Harish Ji (Varanasi)</strong>
            <p className="italic">“Even across oceans, the mantras carry the same energy.”</p>
          </div>
          <div>
            <strong>Pandit Acharya Sudhanshu (Haridwar)</strong>
            <p className="italic">“It is our dharma to serve every seeker.”</p>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-[#4b2e2e] text-white rounded hover:bg-[#633f3f] transition">
          Meet Our Pandits
        </button>
      </section>

      {/* Closing Quote */}
      <section className="text-center py-8">
        <p className="italic text-lg text-[#7a4e2d]">
          “Rituals are not superstition; they are structured ways of inviting peace, clarity, and blessings into your life.”
        </p>
      </section>
    </div>
  );
}
